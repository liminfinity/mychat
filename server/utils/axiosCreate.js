const axios = require('axios')
require('dotenv').config()

const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
const SERVER_PORT = process.env?.SERVER_PORT || 5000;
const SocketsConnect = axios.create({
    baseURL: `http://${SERVER_HOST}:${SERVER_PORT}/chat/sockets`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})

const MessagesConnect = axios.create({
    baseURL: `http://${SERVER_HOST}:${SERVER_PORT}/chat/messages`,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json'
})

module.exports = {SocketsConnect, MessagesConnect}


