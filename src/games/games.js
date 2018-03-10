const Game = require('./game');

const games = {};

const create = (adminName, gameName) => {
  const adminGames = games[adminName] || (games[adminName] = {});
  adminGames[gameName] = new Game();
  return adminGames[gameName];
};

const getByAdminName = adminName => games[adminName] || [];

const getByAdminNameAndGameName = (adminName, gameName) => games[adminName][gameName];

module.exports = {create, getByAdminName, getByAdminNameAndGameName};
