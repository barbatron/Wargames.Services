class Game {
  constructor(map, players = {}) {
    this.players = players;
    this.map = map;
  }
};

module.exports = Game;