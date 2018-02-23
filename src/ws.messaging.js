const sendMessageFor = (ws) => {
  return (messageType, payload) => {
    const message = JSON.stringify({type: messageType, payload: payload});
    ws.send(message);
  };
};

const messageHandlerFor = (ws, messageHandlers) => {
  return (messageStr) => {
    const message = JSON.parse(messageStr);
    const messageType = message.type;
    if (!messageType) {
      console.warn('Unrecognized message');
      return;
    }
    const handler = messageHandlers[messageType];
    if (handler) {
      handler(ws, message.payload);
    } else {
      console.warn('No handler for message type %s', messageType);
    }
  };
};

const install = (ws, handlers) => {
  ws.sendMessage = sendMessageFor(ws);
  ws.on('message', messageHandlerFor(ws, handlers));
};

module.exports = {install};
