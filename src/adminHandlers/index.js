import {namespace} from './common';
import handlers from '../handlers/handlers';

import handleConnect from './connect';
import handleCreate from './createGame';

const commandTypes = {
  CONNECT: 'connect',
  CREATE_GAME: 'create-game'
};

handlers.register({
  [commandTypes.CONNECT]: handleConnect,
  [commandTypes.CREATE_GAME]: handleCreate
}, namespace);
