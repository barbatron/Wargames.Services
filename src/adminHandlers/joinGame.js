const handlers = require('../handlers/handlers');
const games = require('../games/games');

handlers.register('admin.joinGame', (client, payload, respond) => {
  const game = games.getByAdminNameAndGameName(client.name, payload.name);
  game.joinAdmin(client);
  respond('enter-game', game);
});
