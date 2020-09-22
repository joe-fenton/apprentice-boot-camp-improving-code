import generator from 'random-seed'
import { Player } from './Player'
import { Players } from './Players'
import { Board } from './Board'

var Game = function () {
  const BOARD_SIZE = 12
  const players = new Players()
  const board = new Board(BOARD_SIZE)

  var currentPlayer = 0

  var currentCategory = function () {
    return board.getCategoryForBoardPosition(players.getPlayer(currentPlayer).position)
  }

  this.gameCanStart = function (howManyPlayers) {
    return howManyPlayers >= 2
  }

  this.addPlayer = function (playerName) {
    const player = new Player(playerName, 0, 0, false)
    players.add(player)
  }

  this.turn = function (roll) {
    const player = players.getPlayer(currentPlayer)
    console.log(player.name + ' is the current player')
    console.log('They have rolled a ' + roll)

    if (player.inPenaltyBox) {
      if (roll % 2 !== 0) {
        player.gettingOutOfThePenaltyBox(true)
        this.movePlayer(player, roll)
      } else {
        player.gettingOutOfThePenaltyBox(false)
      }
    } else {
      this.movePlayer(player, roll)
    }
  }

  this.movePlayer = (player, roll) => {
    player.rollDice(roll)
    console.log('The category is ' + currentCategory())
    board.askQuestionOnBoardPosition(player.position)
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
