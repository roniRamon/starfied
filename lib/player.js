class Player {
  constructor (board){
    // this.size = [2,2];
    this.board = board;
  }

  startPos (){
    let coordX = this.board.rowCol / 2;
    let coordY = 0;
    return [coordX, coordY];
  }

  moves (e){

  }

  validMove (){

  }

  collision (){

  }

  pos (){

  }

}

Player.MOVES = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1]
];
