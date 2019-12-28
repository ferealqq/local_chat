const express = require('express');
const SocketServer = require('./socket_handling/SocketServer');
const ChannelRouter = require('./routers/ChannelRouter');

const socketServer = new SocketServer();
const channelRouter = new ChannelRouter(socketServer);

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/channels',channelRouter.getRouter());

app.listen(4000);