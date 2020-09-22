import {
  POP_CATEGORY,
  SCIENCE_CATEGORY,
  SPORTS_CATEGORY,
  ROCK_CATEGORY
} from './Categories'

export class Board {
  constructor (boardSize) {
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
}
