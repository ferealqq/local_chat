const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 555 });
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client,index) {
      client.send(data);
    });
  })
});

console.log("Socket running on port: 555");