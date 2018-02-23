const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: { // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    clientMaxWindowBits: 10,       // Defaults to negotiated value.
    serverMaxWindowBits: 10,       // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10,          // Limits zlib concurrency for perf.
    threshold: 1024,               // Size (in bytes) below which messages
                                   // should not be compressed.
  }
});

const broadcast = (data, exceptClient) => {
  // const targetClients = exceptClient
  //   ? wss.clients.filter(client => client !== exceptSocket)
  //   : wss.clients;
  console.log(typeof wss.clients);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== exceptClient) {
      client.send(data);
    }
  });
};

wss.on('listening', () => {
  console.log('server listening at ', wss.address());
});

const players = {};


const messageHandlers = {
  identify: (client, data) => {
    const name = data.name;
    debugger;
  }
}

wss.on('connection', (ws) => {
  console.log('connection!');

  ws.on('message', (message) => {
    console.log('received: %s', message);
    const messageType = message.type;
    if (!messageType) {
      console.warn('Unrecognized message');
      return;
    }
    const handler = messageHandlers[messageType];
    if (handler) {
      handler(ws, message.payload);
    } else {
      console.warn('no handler for message type %s', messageType);
    }
  });

  ws.send({
    type: 'welcome',
    payload: {
      serverName: 'Jockes server',
      serverTime: new Date().toString()
    }
  });
});

