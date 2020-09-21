export class Questions {
  constructor () {
    this.popQuestions = []
    this.scienceQuestions = []
    this.sportsQuestions = []
    this.rockQuestions = []
    for (var i = 0; i < 50; i++) {
      this.popQuestions.push(`Pop Question ${i}`)
      this.scienceQuestions.push(`Science Question ${i}`)
      this.sportsQuestions.push(`Sports Question ${i}`)
      this.rockQuestions.push(`Rock Question ${i}`)
    }
  }
}
