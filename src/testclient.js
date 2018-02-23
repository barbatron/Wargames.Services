const WebSocket = require('ws');

const ws = new WebSocket('ws://::8080');

const doIdentify = () => {
  ws.send({
    type: 'identify',
    payload: {
      name: 'Jocke'
    }
  });
};

ws.on('open', function open() {
  doIdentify();
});

const messageHandlers = {};

ws.on('message', function incoming(data) {
  console.log('SERV> ', data);
});