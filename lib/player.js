class Player {
  constructor (board){
    // this.size = [2,2];
    this.board = board;
    this.imageSrc = "assets/images/sprite/mothership_blue.png";
    this.position = this.startPos();
  }

  startPos (){
    let coordX = this.board.rowCol / 2;
    let coordY = 0;
    this.board.setCellAt([coordX, coordY]);
    return [coordX, coordY];
  }

  moves (e){
    let move;

    switch (e.keyCode) {
      case 37:
        move = this.hangePos(Player.MOVES[3]);
        if(this.validMove(move)) this.position = move;
      break;
      case 38:
        move = this.hangePos(Player.MOVES[1]);
        if(this.validMove(move)) this.position = move;
      break;
      case 39:
        move = this.hangePos(Player.MOVES[2]);
        if(this.validMove(move)) this.position = move;
      break;
      case 40:
        move = this.hangePos(Player.MOVES[0]);
        if(this.validMove(move)) this.position = move;
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

  changePos (move){
    return [this.pos[0] + move[0], this.pos[1] + move[1]];
  }

}

Player.MOVES = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1]
];
