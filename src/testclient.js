const WebSocket = require('ws');


// INTE HAER!!!
// INTE HAER!!!
// INTE HAER!!!
// INTE HAER!!!
// INTE HAER!!!
// INTE HAER!!!
// INTE HAER!!!
// INTE HAER!!!
// INTE HAER!!!
// INTE HAER!!!
// INTE HAER!!!


const ws = new WebSocket('ws://::8080');
const wsMessaging = require('./util/ws.messaging');

const doIdentify = () => {
  ws.sendMessage('identify', {
    name: 'Jocke'
  });
};

const messageHandlers = {
  welcome: (ws, payload) => {
    console.log('Welcome from server: ', payload);
  }
};

ws.on('open', () => {
  wsMessaging.install(ws, messageHandlers);
  doIdentify();
});
