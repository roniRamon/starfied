class Alien {
  constructor(options){
    this.canvas = options.canvas;

    this.character = new Image();
    this.character.src = options.src;

    this.pos = [];
    this.pos.push(Math.floor(Math.random() * Math.floor(this.canvas.width)));
    this.pos.push(Math.floor(Math.random() * Math.floor(this.canvas.height)));
    this.size = options.size;

    this.alienRadius = 40;
    this.moveX = 2;
    this.moveY = -2;

  }

  randomPos() {
    this.pos = [];
    this.pos.push(Math.floor(Math.random() * Math.floor(this.canvas.width)));
    this.pos.push(Math.floor(Math.random() * Math.floor(this.canvas.height)));
  }

  moveRandom() {
    this.randomPos();
    console.log(this.pos);
  }

  drawAlien(ctx) {
    ctx.drawImage(
      this.character,
      this.pos[0], this.pos[1],
      this.size[0], this.size[1]
    );
  }

  draw(ctx) {

    ctx.drawImage(
      this.character,
      this.pos[0], this.pos[1],
      this.size[0], this.size[1]
    );

    if(this.pos[0] + this.moveX > this.canvas.width-this.alienRadius ||
       this.pos[0] + this.moveX < this.alienRadius) {
       this.moveX = -this.moveX;
     }
     if(this.pos[0] + this.moveY >this.canvas.height-this.alienRadius ||
        this.pos[1] + this.moveY < this.alienRadius) {
         this.moveY = -this.moveY;
     }

    this.pos[0] += this.moveX;
    this.pos[1] += this.moveY;
  }

}

export default Alien;