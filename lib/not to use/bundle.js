/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);
// import Player from './player';
// import Alien from './alien';
// import Board from './board';



document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext('2d');

  let game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](canvas, ctx);

  game.start(ctx);

});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alien__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__board__ = __webpack_require__(4);




// async function addElementsToArray(array) {
//
// }

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
    let ship = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]({
      canvas: canvas,
      board: this.board[0],
    });
    this.player.push(ship);
  }

  addAlien() {
    let alien = new __WEBPACK_IMPORTED_MODULE_1__alien__["a" /* default */]({
      board: this.board[0],
      src: 'assets/images/alien/eyebot.png',
      size: [40, 40],
    });

    this.alien.push(alien);
  }

  addBoard(canvas) {
    let board = new __WEBPACK_IMPORTED_MODULE_2__board__["a" /* default */]({canvas: canvas});

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
    let firstShape = [];
    let secoundShape = [];
    if(this.player[0].linePosArr.length > 0 ) {
      //get the starting point index in the board coordinates array
      for (var i = 0; i < this.board[0].arrOutlinCoor.length; i++) {

        //get the start point index in the array outline board
        let startingPoint;
         if (this.player[0].linePosArr[1][0] === this.board[0].arrOutlinCoor[i][0]  &&
           this.player[0].linePosArr[1][1] === this.board[0].arrOutlinCoor[i][1]
         ) {
           startingPoint = i;
           //console.log("startingPoint " + startingPoint);
         }
        if (this.player[0].linePosArr[this.player[0].linePosArr.length -1][0] === this.board[0].arrOutlinCoor[i][0]  &&
          this.player[0].linePosArr[this.player[0].linePosArr.length -1][1] === this.board[0].arrOutlinCoor[i][1]
        ){
          //split to two array of coordinates
          firstShape = this.player[0].linePosArr.slice(0);
          secoundShape = this.player[0].linePosArr.slice(0);

          //console.log("startingPoint " + i+1);
          for (var y = i+1; y <= startingPoint; y++){
            firstShape.push(this.board[0].arrOutlinCoor[y]);
          }
          // console.log("reach border");
          for (var y = startingPoint; y <= i+1; y++){
            secoundShape.push(this.board[0].arrOutlinCoor[y]);
          }

          // console.log(secoundShape);
          // console.log(firstShape);


        }
      }
    }


    // if (firstShape.length > 0) {
    //   this.ctx.beginPath();
    //   this.board[0].arrOutlinCoor.forEach(p => {
    //     this.ctx.lineTo( p[0], p[1] );
    //   });
    //   this.ctx.fillStyle = "red";
    //   this.ctx.fill();
    // }
    if (secoundShape.length > 0) {
      this.ctx.beginPath();
      secoundShape.forEach(p => {
        this.ctx.lineTo( p[0], p[1] );
      });
      this.ctx.fillStyle = "blue";
      this.ctx.fill();
    }
  }


}




/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__util__);
 

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

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Alien {
  constructor(options){
    this.board = options.board;

    this.character = new Image();
    this.character.src = options.src;

    this.pos = [];
    this.pos.push(Math.floor(Math.random() * Math.floor(this.board.width)));
    this.pos.push(Math.floor(Math.random() * Math.floor(this.board.height)));
    // console.log(this.board.height);
    this.size = options.size;

    this.alienRadius = 20;
    this.moveX = 2;
    this.moveY = -2;

  }

  randomPos() {
    this.pos = [];
    this.pos.push(Math.floor(Math.random() * Math.floor(this.board.width)));
    this.pos.push(Math.floor(Math.random() * Math.floor(this.board.height)));
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

    if(this.pos[0] + this.moveX > this.board.width-this.alienRadius ||
       this.pos[0] + this.moveX < this.alienRadius) {
       this.moveX = -this.moveX;
     }
     if(this.pos[1] + this.moveY > this.board.height-this.alienRadius ||
        this.pos[1] + this.moveY < this.alienRadius) {
         this.moveY = -this.moveY;
     }

    this.pos[0] += this.moveX;
    this.pos[1] += this.moveY;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Alien);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir(vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  // Find distance between two points.
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm(vec) {
    return Util.dist([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap(coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;


/***/ })
/******/ ]);