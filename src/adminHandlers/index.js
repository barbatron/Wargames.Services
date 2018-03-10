const namespace = require('./common').namespace;
const handlers = require('../handlers/handlers');

const handleConnect = require('./connect');
const handleCreate = require('./createGame');

const commandTypes = {
  CONNECT: 'connect',
  CREATE_GAME: 'create-game'
};

console.log('adminHabdlers yeah were doing it')
const handlersx = {
  connect: handleConnect,
  'create-game': handleCreate
};
// console.log(`adminHandlers> yeah commhanders HANDLERS=${Object.keys(handlersx)}    NAMESPACE=${ namespace}`);

handlers.register(handlersx, namespace);

