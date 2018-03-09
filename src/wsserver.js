import './adminHandlers';
import {getAll as getMessageHandlers} from './handlers/handlers';

/*
 * WS
 */
const WebSocket = require('ws');
const wsMessaging = require('./ws.messaging');
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

wss.on('connection', (ws) => {
  console.log('connection!');
  wsMessaging.install(ws, getMessageHandlers);
});

wss.on('listening', () => {
  console.log('server listening at ', wss.address());
});
