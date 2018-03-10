const GameStates = require('./states');

class Game {
  constructor(map, adminClient, players = {}) {
    this.map = map;
    this.admins = [adminClient];
    this.players = players;
    this.state = GameStates.LOBBY;
  }

  /**
   * STATE MANIPULATION
   */
  activate() {
    this.state = GameStates.ACTIVE;
  }

  end() {
    this.state = GameStates.ENDED;
  }

  /**
   * Adds an administrator to this game.
   * @param client The client connection of the administrator.
   */
  joinAdmin(client) {
    const existingAdmin = this.admins.find(admin => admin.name === client.name);
    if (existingAdmin) {
      throw new Error(`Admin ${client.name} already exists`);
    }
    this.admins.push(client);
  }

  leaveAdmin(client) {
    const admin = this.admins.find(admin => admin.name === client.name);
    if (!admin) {
      throw new Error(`Admin client ${client.name} not found`);
    }
  }
}

module.exports = Game;