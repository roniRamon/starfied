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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__board__);



let game;
let grid;
document.addEventListener("DOMContentLoaded", function () {
   grid = document.getElementById("grid");
   game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](grid);
   let board = new __WEBPACK_IMPORTED_MODULE_1__board___default.a(30);
   console.log(board.render() );
});

function reloadPage(){
  window.location.href = '#close';
  grid = document.getElementById("grid");
  grid.innerHTML = '';
  let gridReload = document.getElementById("grid");
  game.startGame(grid);
}

let winOrLoseButton = document.getElementById('winOrLose-button');
document.addEventListener('click', () => reloadPage());


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alien__ = __webpack_require__(2);



class Game {
  constructor (grid){
    this.startGame(grid);
    this.playerMoves = [];
    this.player = document.querySelectorAll('[color="yellow"]')[0];
    this.points = 0;

    document.addEventListener('keydown', this.keyDown.bind(this), false);
    // this.alien = new Alien();

  }

  startGame(grid){
    document.getElementById("grid").innerHTML = '';
    this.createGrid(grid);
    this.playerMoves = [];
    this.player = document.querySelectorAll('[color="yellow"]')[0];
    let image = document.createElement('img');
    image.src = "assets/images/sprite/mothership_blue.png";
    this.player.appendChild(image);
    this.points = 0;
    this.alien = new __WEBPACK_IMPORTED_MODULE_0__alien__["a" /* default */]();
  }

  createGrid(grid) {
    let myBoard = document.createElement('div');
    myBoard.setAttribute('id', 'myBoard-div');

    for (let i = 0; i < 60; i++) {
      let ul = document.createElement('ul');
      ul.setAttribute('id', `row-${i}`);
      for (let j = 0; j < 100; j++) {
        let li = document.createElement('li');
        li.setAttribute('id', `row-${i}-col-${j}`);
        if (i === 0 || i === 59 ) {
          li.setAttribute('color', 'black');
          li.setAttribute('border', true);
        }
        else if (j === 0 || j === 99 )  {
          li.setAttribute('color', 'black');
          li.setAttribute('border', true);
        }
        else li.setAttribute('color', 'white');
        ul.appendChild(li);
      }
      myBoard.appendChild(ul);
    }

    grid.appendChild(myBoard);
    this.startPos();

  }

  startPos() {
    let startLi = document.getElementById('row-59-col-49');
    startLi.setAttribute('color', 'yellow');
    startLi.setAttribute('player', 'true');
  }

  keyDown(e){
    let player = document.querySelectorAll('[color="yellow"]')[0];
    let [row, col] = this.getColAndRowFromLi(player);

    let moveTo;
    switch (e.keyCode) {
      case 37:
        //left key
        //check if move valid
        moveTo = document.getElementById(`row-${row}-col-${col-1}`);
        //move valid - move and change Attribute player false plus remove class color yellow to black'
        if(moveTo !== null){
          this.validMove(moveTo, player);
         }
      break;
      case 38:
        //up key
        moveTo = document.getElementById(`row-${row-1}-col-${col}`);
        //move valid - move and change Attribute player false plus remove class color yellow to black'
        if(moveTo !== null){
          this.validMove(moveTo, player);
         }
      break;
      case 39:
        //right key
        moveTo = document.getElementById(`row-${row}-col-${col+1}`);
        //move valid - move and change Attribute player false plus remove class color yellow to black'
        if(moveTo !== null){
          this.validMove(moveTo, player);
         }
      break;
      case 40:
        //down key
        moveTo = document.getElementById(`row-${row+1}-col-${col}`);
        //move valid - move and change Attribute player false plus remove class color yellow to black'
        if(moveTo !== null){
            this.validMove(moveTo, player);
         }
      break;
    }

  }

  validMove(moveTo, player) {
    //move is on the grid
    this.playerMovedToWhiteArea(moveTo, player);
    moveTo.setAttribute('color', 'yellow');
    moveTo.appendChild(player.childNodes[0]);
    player.setAttribute('color', 'black');
    this.showPoints();
  }

