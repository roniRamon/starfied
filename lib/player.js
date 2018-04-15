// import MovingObject from './moving_object';

class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.character = new Image();
    this.character.src = "assets/images/sprite/small_ships.png";

    document.addEventListener('keydown', this.keyDown.bind(this), false);

    this.ship_x = (this.width / 2) - 25;
    this.ship_y = this.height - 50;
    this.ship_w = 50, this.ship_h = 40;
    this.srcX = 10, this.srcY = 0;

    setInterval(this.draw.bind(this), 100);
  }

  drawPlayer() {
    this.ctx.drawImage(
      this.character,
      this.ship_x, this.ship_y,
      this.ship_w, this.ship_h
    );
  }

  keyDown(e) {
    switch (e.keyCode) {
      case 37:
        //left key
        this.ship_x -= 5;
      break;
      case 38:
        //up key
        this.ship_y -= 5;
      break;
      case 39:
        //right key
        this.ship_x += 5;
      break;
      case 40:
        //down key
        this.ship_y += 5;
      break;
    }
  }


  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawPlayer();
  }

}

export default Player;
