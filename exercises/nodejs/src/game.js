import generator from 'random-seed'
import { Player } from './Player'
import { Players } from './Players'

var Game = function () {
  var players = new Players()

  var popQuestions = []
  var scienceQuestions = []
  var sportsQuestions = []
  var rockQuestions = []

  var currentPlayer = 0
  var isGettingOutOfPenaltyBox = false

  var didPlayerWin = function () {
    const player = players.getPlayer(currentPlayer)
    return !(player.purse === 6)
  }

  var currentCategory = function () {
    const player = players.getPlayer(currentPlayer)
    const currentPlace = player.place
    if (currentPlace === 0) { return 'Pop' }
    if (currentPlace === 4) { return 'Pop' }
    if (currentPlace === 8) { return 'Pop' }
    if (currentPlace === 1) { return 'Science' }
    if (currentPlace === 5) { return 'Science' }
    if (currentPlace === 9) { return 'Science' }
    if (currentPlace === 2) { return 'Sports' }
    if (currentPlace === 6) { return 'Sports' }
    if (currentPlace === 10) { return 'Sports' }
    return 'Rock'
  }

  this.createRockQuestion = function (index) {
    return 'Rock Question ' + index
  }

  for (var i = 0; i < 50; i++) {
    popQuestions.push('Pop Question ' + i)
    scienceQuestions.push('Science Question ' + i)
    sportsQuestions.push('Sports Question ' + i)
    rockQuestions.push(this.createRockQuestion(i))
  }

  this.isPlayable = function (howManyPlayers) {
    return howManyPlayers >= 2
  }

  this.add = function (playerName) {
    const player = new Player(playerName, 0, 0, false)
    players.add(player)

    console.log(playerName + ' was added')
    console.log('They are player number ' + players.numberOfPlayers())
  }

  var askQuestion = function () {
    if (currentCategory() === 'Pop') { console.log(popQuestions.shift()) }
    if (currentCategory() === 'Science') { console.log(scienceQuestions.shift()) }
    if (currentCategory() === 'Sports') { console.log(sportsQuestions.shift()) }
    if (currentCategory() === 'Rock') { console.log(rockQuestions.shift()) }
  }

  this.roll = function (roll) {
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
        player.place -= 12;
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

  this.wasCorrectlyAnswered = function () {
    let winner
    let player = players.getPlayer(currentPlayer)
    if (player.inPenaltyBox) {
      if (isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!')
        player.purse += 1
        console.log(
          player.name +
            ' now has ' +
            player.purse +
            ' Gold Coins.'
        )

        winner = didPlayerWin()
        currentPlayer += 1
        if (currentPlayer === players.numberOfPlayers()) { currentPlayer = 0 }

        return winner
      } else {
        currentPlayer += 1
        if (currentPlayer === players.numberOfPlayers()) { currentPlayer = 0 }
        return true
      }
    } else {
      console.log('Answer was correct!!!!')

      player = players.getPlayer(currentPlayer)
      player.purse += 1
      console.log(
        player.name +
          ' now has ' +
          player.purse +
          ' Gold Coins.'
      )

      winner = didPlayerWin()

      currentPlayer += 1
      if (currentPlayer === players.numberOfPlayers()) { currentPlayer = 0 }

      return winner
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
    game.roll(random.range(5) + 1)

    if (random.range(9) === 7) {
      notAWinner = game.wrongAnswer()
    } else {
      notAWinner = game.wasCorrectlyAnswered()
    }
  } while (notAWinner)
}

export default gameRunner
