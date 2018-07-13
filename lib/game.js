const Board = require('./board.js');
const Player = require('./player.js');
const Enemy = require('./enemy.js');
const EnemySmall = require('./enemy_small.js');



class Game {
  constructor (){
    this.board;
    this.score = 0;
    this.life = 0;
    this.player;
    this.ememy;
    this.e1;
  }

  win (){
    window.location.href = '#win';
  }

  gameOver (){
    window.location.href = '#winOrLose';
  }

  restart (option = 50){
    this.board = new Board(option);
    this.board.drawMap();
    this.score = 0;
    this.life = 3;

    this.player = new Player(this.board);
    this.enemy = new Enemy(this.board, "E");

    this.e1 = new Enemy(this.board, "D");


    document.addEventListener('keydown', (e) => {
      this.player.moves(e);
    });
    this.gameLoop();
  }

  calcScore (){
    return this.board.points / (((this.board.rowCol / 2.0) - 2.0) * (this.board.rowCol - 2.0)) * 100;
  }

  gameLoop (){
    let gameLoopTimer = setInterval(() => {
      this.showPoints();
      this.board.eraseMap();
      this.board.drawMap();
      if(this.board.collisions){
        this.board.collisions = false;
        this.life -= 1;
        this.score = this.calcScore();
        this.player.cleareArrayOfMoves();
        this.board.setCellAt(this.player.position, "0");
        this.player.position = this.player.startPos();
      }
      if (this.life === 0 ) {
        this.showPoints();
        clearInterval(gameLoopTimer);
        this.gameOver();
      }
      this.score = this.calcScore().toFixed(2);
      if (this.score >= 80 ) {
        this.showPoints();
        clearInterval(gameLoopTimer);
        this.win();
      }
    }, 100);
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
  }

}

module.exports = Game;
