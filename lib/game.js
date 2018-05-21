const Board = require('./board.js');
const Player = require('./player.js');
const Enemy = require('./enemy.js');


class Game {
  constructor (){
    this.board = new Board(50);
    this.board.drawMap();
    this.score = 0;
    this.life = 3;

    this.player = new Player(this.board);
    this.enemy = new Enemy(this.board);

    document.addEventListener('keydown', (e) => {
      this.player.moves(e);
    });
    this.gameLoop();
  }

  win (){
    this.start();
  }

  gameOver (){
    window.location.href = '#lose';
    this.start();
  }

  calcScore (){
    return this.board.points / (((this.board.rowCol / 2.0) - 2.0) * (this.board.rowCol - 2.0)) * 100;
  }

  start (){

  }

  gameLoop (){
    let gameLoopTimer = setInterval(() => {
      this.showPoints();
      if(this.board.collisions){
        this.board.collisions = false;
        this.life -= 1;
        this.score = this.calcScore();
        this.player.cleareArrayOfMoves();
        this.board.setCellAt(this.player.position, "0");
        this.player.position = this.player.startPos();
      }
      if (this.life === 0) {
        this.showPoints();
        clearInterval(gameLoopTimer);
        this.gameOver();
      }
    },300);
  }

  showPoints (){
    let pointP = document.getElementById('points-div');
    let prese = this.calcScore().toFixed(2);
    pointP.innerHTML = "Score: " + prese + "% <br> Life: ";
     for (var i = 0; i < this.life; i++) {
       let tile = document.createElement('div');
       tile.classList.add('tile');
       tile.classList.add('player');
       pointP.appendChild(tile);
     }
    if (prese >= 80 ){
      window.location.href = '#win';
    }
  }

}




module.exports = Game;
