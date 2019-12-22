const express = require('express');
const _ = require('lodash');
const { OpenSocket } = require('./socket_handling/socket_handler');
const channelRouter = require('./routers/channel_router');

let socket = new OpenSocket(123);

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/channels',channelRouter);

app.listen(4000);