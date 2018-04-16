import Player from './player';
import Alien from './alien';
import Board from './board';

class Game {
  constructor (canvas, ctx){
      this.player = [];
      this.alien = [];
      this.board = [];

      this.ctx = ctx;
      this.canvas = canvas;
      this.addPlayer(canvas);
      this.addAlien(canvas);
      this.addBoard(canvas);
  }


  addPlayer(canvas) {
    let ship = new Player(canvas);
    this.player.push(ship);
  }

  addAlien(canvas) {
    let alien = new Alien({
      canvas: canvas,
      src: 'assets/images/alien/eyebot.png',
      size: [40, 40],
    });

    this.alien.push(alien);
  }

  addBoard(canvas) {
    let board = new Board({canvas: canvas});
    console.log(board.width);
    this.board.push(board);
  }

  allObjects(){
    return [].concat(this.player, this.alien, this.board);
  }

  draw(ctx) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.allObjects().forEach((object) => {
      object.draw(this.ctx);
    });
  }

  start() {
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time){
    const timeDelta = time - this.lastTime;

    this.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

}

export default Game;
