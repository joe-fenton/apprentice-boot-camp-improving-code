import generator from 'random-seed'

class Players {
  constructor () {
    this.players = []
  }

  add (name) {
    this.players.push(name)
  }

  numberOfPlayers () {
    return this.players.length
  }

  getPlayer (position) {
    return this.players[position]
  }
}

var Game = function () {
  var players = new Players()
  var places = new Array(6)
  var purses = new Array(6)
  var inPenaltyBox = new Array(6)

  var popQuestions = []
  var scienceQuestions = []
  var sportsQuestions = []
  var rockQuestions = []

  var currentPlayer = 0
  var isGettingOutOfPenaltyBox = false

  var didPlayerWin = function () {
    return !(purses[currentPlayer] === 6)
  }

  var currentCategory = function () {
    if (places[currentPlayer] === 0) { return 'Pop' }
    if (places[currentPlayer] === 4) { return 'Pop' }
    if (places[currentPlayer] === 8) { return 'Pop' }
    if (places[currentPlayer] === 1) { return 'Science' }
    if (places[currentPlayer] === 5) { return 'Science' }
    if (places[currentPlayer] === 9) { return 'Science' }
    if (places[currentPlayer] === 2) { return 'Sports' }
    if (places[currentPlayer] === 6) { return 'Sports' }
    if (places[currentPlayer] === 10) { return 'Sports' }
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
    players.add(playerName)
    places[players.numberOfPlayers() - 1] = 0
    purses[players.numberOfPlayers() - 1] = 0
    inPenaltyBox[players.numberOfPlayers() - 1] = false

    console.log(playerName + ' was added')
    console.log('They are player number ' + players.numberOfPlayers())

    return true
  }

  var askQuestion = function () {
    if (currentCategory() === 'Pop') { console.log(popQuestions.shift()) }
    if (currentCategory() === 'Science') { console.log(scienceQuestions.shift()) }
    if (currentCategory() === 'Sports') { console.log(sportsQuestions.shift()) }
    if (currentCategory() === 'Rock') { console.log(rockQuestions.shift()) }
  }

  this.roll = function (roll) {
    console.log(players.getPlayer(currentPlayer) + ' is the current player')
    console.log('They have rolled a ' + roll)

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 !== 0) {
        isGettingOutOfPenaltyBox = true

        console.log(
          players.getPlayer(currentPlayer) +
            ' is getting out of the penalty box'
        )
        places[currentPlayer] = places[currentPlayer] + roll
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12
        }

        console.log(
          players.getPlayer(currentPlayer) +
            "'s new location is " +
            places[currentPlayer]
        )
        console.log('The category is ' + currentCategory())
        askQuestion()
      } else {
        console.log(
          players.getPlayer(currentPlayer) +
            ' is not getting out of the penalty box'
        )
        isGettingOutOfPenaltyBox = false
      }
    } else {
      places[currentPlayer] = places[currentPlayer] + roll
      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12
      }

      console.log(
        players.getPlayer(currentPlayer) +
          "'s new location is " +
          places[currentPlayer]
      )
      console.log('The category is ' + currentCategory())
      askQuestion()
    }
  }

  this.wasCorrectlyAnswered = function () {
    let winner
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!')
        purses[currentPlayer] += 1
        console.log(
          players.getPlayer(currentPlayer) +
            ' now has ' +
            purses[currentPlayer] +
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

      purses[currentPlayer] += 1
      console.log(
        players.getPlayer(currentPlayer) +
          ' now has ' +
          purses[currentPlayer] +
          ' Gold Coins.'
      )

      winner = didPlayerWin()

      currentPlayer += 1
      if (currentPlayer === players.numberOfPlayers()) { currentPlayer = 0 }

      return winner
    }
  }

  this.wrongAnswer = function () {
    console.log('Question was incorrectly answered')
    console.log(
      players.getPlayer(currentPlayer) + ' was sent to the penalty box'
    )
    inPenaltyBox[currentPlayer] = true

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
