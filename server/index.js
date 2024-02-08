const express = require('express');
const {createServer} = require('http');
const cors = require('cors');
const path = require('path')
const app = express();
const {mainRouter} = require('./routers/mainRouter')
const {listen} = require('./socket');
const { connect, disconnect } = require('mongoose');
require('dotenv').config()

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/assets/img', express.static(path.resolve('assets/userAvatars')))
app.use(cors({
    origin: '*'
}))
app.use('/', mainRouter);

const httpServer = createServer(app)

const socketServer = listen(httpServer);


httpServer.listen(PORT, async () => {
    await connect(process.env.MONGO_URL)
    console.log(`mongodb connected`)
    console.log(`server started on ${PORT} port`)
})

process.on('SIGINT', async () => {
    await disconnect();
    console.log(`mongodb disconnected`)
    process.exit()
})
