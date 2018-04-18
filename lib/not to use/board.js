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

  // getCoordeForShape(pointA, pointB){
  //    let arr = this.arrOutlinCoor.forEach( arrPoints => {
  //     if ((arrPoints[0] <= pointA[0] && arrPoints[1] <= pointA[1])
  //       && (arrPoints[0] <= pointB[0] && arrPoints[1] <= pointB[1]) )
  //       {
  //          return arrPoints;
  //       }
  //   });
  //   return arr;
  // }

  //between [2,0] and [0,2]
  // [1,0], [0,0], [0,1]

}

export default Board;
