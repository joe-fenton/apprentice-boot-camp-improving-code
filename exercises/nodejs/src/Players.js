export class Players {
  constructor () {
    this.players = []
  }

  add (player) {
    this.players.push(player)
    console.log(player.name + ' was added')
    console.log('They are player number ' + this.players.length)
  }

  numberOfPlayers () {
    return this.players.length
  }

  getPlayer (position) {
    return this.players[position]
  }
}
