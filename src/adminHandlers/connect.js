const games = require('../games/games');

const handleConnect = (client, payload, respond) => {
  const adminGames = games.getByAdminName(client.name);
  respond('games-list', adminGames);
};

module.exports = handleConnect;