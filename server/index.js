const express = require('express');
const {createServer} = require('http');
const cors = require('cors');
const app = express();
const {mainRouter} = require('./routers/mainRouter')
const {listen} = require('./socket')

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: '*'
}))
app.use('/', mainRouter);

const httpServer = createServer(app)

const socketServer = listen(httpServer);

httpServer.listen(PORT, () => {
    console.log(`server started on ${PORT} port`)
})

