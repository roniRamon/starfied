class Player {
  constructor (board){
    // this.size = [2,2];
    this.board = board;
    this.imageSrc = "assets/images/sprite/mothership_blue.png";
    this.position = this.startPos();
  }

  startPos (){
    let coordX = 0;
    let coordY = 0;
    this.board.setCellAt([coordX, coordY], "P");
    return [coordX, coordY];
  }

  moves (e){
    switch (e.keyCode) {
      case 37:
        this.hangePos(Player.MOVES[3]);
      break;
      case 38:
        this.hangePos(Player.MOVES[1]);
      break;
      case 39:
        this.changePos(Player.MOVES[2]);
      break;
      case 40:
        this.changePos(Player.MOVES[0]);
      break;
    }
    return this.position;
  }

  validMove (pos){
    this.board.validMove(pos);
  }

  collision (){

  }

  pos (){
    return this.position;
  }

  updatePos (diff){
    let move =  [this.pos[0] + diff[0], this.pos[1] + diff[1]];
    if(this.validMove(move)) this.position = move;
  }

}

Player.MOVES = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1]
];

module.exports = Player;
