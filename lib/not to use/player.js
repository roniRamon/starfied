 import Util from './util';

class Player {
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.board = options.board;
    this.width = this.board.width;
    this.height = this.board.height;

    this.character = new Image();
    this.character.src = "assets/images/sprite/mothership_blue.png";

    document.addEventListener('keydown', this.keyDown.bind(this), false);

    this.ship_x = (this.width/2);
    this.ship_y = this.height;
    this.ship_w = 40, this.ship_h = 30;
    this.shipRadius = 15;
    this.pos = [this.ship_x, this.ship_y];

    //protected
    this.protected = true;
    this.linePosArr = [];

  }

  draw(ctx) {
    ctx.drawImage(
      this.character,
      this.ship_x, this.ship_y,
      this.ship_w, this.ship_h
    );

    if (this.linePosArr.length > 0 ){
      for (var i = 0; i < this.linePosArr.length; i+= 2) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.linePosArr[i][0], this.linePosArr[i][1]);
        this.ctx.lineTo(this.linePosArr[i+1][0], this.linePosArr[i+1][1]);
        this.ctx.stroke();
      }
    }

  }

  keyDown(e) {
    this.linePosArr.push([this.ship_x+20, this.ship_y+20]);

    switch (e.keyCode) {
      case 37:
        //left key
        if ((this.ship_x -5 ) < 0 ) this.ship_x = -5;
        else this.ship_x -= 5;
      break;
      case 38:
        //up key
        if ((this.ship_y - 5 ) < 0 ) this.ship_y = -5;
        else this.ship_y -= 5;
      break;
      case 39:
        //right key
        if ((this.ship_x + 5 ) > (this.width-5)) this.ship_x;
        else this.ship_x += 5;
      break;
      case 40:
        //down key
        if ((this.ship_y + 5 ) > (this.height-5) ) this.ship_y;
        else this.ship_y += 5;
      break;
      case 32:
        //space
        console.log("SPACE");
      break;
    }

    this.linePosArr.push([this.ship_x+20, this.ship_y+20]);
  }

  isCollidedWith(otherObject) {
    // const centerDist = Util.dist(this.pos, otherObject.pos);
    //
    // if (centerDist < (this.radius + otherObject.radius) ||
    //     this.linePosArr.includes(otherObject.pos)){
    //       return true;
    //     }
    // return false;

  }

}

export default Player;