  playerMovedToWhiteArea(moveTo, player){
    let [rowP, colP] = this.getColAndRowFromLi(player);
    let [rowM, colM] = this.getColAndRowFromLi(moveTo);

    if (this.alien.collision) return this.collisions();

    if (moveTo.getAttribute('color') === 'white' &&
        this.playerMoves.length === 0)
    {
      this.playerMoves.push([rowP, colP], [rowM, colM]);
    }
    else if (moveTo.getAttribute('color') !== 'black'
        && this.playerMoves.length === 0 ){
      console.log('color - black');
    }
    else if (moveTo.getAttribute('color') === 'white' &&
              this.playerMoves.length > 0){
      this.playerMoves.push([rowM, colM]);
    }
    else if (moveTo.getAttribute('color') === 'black' &&
            this.playerMoves.length > 0 ){

      this.getNeighbours(moveTo, this.floodFillArea);
      this.playerMoves = [];

      let removeTestAttr = document.querySelectorAll('[test="true"]');
      removeTestAttr.forEach( ele => ele.removeAttribute("test"));
    }
  }

  floodFillArea(node, targetColor, replacementColor) {
    if (targetColor === replacementColor) return;
    if (node.getAttribute('color') !== targetColor ) return;

    node.setAttribute('border', true);
    node.setAttribute('color', replacementColor);
    this.points += 1;

     let [row, col] = this.getColAndRowFromLi(node);
     let nodes = [];
     nodes.push(document.getElementById(`row-${row}-col-${col+1}`));
     nodes.push(document.getElementById(`row-${row}-col-${col-1}`));
     nodes.push(document.getElementById(`row-${row+1}-col-${col}`));
     nodes.push(document.getElementById(`row-${row-1}-col-${col}`));


     nodes.forEach( nodeEl => (
       this.floodFillArea(nodeEl, targetColor, replacementColor)
     ));
    return;
  }

  checkAlienPos(node, targetColor, attr) {
    //if black return
    if (node.getAttribute('color') !== 'red' &&
        node.getAttribute('color') !== 'white' ) return;
    //if has test Attribute return
    if (node.hasAttribute('test')) return;
    //if has Attribute alien return true
    if (node.getAttribute('color') === 'red') {
      return true;
    }


    node.setAttribute('test', true);

    let [row, col] = this.getColAndRowFromLi(node);
    // console.log(node.getAttribute('checked') !== null );

    let node1 = document.getElementById(`row-${row}-col-${col+1}`);
    let node2 = document.getElementById(`row-${row}-col-${col-1}`);
    let node3 = document.getElementById(`row-${row+1}-col-${col}`);
    let node4 = document.getElementById(`row-${row-1}-col-${col}`);

    if (this.checkAlienPos(node1, targetColor, attr) === true ) return true;
    if (this.checkAlienPos(node2, targetColor, attr) === true ) return true;
    if (this.checkAlienPos(node3, targetColor, attr) === true ) return true;
    if (this.checkAlienPos(node4, targetColor, attr) === true ) return true;

    return false;
  }

