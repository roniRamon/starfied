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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(6);
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
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Alien);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
  constructor(options){
    this.canvas = options.canvas;

  }

draw(ctx) {
  ctx.rect(15, 15, this.canvas.width-30, this.canvas.height-30);
  ctx.stroke();
}



}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alien__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__board__ = __webpack_require__(5);




class Game {
  constructor (canvas, ctx){
      this.player = [];
      this.alien = [];
      this.board = [];

      this.ctx = ctx;
      this.canvas = canvas;
      this.addPlayer(canvas);
      this.addAlien(canvas);
      this.addBoard(canvas);
  }


  addPlayer(canvas) {
    let ship = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */](canvas);
    this.player.push(ship);
  }

  addAlien(canvas) {
    let alien = new __WEBPACK_IMPORTED_MODULE_1__alien__["a" /* default */]({
      canvas: canvas,
      src: 'assets/images/alien/eyebot.png',
      size: [40, 40],
    });

    this.alien.push(alien);
  }

  addBoard(canvas) {
    let board = new __WEBPACK_IMPORTED_MODULE_2__board__["a" /* default */]({canvas: canvas});
    console.log(board.width);
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
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ })
/******/ ]);