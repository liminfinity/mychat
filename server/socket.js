const {Server} = require('socket.io');
const axios = require('axios')

module.exports.listen = (app) => {
    const io = new Server(app, {
        cors: {
            origin: '*'
        },
        path: '/chat-io'
    })
    io.sockets.on('connection', async socket => {
        /* socket.disconnect() */
        const user = JSON.parse(socket.handshake.query?.user);
        io.sockets.emit('USER:ONLINE', user);
        socket.on('disconnect', reason => {
            io.emit('USER:OFFLINE', user);
            console.log('goodbye!')
        })
        socket.on('MESSAGE:SEND', async (message, cb) => {
            
            const queryParams1 = new URLSearchParams({userId: message.sender})
            const queryParams2 = new URLSearchParams({userId: message.recipient})
            const newMessage = {
                ...message,
                recipient: undefined
            }
            console.log(1)
            const resultSender = await axios(`http://localhost:5000/chat/sockets?${queryParams1}`)
            const resultRecipient = await axios(`http://localhost:5000/chat/sockets?${queryParams2}`)
            if (resultSender.status && resultRecipient.status) {
                const senderSocket = resultSender.data.socket;
                const recipientSocket = resultRecipient.data.socket;
                console.log(senderSocket, recipientSocket)
                io.to(senderSocket).to(recipientSocket).emit('MESSAGE:GET', newMessage);

            }
            cb({status: 'delivered'})

        })
    })
    return io;
}