export class Players {
  constructor() {
    this.players = [];
  }

  add(name) {
    this.players.push(name);
  }

  numberOfPlayers() {
    return this.players.length;
  }

  getPlayer(position) {
    return this.players[position];
  }
}
