const compile = require('../messageType').compile;

let counter = 0;

const sendMessageFor = (ws, namespace) => {
  return (type, payload) => {
    const messageType = compile({type, namespace});
    const message = JSON.stringify({messageType, payload});
    return ws.send(message);
  };
};

const messageHandlerFor = (ws, messageHandlers, origin) => {
  if (!messageHandlers) {
    if (!messageHandlers) console.log('KNAS ', messageHandlerFor.caller)
    console.log(`XXXXXXXYS ws=${ws} messageHandlers=${messageHandlers} origin=${origin}`)
  }
  // console.log('Producing message handler callback for (handlers, origin): ', JSON.stringify(messageHandlers), origin)
  return (messageData) => {
    console.log('admin) type of messageData is', typeof messageData);
    let messageStr = typeof messageData === 'string' ? messageData : messageData.data;
    console.log('MESSAGE: ', messageStr);
    if (typeof messageStr !== 'string') {
      console.log('Attempting to parse string', messageStr);
      messageStr = messageStr.data;
    }
    counter++;
    const message = JSON.parse(messageStr);

    // Establish namespace and type of message
    const messageType = message.messageType;
    if (!messageType) {
      console.warn(`${counter}> Unrecognized message: ${messageStr}`);
      return;
    }

    // Find and invoke registered handler for composed message type
    // console.log(`XXX> Atte4mpting lookup of ${messageType} in ${JSON.stringify(messageHandlers)}`);
    const handler = messageHandlers.getAll()[messageType];
    if (handler) {
      // console.log(`${counter} > Invoking handler for ${messageType} with params ${JSON.stringify(message.payload)}`);
      const respondFn = response => {
        // console.log(`${counter} > Responding with: ${JSON.stringify(response)}`);
        sendMessageFor(ws)(response);
      };
      handler(ws, message.payload, respondFn);
    } else {
      console.warn(`${counter} > No handler for message type ${messageType}. I only know these types: ${JSON.stringify(Object.keys(messageHandlers.getAll()))}`);
    }
  };
};

const install = (ws, handlers, namespace) => {
  debugger
  // console.log(`ws.messaging ws=${JSON.stringify(ws)} handlers=${JSON.stringify(handlers)} namespacce=${namespace}`);
  ws.sendMessage = sendMessageFor(ws, namespace);
  if (!handlers) {
    console.log('Someones a douche', ws, handlers, namespace);
    debugger
  }
  const messageCallback = messageHandlerFor(ws, handlers, namespace);
  if (typeof ws.on === 'function') {
    ws.on('message', messageCallback);
  } else {
    ws.onmessage = messageCallback;
  }
};

module.exports = {install};
