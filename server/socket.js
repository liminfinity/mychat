const {Server} = require('socket.io');


module.exports.listen = (app) => {
    const io = new Server(app, {
        cors: {
            origin: '*'
        },
        path: '/chat'
    })
    io.sockets.on('connection', socket => {
        /* socket.disconnect() */
        const user = JSON.parse(socket.handshake.query?.user);
        io.sockets.emit('USER:ONLINE', user);
        socket.on('disconnect', reason => {
            io.emit('USER:OFFLINE', user);
            console.log('goodbye!')
        })
    })
    return io;
}