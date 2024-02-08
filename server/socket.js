const {Server} = require('socket.io');
const {SocketsConnect, MessagesConnect} = require('./utils/axiosCreate')


async function setSocket(userId, socketId) {
    const res = await SocketsConnect.post('/', JSON.stringify({userId, socketId}))
    return res.data.id
}

async function deleteSocket(userId, socketId) {
    const res = await SocketsConnect.delete('/', {
        data: JSON.stringify({userId, socketId})
    })
    return res.data.last
}

async function getSockets(recipient) {
    const resSock = await SocketsConnect.get('/', {
        params: {
            recipientId: recipient
        }
    })
    const {sockets} = resSock.data
    return sockets
}

module.exports.listen = (app) => {
    const io = new Server(app, {
        cors: {
            origin: '*'
        },
        path: '/chat-io'
    })
    io.sockets.on('connection', async mysocket => {
        try {
            /* socket.disconnect() */
            const user = JSON.parse(mysocket.handshake.query?.user);

            const id = await setSocket(user.id, mysocket.id);
            mysocket.broadcast.emit('USER:ONLINE', user.id);


            mysocket.on('disconnect', async reason => {
                const last = await deleteSocket(user.id, mysocket.id);
                mysocket.broadcast.emit('USER:OFFLINE', {userId: user.id, last});
                console.log('goodbye!')
            })
            mysocket.on('MESSAGE:SEND', async (message, cb) => {
                const resMess = await MessagesConnect.post('/', JSON.stringify({message}));
                const {messageId} = resMess.data
                
                let sockets = await getSockets(message.recipient)
                for (const socket of sockets) {
                    mysocket.to(socket).emit('MESSAGE:GET', {
                        id: messageId,
                        ...message
                    })
                }
                sockets = await getSockets(message.sender)
                for (const socket of sockets) {
                    if (socket === mysocket.id) {
                        mysocket.emit('MESSAGE:GET', {
                            id: messageId,
                            ...message
                        })
                    }
                    else {
                        mysocket.to(socket).emit('MESSAGE:GET', {
                            id: messageId,
                            ...message
                        })
                    }
                    
                }
                cb({status: 'delivered'})
            })
            /* socket.on('MESSAGE:SEND', async (message, cb) => {
                
                const queryParams1 = new URLSearchParams({userId: message.sender})
                const queryParams2 = new URLSearchParams({userId: message.recipient})
                const newMessage = {
                    ...message,
                    recipient: undefined
                }

                const resultSender = await axios(`http://localhost:5000/chat/sockets?${queryParams1}`)
                const resultRecipient = await axios(`http://localhost:5000/chat/sockets?${queryParams2}`)
                if (resultSender.status && resultRecipient.status) {
                    const senderSocket = resultSender.data.socket;
                    const recipientSocket = resultRecipient.data.socket;
                    io.to(senderSocket).to(recipientSocket).emit('MESSAGE:GET', newMessage);

                }
                cb({status: 'delivered'})

            }) */
        } catch(e) {
            console.log(e)
        }
        
    })
    return io;
}