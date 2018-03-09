import {compile} from './messageType';

let counter = 0;

const sendMessageFor = (ws, namespace) => {
  return (type, payload) => {
    const messageType = compile({type, namespace});
    const message = JSON.stringify({messageType, payload});
    return ws.send(message);
  };
};

const messageHandlerFor = (ws, messageHandlers) => {
  return (messageStr) => {
    counter++;
    const message = JSON.parse(messageStr);

    // Establish namespace and type of message
    const messageType = message.messageType;
    if (!messageType) {
      console.warn(`${counter}> Unrecognized message: ${messageStr}`);
      return;
    }

    // Find and invoke registered handler for composed message type
    const handler = messageHandlers[messageType];
    if (handler) {
      console.log(`${counter}> Invoking handler for ${messageType} with params ${JSON.stringify(message.payload)}`);
      const respondFn = response => {
        console.log(`${counter}> Responding with: ${JSON.stringify(response)}`);
        sendMessageFor(ws)(response);
      };
      handler(ws, message.payload, respondFn);
    } else {
      console.warn(`${counter}> No handler for message type`, messageType);
    }
  };
};

const install = (ws, handlers, namespace) => {
  ws.sendMessage = sendMessageFor(ws, namespace);
  ws.on('message', messageHandlerFor(ws, handlers));
};

module.exports = {install};