  getNeighbours(node, callback){
    let [row, col] = this.getColAndRowFromLi(node);
    //8 neighbours
    let neighbours = [];
    let nodeReturn;

    if(document.getElementById(`row-${row}-col-${col+1}`) &&
      (document.getElementById(`row-${row}-col-${col+1}`).getAttribute('color') !== 'black') &&
      (document.getElementById(`row-${row}-col-${col+1}`).getAttribute('color') !== 'yellow')) {
        nodeReturn = document.getElementById(`row-${row}-col-${col+1}`);
        neighbours.push(nodeReturn);
    }
    if(document.getElementById(`row-${row}-col-${col-1}`) &&
      (document.getElementById(`row-${row}-col-${col-1}`).getAttribute('color') !== 'black') &&
      (document.getElementById(`row-${row}-col-${col-1}`).getAttribute('color') !== 'yellow')) {
        nodeReturn = document.getElementById(`row-${row}-col-${col-1}`);
         neighbours.push(nodeReturn);
    }
    if(document.getElementById(`row-${row+1}-col-${col}`) &&
      (document.getElementById(`row-${row+1}-col-${col}`).getAttribute('color') !== 'black') &&
      (document.getElementById(`row-${row+1}-col-${col}`).getAttribute('color') !== 'yellow')){
        nodeReturn = document.getElementById(`row-${row+1}-col-${col}`);
        neighbours.push(nodeReturn);
    }
    if(document.getElementById(`row-${row-1}-col-${col}`) &&
      (document.getElementById(`row-${row-1}-col-${col}`).getAttribute('color') !== 'black') &&
      (document.getElementById(`row-${row-1}-col-${col}`).getAttribute('color') !== 'yellow')) {
        nodeReturn = document.getElementById(`row-${row-1}-col-${col}`);
        neighbours.push(nodeReturn);
    }

    if(document.getElementById(`row-${row-1}-col-${col-1}`)&&
      (document.getElementById(`row-${row-1}-col-${col-1}`).getAttribute('color') !== 'black') &&
      (document.getElementById(`row-${row-1}-col-${col-1}`).getAttribute('color') !== 'yellow')) {
        nodeReturn = document.getElementById(`row-${row-1}-col-${col-1}`);
        neighbours.push(nodeReturn);
    }
    if(document.getElementById(`row-${row-1}-col-${col+1}`)&&
      (document.getElementById(`row-${row-1}-col-${col+1}`).getAttribute('color') !== 'black') &&
      (document.getElementById(`row-${row-1}-col-${col+1}`).getAttribute('color') !== 'yellow')) {
        nodeReturn = document.getElementById(`row-${row-1}-col-${col+1}`);
        neighbours.push(nodeReturn);
    }
    if(document.getElementById(`row-${row+1}-col-${col-1}`)&&
      (document.getElementById(`row-${row+1}-col-${col-1}`).getAttribute('color') !== 'black') &&
      (document.getElementById(`row-${row+1}-col-${col-1}`).getAttribute('color') !== 'yellow')) {
        nodeReturn = document.getElementById(`row-${row+1}-col-${col-1}`);
        neighbours.push(nodeReturn);
    }
    if(document.getElementById(`row-${row+1}-col-${col+1}`)&&
      (document.getElementById(`row-${row+1}-col-${col+1}`).getAttribute('color') !== 'black') &&
      (document.getElementById(`row-${row+1}-col-${col+1}`).getAttribute('color') !== 'yellow')) {
        nodeReturn = document.getElementById(`row-${row+1}-col-${col+1}`);
        neighbours.push(nodeReturn);
    }

    let nodeTofill = neighbours.map( neighbour => {
      if (this.checkAlienPos(neighbour, 'white', 'alien') !== true) {
        this.playerMoves.forEach(
          move => {
            move = document.getElementById(`row-${move[0]}-col-${move[1]}`);
            move.setAttribute('border', true);
          });

        this.floodFillArea(neighbour, 'white', 'black');
      }
    });


  }

  getColAndRowFromLi(player) {
    let col = Number(player.id.match(/\d+/g)[1]);
    let row = Number(player.id.match(/\d+/g)[0]);
    return [row, col];
  }

  playerSetPos(pos){
    let startLi = document.getElementById(`row-${pos[0]}-col-${pos[1]}`);
    startLi.setAttribute('color', 'yellow');
    startLi.setAttribute('player', 'true');
  }

  removeAllPlayerMoves() {
    this.playerMoves = [];
    let player = document.querySelectorAll('[color="yellow"]');
    player.forEach( ele => {
      ele.setAttribute('color', 'white');
      ele.removeAttribute('player');
    });
  }

  collisions() {
    // let startPos = this.playerMoves[0];
    // this.playerMoves.forEach( (move, i) => {
    //   document.getElementById(`row-${move[0]}-col-${move[1]}`)
    //   .setAttribute('color', 'white');
    // });
    // this.removeAllPlayerMoves();
    // setTimeout(() => {this.playerSetPos(startPos);}, 2000);
    this.youLose();
  }

  youLose() {
    window.location.href = '#winOrLose';
    this.points = 0;
    this.alien.collision = false;
  }

  showPoints(){
    let pointP = document.getElementById('points-div');
    let prese =  ((this.points / 6000.0) * 100).toFixed(2);
    pointP.innerHTML = "Score: " + prese + "%";
    if (prese >= 80 ){
      window.location.href = '#win';
      this.points = 0;
    }
  }


}




