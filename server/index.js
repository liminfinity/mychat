const express = require('express');
const {createServer} = require('http');
const cors = require('cors');
const path = require('path')
const app = express();
const {mainRouter} = require('./routers/mainRouter')
const {listen} = require('./socket');
const { connect, disconnect } = require('mongoose');
require('dotenv').config()

const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SERVER_HOST = process.env.SERVER_HOST || 'localhost'
app.use(express.json({limit: '40mb'}));
app.use('/assets/img', express.static(path.resolve('assets/userAvatars')))
app.use(cors({
    origin: '*'
}))
app.use('/', mainRouter);

const httpServer = createServer(app)

const socketServer = listen(httpServer);


httpServer.listen(SERVER_PORT, SERVER_HOST, async () => {
    await connect(process.env.MONGO_URL)
    console.log(`mongodb connected`)
    console.log(`server started on ${SERVER_PORT} port and ${SERVER_HOST} host`)
})

process.on('SIGINT', async () => {
    await disconnect();
    console.log(`mongodb disconnected`)
    process.exit()
})
