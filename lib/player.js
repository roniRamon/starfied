const Board = require('./board.js');

class Player {
  constructor (board){
    // this.size = [2,2];
    this.board = board;
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
    return this.position;
  }

  validMove (pos){
    return this.board.validMove(pos);
  }

  collision (){
    this.board.collision();
  }

  pos (){
    return this.position;
  }

  updatePos (diff){
    let move =  [this.position[0] + diff[0], this.position[1] + diff[1]];
    let moveVal = this.board.getCellAt(move);

    if(this.validMove(move)){
      if( moveVal === "1" && this.playerMoves.length === 0) {
        //1. move on boarder with empty arr - nothing
        this.board.setCellAt(this.position, "1");
        this.board.setCellAt(move, "P");
      }
      else if (moveVal === "1" && !(this.playerMoves.length === 0)) {
        //2. move on boarder with NOT empty array - flood fill, make arr el safe zone, empty arr
        this.playerMoves.forEach( coord => this.board.setCellAt(coord, "1"));
        this.board.floodFillArea(move);
        this.board.points += this.playerMoves.length;
        this.playerMoves = [];
        this.board.setCellAt(move, "P");
      }
      else if (moveVal === "0" && this.playerMoves.length === 0 ) {
        //3. move on empty space + empty arr = push pos to arr until reach
        // safe zone, current pos make safe zone back
        this.playerMoves.push(move);
        this.board.setCellAt(this.position, "1");
        this.board.setCellAt(move, "P");
      }
      else if (moveVal === "0") {
        //4. move on empty space = push pos to arr
        this.playerMoves.push(move);
        this.board.setCellAt(this.position, "-");
        this.board.setCellAt(move, "P");
      }
      else {
        //collision with "-" or "E" or "D"
        this.collision();
      }
      this.position = move;
    }
    return this.position;
  }

  cleareArrayOfMoves (){
    if(this.playerMoves.length > 0) {
      this.playerMoves.forEach( move => {
        this.board.setCellAt(move, "0");
      });
      this.playerMoves = [];
    }
    this.board.setCellAt(this.position, "0");
  }

}

Player.MOVES = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1]
];

module.exports = Player;
