import generator from 'random-seed'
import { Player } from './Player'
import { Players } from './Players'
import { Questions } from './Questions'

var Game = function () {
  const POP_CATEGORY = 'Pop'
  const SCIENCE_CATEGORY = 'Science'
  const SPORTS_CATEGORY = 'Sports'
  const ROCK_CATEGORY = 'Rock'

  const players = new Players()
  const questions = new Questions()

  var currentPlayer = 0

  var currentCategory = function () {
    const player = players.getPlayer(currentPlayer)
    const currentPlace = player.position
    if (currentPlace === 0) { return POP_CATEGORY }
    if (currentPlace === 1) { return SCIENCE_CATEGORY }
    if (currentPlace === 2) { return SPORTS_CATEGORY }
    if (currentPlace === 4) { return POP_CATEGORY }
    if (currentPlace === 5) { return SCIENCE_CATEGORY }
    if (currentPlace === 6) { return SPORTS_CATEGORY }
    if (currentPlace === 8) { return POP_CATEGORY }
    if (currentPlace === 9) { return SCIENCE_CATEGORY }
    if (currentPlace === 10) { return SPORTS_CATEGORY }
    return ROCK_CATEGORY
  }

  this.gameCanStart = function (howManyPlayers) {
    return howManyPlayers >= 2
  }

  this.addPlayer = function (playerName) {
    const player = new Player(playerName, 0, 0, false)
    players.add(player)
  }

  var askQuestion = function () {
    if (currentCategory() === POP_CATEGORY) { console.log(questions.popQuestions.shift()) }
    if (currentCategory() === SCIENCE_CATEGORY) { console.log(questions.scienceQuestions.shift()) }
    if (currentCategory() === SPORTS_CATEGORY) { console.log(questions.sportsQuestions.shift()) }
    if (currentCategory() === ROCK_CATEGORY) { console.log(questions.rockQuestions.shift()) }
  }

  this.turn = function (roll) {
    const player = players.getPlayer(currentPlayer)
    console.log(player.name + ' is the current player')
    console.log('They have rolled a ' + roll)

    if (player.inPenaltyBox) {
      if (roll % 2 !== 0) {
        player.gettingOutOfThePenaltyBox(true)
        player.rollDice(roll)
        console.log('The category is ' + currentCategory())
        askQuestion()
      } else {
        player.gettingOutOfThePenaltyBox(false)
      }
    } else {
      player.rollDice(roll)
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
      if (player.isGettingOutOfThePenaltyBox) {
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
