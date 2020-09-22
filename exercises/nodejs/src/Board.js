import {
  POP_CATEGORY,
  SCIENCE_CATEGORY,
  SPORTS_CATEGORY,
  ROCK_CATEGORY
} from './Categories'
import { Questions } from './Questions'

export class Board {
  constructor (boardSize) {
    this.questions = new Questions()
    this.boardPosition = []
    const categories = []
    categories.push(POP_CATEGORY)
    categories.push(SCIENCE_CATEGORY)
    categories.push(SPORTS_CATEGORY)
    categories.push(ROCK_CATEGORY)
    const categoryPositions = boardSize / categories.length
    for (let i = 0; i < categoryPositions; i++) {
      this.boardPosition.push(POP_CATEGORY)
      this.boardPosition.push(SCIENCE_CATEGORY)
      this.boardPosition.push(SPORTS_CATEGORY)
      this.boardPosition.push(ROCK_CATEGORY)
    }
  }

  getCategoryForBoardPosition (position) {
    return this.boardPosition[position]
  }

  askQuestionOnBoardPosition (position) {
    if (this.getCategoryForBoardPosition(position) === POP_CATEGORY) {
      console.log(this.questions.popQuestions.shift())
    }
    if (this.getCategoryForBoardPosition(position) === SCIENCE_CATEGORY) {
      console.log(this.questions.scienceQuestions.shift())
    }
    if (this.getCategoryForBoardPosition(position) === SPORTS_CATEGORY) {
      console.log(this.questions.sportsQuestions.shift())
    }
    if (this.getCategoryForBoardPosition(position) === ROCK_CATEGORY) {
      console.log(this.questions.rockQuestions.shift())
    }
  }
}
