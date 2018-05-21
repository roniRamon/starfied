const Board = require('./board.js');

class Enemy {
  constructor (board){
    this.board = board;
    this.position = this.startPos();

    setInterval(() => this.moves(this.random_move()), 200);
  }

  startPos (){
    let col = Math.floor(Math.random() * Math.floor(this.board.rowCol-2)) + 1;
    let row = Math.floor(Math.random() * Math.floor((this.board.rowCol / 2)-2)) +1;
    this.board.setCellAt([row, col], "E");
    return [row, col];
  }

  random_move (){
    return Enemy.MOVES[Math.floor(Math.random() * 4) +1];
  }

  moves (randomDiff){
    let diff;
    let moveTo;
    try {
      moveTo = [this.position[0] + randomDiff[0], this.position[1] + randomDiff[1]];
    }
    catch(err) {
      moveTo = this.position;
    }

    let moveVal = this.board.getCellAt(moveTo);
    while(moveVal === "1" || !this.board.validMove(moveTo)) {
      try {
        diff = this.random_move();
        moveTo = [this.position[0] + diff[0], this.position[1] + diff[1]];
      }
      catch(err) {
        moveTo = this.position;
      }
      moveVal = this.board.getCellAt(moveTo);
    }

    if(moveVal === "P"){
      this.collisions();
      return this.position;
    }
    else if (moveVal === "-") {
      this.collisions();
      return this.position;
    }
    else if (moveVal === "0") {
      this.board.setCellAt(this.position, "0");
      this.position = moveTo;
      this.board.setCellAt(moveTo, "E");
    }
    return this.position;
  }

  collisions (){
    this.board.collision();
  }

}

Enemy.MOVES = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1]
];

module.exports = Enemy;
