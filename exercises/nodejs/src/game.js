import generator from 'random-seed'
import { Player } from './Player'
import { Players } from './Players'
import { Questions } from './Questions'

var Game = function () {
  const players = new Players()
  const questions = new Questions()

  var currentPlayer = 0
  var isGettingOutOfPenaltyBox = false

  var didPlayerWin = function (player) {
    return !(player.purse === 6)
  }

  var currentCategory = function () {
    const player = players.getPlayer(currentPlayer)
    const currentPlace = player.place
    if (currentPlace === 0) { return 'Pop' }
    if (currentPlace === 1) { return 'Science' }
    if (currentPlace === 2) { return 'Sports' }
    if (currentPlace === 4) { return 'Pop' }
    if (currentPlace === 5) { return 'Science' }
    if (currentPlace === 6) { return 'Sports' }
    if (currentPlace === 8) { return 'Pop' }
    if (currentPlace === 9) { return 'Science' }
    if (currentPlace === 10) { return 'Sports' }
    return 'Rock'
  }

  this.isPlayable = function (howManyPlayers) {
    return howManyPlayers >= 2
  }

  this.add = function (playerName) {
    const player = new Player(playerName, 0, 0, false)
    players.add(player)
  }

  var askQuestion = function () {
    if (currentCategory() === 'Pop') { console.log(questions.popQuestions.shift()) }
    if (currentCategory() === 'Science') { console.log(questions.scienceQuestions.shift()) }
    if (currentCategory() === 'Sports') { console.log(questions.sportsQuestions.shift()) }
    if (currentCategory() === 'Rock') { console.log(questions.rockQuestions.shift()) }
  }

  this.turn = function (roll) {
    const player = players.getPlayer(currentPlayer)
    console.log(player.name + ' is the current player')
    console.log('They have rolled a ' + roll)

    if (player.inPenaltyBox) {
      if (roll % 2 !== 0) {
        isGettingOutOfPenaltyBox = true

        console.log(
          player.name +
            ' is getting out of the penalty box'
        )
        player.place += roll
        if (player.place > 11) {
          player.place -= 12
        }

        console.log(
          player.name +
            "'s new location is " +
            player.place
        )
        console.log('The category is ' + currentCategory())
        askQuestion()
      } else {
        console.log(
          player.name +
            ' is not getting out of the penalty box'
        )
        isGettingOutOfPenaltyBox = false
      }
    } else {
      player.place += roll
      if (player.place > 11) {
        player.place -= 12
      }

      console.log(
        player.name +
          "'s new location is " +
          player.place
      )
      console.log('The category is ' + currentCategory())
      askQuestion()
    }
  }

  this.nextPlayer = () => {
    currentPlayer += 1
    if (currentPlayer === players.numberOfPlayers()) {
      currentPlayer = 0
    }
  }

  this.correctAnswerWhileAbleToScore = (player) => {
    player.correctAnswer()
    this.nextPlayer()
    return didPlayerWin(player)
  }

  this.wasCorrectlyAnswered = function () {
    const player = players.getPlayer(currentPlayer)
    if (player.inPenaltyBox) {
      if (isGettingOutOfPenaltyBox) {
        return this.correctAnswerWhileAbleToScore(player)
      } else {
        currentPlayer += 1
        if (currentPlayer === players.numberOfPlayers()) { currentPlayer = 0 }
        return true
      }
    } else {
      return this.correctAnswerWhileAbleToScore(player)
    }
  }

  this.wrongAnswer = function () {
    const player = players.getPlayer(currentPlayer)
    console.log('Question was incorrectly answered')
    console.log(
      player.name + ' was sent to the penalty box'
    )
    player.inPenaltyBox = true

    currentPlayer += 1
    if (currentPlayer === players.numberOfPlayers()) { currentPlayer = 0 }
    return true
  }
}

const gameRunner = (i) => {
  var notAWinner = false

  var game = new Game()

  game.add('Chet')
  game.add('Pat')
  game.add('Sue')

  const random = generator.create(i)

  do {
    game.turn(random.range(5) + 1)

    if (random.range(9) === 7) {
      notAWinner = game.wrongAnswer()
    } else {
      notAWinner = game.wasCorrectlyAnswered()
    }
  } while (notAWinner)
}

export default gameRunner
