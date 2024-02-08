const {Server} = require('socket.io');
const {SocketsConnect} = require('./utils/axiosCreate')


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

module.exports.listen = (app) => {
    const io = new Server(app, {
        cors: {
            origin: '*'
        },
        path: '/chat-io'
    })
    io.sockets.on('connection', async socket => {
        try {
            /* socket.disconnect() */
            const user = JSON.parse(socket.handshake.query?.user);

            const id = await setSocket(user.id, socket.id);
            socket.broadcast.emit('USER:ONLINE', user.id);


            socket.on('disconnect', async reason => {
                const last = await deleteSocket(user.id, socket.id);
                socket.broadcast.emit('USER:OFFLINE', {userId: user.id, last});
                console.log('goodbye!')
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