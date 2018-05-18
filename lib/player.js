class Player {
  constructor (board){
    // this.size = [2,2];
    this.board = board;
    this.imageSrc = "assets/images/sprite/mothership_blue.png";
    this.position = this.startPos();
    this.playerMoves = [];
  }

  startPos (){
    let row = 0;
    let col = (this.board.rowCol / 2) - 1;
    this.board.setCellAt([row, col], "P");
    return [row, col];
  }

  moves (e){
    switch (e.keyCode) {
      case 37:
        this.updatePos(Player.MOVES[3]);
      break;
      case 38:
        this.updatePos(Player.MOVES[1]);
      break;
      case 39:
        this.updatePos(Player.MOVES[2]);
      break;
      case 40:
        this.updatePos(Player.MOVES[0]);
      break;
    }
    this.board.eraseMap();
    this.board.drawMap();
    return this.position;
  }

  validMove (pos){
    return this.board.validMove(pos);
  }

  collision (){

  }

  pos (){
    return this.position;
  }

  updatePos (diff){
    let move =  [this.position[0] + diff[0], this.position[1] + diff[1]];
    if(this.validMove(move)){
      this.position = move;
      this.board.setCellAt(move, "P");
    }
  }

}

Player.MOVES = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1]
];

module.exports = Player;
