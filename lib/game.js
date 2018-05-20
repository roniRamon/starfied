// import Alien from './alien';
const Board = require('./board.js');
const Player = require('./player.js');
const Enemy = require('./enemy.js');


class Game {
  constructor (){
    // this.startGame(grid);
    // this.playerMoves = [];
    // this.player = document.querySelectorAll('[color="yellow"]')[0];
    // this.alien = new Alien();
    this.board = new Board(50);
    this.board.drawMap();
    this.score = 0;
    this.life = 3;

    this.player = new Player(this.board);
    this.enemy = new Enemy(this.board);

    this.gameLoop();
  }

  win (){
    return this.score >= 80;
  }

  lose (){
    return this.life <= 0;
  }

  calcScore (){
    return this.board.points / (((this.board.rowCol / 2.0) - 2.0) * (this.board.rowCol - 2.0)) * 100;
  }

  start (){

  }

  gameLoop (){
    document.addEventListener('keydown', (e) => {
      this.player.moves(e);
      this.showPoints();
    });
    // setInterval(() => {
    //   () => {
        if(this.board.collisions){
          this.board.collisions = false;
          this.life -= 1;
          this.score = this.calcScore();
          this.player.position = this.player.startPos();
          this.player.cleareArrayOfMoves();
        }
        if(!this.life > 0){
          alert("Game Over");
        }
    //   }, 300
    // });

  }

  showPoints (){
    let pointP = document.getElementById('points-div');
    let prese = this.calcScore().toFixed(2);
    pointP.innerHTML = "Score: " + prese + "%";
    if (prese >= 80 ){
      window.location.href = '#win';
      this.board.points = 0;
    }
  }

  collision (){

  }

}




module.exports = Game;
