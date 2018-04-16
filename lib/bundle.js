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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(5);
// import Player from './player';
// import Alien from './alien';



document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("game-canvas");



  // let ship = new Player(canvas);
  // let alien = new Alien({
  //   canvas: canvas,
  //   src: 'assets/images/alien/eyebot.png',
  //   size: [40, 40],
  // });

  let board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */]({
    canvas
  });

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
    this.ctx = canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.character = new Image();
    this.character.src = "assets/images/sprite/mothership_blue.png";

    document.addEventListener('keydown', this.keyDown.bind(this), false);

    this.ship_x = (this.width / 2) - 25;
    this.ship_y = this.height - 50;
    this.ship_w = 50, this.ship_h = 40;
    // this.srcX = 10, this.srcY = 0;

    //protected
    this.protected = true;

    // setInterval(this.draw.bind(this), 10);
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
        if ((this.ship_x - 10 ) < 0 ) this.ship_x;
        else this.ship_x -= 10;
      break;
      case 38:
        //up key
        if ((this.ship_y - 10 ) < 0 ) this.ship_y;
        else this.ship_y -= 10;
      break;
      case 39:
        //right key
        if ((this.ship_x + 10 ) > (this.width-50)) this.ship_x;
        else this.ship_x += 10;
      break;
      case 40:
        //down key
        if ((this.ship_y + 10 ) > (this.height-40) ) this.ship_y;
        else this.ship_y += 10;
      break;
      case 32:
        //space
        console.log("SPACE");
      break;
    }
  }


  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawPlayer();
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
    this.ctx = options.canvas.getContext('2d');

    this.character = new Image();
    this.character.src = options.src;

    this.pos = [];
    this.pos.push(Math.floor(Math.random() * Math.floor(this.canvas.width)));
    this.pos.push(Math.floor(Math.random() * Math.floor(this.canvas.height)));
    this.size = options.size;

    this.alienRadius = 40;
    this.moveX = 2;
    this.moveY = -2;

    // setInterval(this.draw.bind(this), 10);
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

  drawAlien() {
    // this.moveRandom();
    this.ctx.drawImage(
      this.character,
      this.pos[0], this.pos[1],
      this.size[0], this.size[1]
    );
  }

  draw() {
    // this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawAlien();

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alien__ = __webpack_require__(4);



class Board {
  constructor(options){
    this.canvas = options.canvas;
    this.ctx = options.canvas.getContext('2d');

    this.ship = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */](this.canvas);
    this.alien = new __WEBPACK_IMPORTED_MODULE_1__alien__["a" /* default */]({
      canvas: this.canvas,
      src: 'assets/images/alien/eyebot.png',
      size: [40, 40],
    });

    setInterval(this.draw.bind(this), 10);
  }

drawBorad() {
  this.ctx.rect(15, 15, this.canvas.width-30, this.canvas.height-30);
  this.ctx.fillStyle = "white";
  this.ctx.fill();
  this.ctx.stroke();
}

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBorad();
    // this.ship.draw();
    // this.alien.draw();
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ })
/******/ ]);