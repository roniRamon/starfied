import Player from './player';
import Alien from './alien';

class Board {
  constructor(options){
    this.canvas = options.canvas;
    this.ctx = options.canvas.getContext('2d');

    this.ship = new Player(this.canvas);
    this.alien = new Alien({
      canvas: this.canvas,
      src: 'assets/images/alien/eyebot.png',
      size: [40, 40],
    });

    setInterval(this.draw.bind(this), 10);
  }

drawBorad() {
  this.ctx.rect(15, 15, this.canvas.width-30, this.canvas.height-30);
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.stroke();
}

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBorad();
    // this.ship.draw();
    // this.alien.draw();
  }

}

export default Board;