/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Alien {
  constructor(){
    this.setAlien();
    this.collision = false;
    setInterval(() => this.alienMove(), 100);
  }

  setAlien(){
    let col = Math.floor(Math.random() * Math.floor(100));
    let row = Math.floor(Math.random() * Math.floor(60));

    let alien = document.getElementById(`row-${row}-col-${col}`);

    while (alien.getAttribute('class') !== null){
      col = Math.floor(Math.random() * Math.floor(100));
      row = Math.floor(Math.random() * Math.floor(60));
    }
    alien.setAttribute("alien", "alien");
    alien.setAttribute("color", "red");
    let image = document.createElement('img');
    image.src = "assets/images/alien/eyebot.png";
    alien.appendChild(image);

    return alien;
  }

  getColAndRowFromLi(player) {
    let col = Number(player[0].id.match(/\d+/g)[1]);
    let row = Number(player[0].id.match(/\d+/g)[0]);
    return [row, col];
  }

  moves(){
    let alien = document.querySelectorAll('[alien="alien"]');
    let [row, col] = this.getColAndRowFromLi(alien);
    //8 neighbours
    let neighbours = [];

    if(document.getElementById(`row-${row}-col-${col+1}`)) neighbours.push(document.getElementById(`row-${row}-col-${col+1}`));
    if(document.getElementById(`row-${row}-col-${col-1}`)) neighbours.push(document.getElementById(`row-${row}-col-${col-1}`));
    if(document.getElementById(`row-${row+1}-col-${col}`)) neighbours.push(document.getElementById(`row-${row+1}-col-${col}`));
    if(document.getElementById(`row-${row-1}-col-${col}`)) neighbours.push(document.getElementById(`row-${row-1}-col-${col}`));
    if(document.getElementById(`row-${row-1}-col-${col-1}`)) neighbours.push(document.getElementById(`row-${row-1}-col-${col-1}`));
    if(document.getElementById(`row-${row-1}-col-${col+1}`)) neighbours.push(document.getElementById(`row-${row-1}-col-${col+1}`));
    if(document.getElementById(`row-${row+1}-col-${col-1}`)) neighbours.push(document.getElementById(`row-${row+1}-col-${col-1}`));
    if(document.getElementById(`row-${row+1}-col-${col+1}`)) neighbours.push(document.getElementById(`row-${row+1}-col-${col+1}`));


    return neighbours;
  }


  alienMove() {
    let arrOfMoves = this.moves();
    let alien = document.querySelectorAll('[alien="alien"]')[0];
    let move = arrOfMoves[Math.floor(Math.random() * Math.floor(arrOfMoves.length))];

     while (move.hasAttribute('border') ){
       move = arrOfMoves[Math.floor(Math.random() * Math.floor(arrOfMoves.length))];
    }

    if (this.checkCollisions(move)){
       this.collision = true;
    } else {
      alien.removeAttribute('alien');
      alien.setAttribute("color", "white");
      move.setAttribute("alien", "alien");
      move.setAttribute("color", "red");
      move.appendChild(alien.childNodes[0]);

      this.alien = move;
      return this.alien;
    }
  }

  checkCollisions(move){
    if(move.getAttribute('color') === 'black' &&
      (!move.hasAttribute('border'))
    ){
      return true;
    }
    if(move.getAttribute('color') === 'yellow'){
      return true;
    }
    return false;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Alien);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Board {
  constructor (rowCol){
    this.rowCol = rowCol;
  }

  static blankGrid (rowCol){
    const grid = [];
    for (let i = 0; i <rowCol; i++) {
      const row = [];
      for (let j = 0; j < rowCol; j++) {
        if(i === 0) row.push(Board.SAFE_SYMBOL);
        else if(j === 0) row.push(Board.SAFE_SYMBOL);
        else if(j === rowCol - 1) row.push(Board.SAFE_SYMBOL);
        else if(i === rowCol - 1) row.push(Board.SAFE_SYMBOL);
        else row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }
    return grid;
  }

  render (){
    const grid = Board.blankGrid(this.rowCol);
    console.log(grid);
  }

  validMove (coord){
    return (coord[0] >= 0) && (coord[0] < this.rowCol) &&
     (coord[1] >= 0) && (coord[1] < this.rowCol);
  }

}

Board.BLANK_SYMBOL = ".";
Board.SAFE_SYMBOL = "X";

Board.PLAYER_SYMBOL = "P";
Board.ENAMY_SYMBOL = "E";
Board.MOVE_SYMBOL = "-";

module.exports = Board;


/***/ })
/******/ ]);