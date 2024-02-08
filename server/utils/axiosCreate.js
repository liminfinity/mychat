const axios = require('axios')
require('dotenv').config()


const SocketsConnect = axios.create({
    baseURL: `http://localhost:${process.env?.SERVER_PORT || 5000}/chat/sockets`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})

module.exports = {SocketsConnect}


