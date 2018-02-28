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

const players = {};

const defaultParams = require('./defaultParams');
const Game = require('./game');

const game = new Game(defaultParams.defaultMap, players);

const messageHandlers = {
  identify: (client, data) => {
    const name = data.name;
    client.name = name;
    if (players[name]) {
      let existingPlayer = players[name];
      if (existingPlayer.client.readyState === WebSocket.OPEN) {
        console.warn(`Player named ${name} already connected`);
        client.sendMessage('error', {message: 'Player with name already connected.'});
      }
      return;
    }
    const player = {
      client: client,
      name: name,
      connectedAt: Date.now()
    };
    players[name] = player;
    console.log(`Player ${name} identified`);
    // TODO: Install player into game and send game status
  },

  location: (client, data) => {
    const player = players[client.name];
    if (!player) {
      return;
    }
    player.location = data;
    console.log(`Player "${player.name}" at lng:${data.location.lng}, lat:${data.location.lat}`);
  }
};

const welcomePlayer = ws => {
  ws.sendMessage('welcome', {
    serverName: 'Jockes server',
    serverTime: new Date().toString()
  });
};

wss.on('connection', (ws) => {
  console.log('connection!');
  wsMessaging.install(ws, messageHandlers);
  welcomePlayer(ws);
});

wss.on('listening', () => {
  console.log('server listening at ', wss.address());
});
