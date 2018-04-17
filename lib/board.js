class Board {
  constructor(options){
    this.canvas = options.canvas;
    this.width = this.canvas.width-30;
    this.height = this.canvas.height-30;
    this.arrOutlinCoor = [];

    this.getCoord();

  }

  draw(ctx) {
    ctx.rect(15, 15, this.width, this.height);

    ctx.stroke();
  }

  //   ctx.beginPath();
  //   ctx.arc(endX, endY, 5, 0, Math.PI *2);
  //   ctx.stroke();
  //   ctx.closePath();
  // }

  isOutOfBounds(pos){
    if(pos[0] >= this.width || pos[0] < 0) return true;
    if(pos[1] >= this.height || pos[1] < 0) return true;

    return false;
  }

  getCoord() {
    let startingX = (this.canvas.width-this.width)/2;
    let startingY = (this.canvas.height-this.height)/2;
    let endX = this.canvas.width - startingX;
    let endY = this.canvas.height - startingY;

    for (var i = startingX; i <= endX; i++) {
      this.arrOutlinCoor.push([i, startingY]);
    }

    for (var i = startingY; i <= endY; i++) {
      this.arrOutlinCoor.push([startingX, i]);
    }

    for (var i = startingY; i <= endY; i++) {
      this.arrOutlinCoor.push([endX, i]);
    }

    for (var i = startingX; i <= endX; i++) {
      this.arrOutlinCoor.push([i, endY]);
    }

  }



}

export default Board;
