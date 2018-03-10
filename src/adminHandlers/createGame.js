const Game = require('../games/game');
const games = require('../games/games');
const Map = require('../map');

/**
 * Handles the CREATE_GAME command.
 * This handler creates a new game associated with the calling admin, and adds it to the game registry.
 * @param client The admin client.
 * @param payload The game parameters, specifying map parameters.
 * @param respond The callback for responding.
 * @returns {*} The response promise.
 */
const handleCreateGame = (client, payload, respond) => {
  const existingGame = games.getByAdminNameAndGameName(client.name, payload.name);
  if (existingGame) {
    return respond('createGame.error', {message: 'Game already exists'});
  }
  const map = new Map(payload.northWestCoords, payload.southEastCoords);
  const game = new Game(map, client);
  games.create(client.name, payload.name);
  return respond('enter-game', game);
};

module.exports = handleCreateGame;
