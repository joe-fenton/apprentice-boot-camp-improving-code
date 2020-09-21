import generator from 'random-seed'
import { Player } from './Player'
import { Players } from './Players'
import { Questions } from './Questions'

var Game = function () {
  const players = new Players()
  const questions = new Questions()

  var currentPlayer = 0
  var isGettingOutOfPenaltyBox = false

  var currentCategory = function () {
    const player = players.getPlayer(currentPlayer)
    const currentPlace = player.position
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

  this.addPlayer = function (playerName) {
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
        player.position += roll
        if (player.position > 11) {
          player.position -= 12
        }

        console.log(
          player.name +
            "'s new location is " +
            player.position
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
      player.position += roll
      if (player.position > 11) {
        player.position -= 12
      }

      console.log(
        player.name +
          "'s new location is " +
          player.position
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
  }

  this.wasCorrectlyAnswered = function () {
    const player = players.getPlayer(currentPlayer)
    if (player.inPenaltyBox) {
      if (isGettingOutOfPenaltyBox) {
        this.correctAnswerWhileAbleToScore(player)
      }
    } else {
      this.correctAnswerWhileAbleToScore(player)
    }
    this.nextPlayer()
    return player.didPlayerWin()
  }

  this.wrongAnswer = function () {
    const player = players.getPlayer(currentPlayer)
    player.incorrectAnswer()
    this.nextPlayer()
    return player.didPlayerWin()
  }
}

const gameRunner = (i) => {
  var gameWon = false

  var game = new Game()

  game.addPlayer('Chet')
  game.addPlayer('Pat')
  game.addPlayer('Sue')

  const random = generator.create(i)

  do {
    game.turn(random.range(5) + 1)

    if (random.range(9) === 7) {
      gameWon = game.wrongAnswer()
    } else {
      gameWon = game.wasCorrectlyAnswered()
    }
  } while (!gameWon)
}

export default gameRunner
