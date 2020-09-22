const WINNING_COINS = 6
export class Player {
  constructor (name, position, purse, inPenaltyBox) {
    this.name = name
    this.position = position
    this.purse = purse
    this.inPenaltyBox = inPenaltyBox
  }

  correctAnswer () {
    this.purse += 1
    this.logPlayerPurseState()
  }

  incorrectAnswer () {
    console.log('Question was incorrectly answered')
    console.log(this.name + ' was sent to the penalty box')
    this.inPenaltyBox = true
  }

  logPlayerPurseState () {
    console.log('Answer was correct!!!!')
    console.log(this.name + ' now has ' + this.purse + ' Gold Coins.')
  }

  didPlayerWin () {
    return (this.purse === WINNING_COINS)
  }

  rollDice(roll){
    this.position += roll;
    if (this.position > 11) {
      this.position -= 12;
    }

    console.log(this.name + "'s new location is " + this.position);
  }
}
