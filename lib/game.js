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
      this.addBoard(canvas);
      this.addPlayer(canvas);
      this.addAlien();
  }


  addPlayer(canvas) {
    let ship = new Player({
      canvas: canvas,
      board: this.board[0],
    });
    this.player.push(ship);
  }

  addAlien() {
    let alien = new Alien({
      board: this.board[0],
      src: 'assets/images/alien/eyebot.png',
      size: [40, 40],
    });

    this.alien.push(alien);
  }

  addBoard(canvas) {
    let board = new Board({canvas: canvas});

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
    // this.checkCollisions();
    this.checkPlayerReachBorder();
  }

  checkCollisions() {
    // if (this.player[0].isCollidedWith(this.alien[0])) {
    //     console.log("collision just happend");
    // }
  }

  checkPlayerReachBorder() {
    if(this.player[0].linePosArr.length > 0 ) {
      //get the starting point index in the board coordinates array
      for (var i = 0; i < this.board[0].arrOutlinCoor.length; i++) {
        if (this.player[0].linePosArr[this.player[0].linePosArr.length -1][0] == this.board[0].arrOutlinCoor[i][0]  &&
          this.player[0].linePosArr[this.player[0].linePosArr.length -1][1] == this.board[0].arrOutlinCoor[i][1]
        ){
          //split to two array of coordinates
          // let firstShape = this.player[0].linePosArr;
          // let secoundShape = this.player[0].linePosArr;
          //
          // for (var y = i+1; y < this.board[0].arrOutlinCoor.length; y++){
          //   firstShape.push(this.board[0].arrOutlinCoor[y]);
          // }
          console.log("reach border");

        }
      }

    }
  }


}




export default Game;
