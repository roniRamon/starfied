class Board {
  constructor(options){
    this.canvas = options.canvas;

  }

draw(ctx) {
  ctx.rect(15, 15, this.canvas.width-30, this.canvas.height-30);
  ctx.stroke();
}



}

export default Board;
