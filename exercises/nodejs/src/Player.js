export class Player {
  constructor(name, place, purse, inPenaltyBox) {
    this.name = name;
    this.place = place;
    this.purse = purse;
    this.inPenaltyBox = inPenaltyBox;
  }

  correctAnswer(){
    this.purse += 1
  }
}
