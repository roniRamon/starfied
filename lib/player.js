// import MovingObject from './moving_object';

class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.character = new Image();
    this.character.src = "assets/images/sprite/mothership_blue.png";

    document.addEventListener('keydown', this.keyDown.bind(this), false);

    this.ship_x = (this.width / 2) - 25;
    this.ship_y = this.height - 50;
    this.ship_w = 50, this.ship_h = 40;

    //protected
    this.protected = true;

  }

  draw(ctx) {
    ctx.drawImage(
      this.character,
      this.ship_x, this.ship_y,
      this.ship_w, this.ship_h
    );
  }

  keyDown(e) {
    switch (e.keyCode) {
      case 37:
        //left key
        if ((this.ship_x - 5 ) < 0 ) this.ship_x;
        else this.ship_x -= 5;
      break;
      case 38:
        //up key
        if ((this.ship_y - 5 ) < 0 ) this.ship_y;
        else this.ship_y -= 5;
      break;
      case 39:
        //right key
        if ((this.ship_x + 5 ) > (this.width-50)) this.ship_x;
        else this.ship_x += 5;
      break;
      case 40:
        //down key
        if ((this.ship_y + 5 ) > (this.height-40) ) this.ship_y;
        else this.ship_y += 5;
      break;
      case 32:
        //space
        console.log("SPACE");
      break;
    }
  }


}

export default Player;
