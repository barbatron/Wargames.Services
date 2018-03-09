class Game {
  constructor(map, adminClient, players = {}) {
    this.map = map;
    this.admins = [adminClient];
    this.players = players;
  }

  /**
   * Adds an administrator to this game.
   * @param client The client connection of the administrator.
   */
  joinAdmin(client) {
    const existingAdmin = this.admins.find(admin => admin.name === client.name);
    if (existingAdmin) {
      throw new Error('Admin already exists');
    }
    this.admins.push(client);
  }
}

module.exports = Game;