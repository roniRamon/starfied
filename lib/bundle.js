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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(1);
const Enemy = __webpack_require__(2);
const EnemySmall = __webpack_require__(3);

class Board {
  constructor (rowCol){
    this.rowCol = rowCol;
    this.grid = Board.blankGrid(this.rowCol);
    this.collisions = false;
    this.points = 0;
  }

  static blankGrid (rowCol){
    //create blank grid
    const grid = [];
    for (let i = 0; i <rowCol/2; i++) {
      const row = [];
      for (let j = 0; j < rowCol; j++) {
        if(i === 0) row.push(Board.SAFE_SYMBOL);
        else if(j === 0) row.push(Board.SAFE_SYMBOL);
        else if(j === rowCol - 1) row.push(Board.SAFE_SYMBOL);
        else if(i === rowCol/2 - 1) row.push(Board.SAFE_SYMBOL);
        else row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }
    return grid;
  }

  createTiles(data) {

    let tilesArray = [];

    for (let row of data) {
      for (let col of row) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        if (col === Board.SAFE_SYMBOL) {
          tile.setAttribute('color', 'black');
          tile.setAttribute('border', true);
          tile.classList.add('border');
        }
        else if (col === Board.BLANK_SYMBOL) {
          tile.setAttribute('color', 'white');
          tile.classList.add('empty');

        }
        else if (col === Board.PLAYER_SYMBOL || col === "P") {
          tile.setAttribute('color', 'yellow');
          tile.setAttribute('player', 'true');
          tile.classList.add('player');
        }
        else if (col === Board.SENAMY_SYMBOL || col === "D") {
          tile.setAttribute('color', 'red');
          tile.setAttribute('small-enemy', 'true');
          tile.classList.add('smalenemy');
        }
        else if (col === Board.ENAMY_SYMBOL || col === "E") {
          tile.setAttribute('color', 'red');
          tile.setAttribute('enemy', 'true');
          tile.classList.add('enemy');
        }
        else if (col === "S") {
          tile.classList.add('safe');
        }
        else if (col === "-") {
          tile.classList.add('trail');
        }
        tilesArray.push(tile);
      }
      let brTile = document.createElement('br');
      tilesArray.push(brTile);
    }
    return tilesArray;
  }

  drawMap() {
    //render board
    let myBoard = document.createElement('div');
    myBoard.setAttribute('id', 'myBoard-div');

    let tiles = this.createTiles(this.grid);
    for (let tile of tiles) {
      myBoard.appendChild(tile);
    }

    document.body.appendChild(myBoard);
  }

  eraseMap() {
    //delete board
    let board = document.querySelectorAll("#myBoard-div");
    board.forEach( el => el.remove());
  }


  validMove (coord){
    return ((coord[0] >= 0) && (coord[0] < (this.rowCol / 2)) &&
     (coord[1] >= 0) && (coord[1] < this.rowCol));
  }

  getCellAt (coord){
    if(!this.validMove(coord)) return null;
    return this.grid[coord[0]][coord[1]];
  }

  setCellAt (coord, val){
    // console.log(coord, val);
    if(!this.validMove(coord)) return null;
    this.grid[coord[0]][coord[1]] = val;
  }

  collision (){
    this.collisions = true;
  }

  floodFillArea (coords) {
    let neighbour = this.getNeighbours(coords);
    let res = this.checkAlienPos(neighbour[0]);
    if (neighbour.length === 4) {
      if(res === false){
        this.flood(neighbour[0]);
      }
      else if (this.checkAlienPos(neighbour[1]) === false) {
        this.flood(neighbour[1]);
      }
      else if (this.checkAlienPos(neighbour[2]) === false) {
        this.flood(neighbour[2]);
      }
      else if (this.checkAlienPos(neighbour[3]) === false) {
        this.flood(neighbour[3]);
      }
      this.reverseS(neighbour[1]);
      this.reverseS(neighbour[2]);
      this.reverseS(neighbour[3]);
    }
    else if (neighbour.length === 3) {
      if(res === false){
        this.flood(neighbour[0]);
      }
      else if (this.checkAlienPos(neighbour[1]) === false) {
        this.flood(neighbour[1]);
      }
      else if (this.checkAlienPos(neighbour[2]) === false) {
        this.flood(neighbour[2]);
      }
      this.reverseS(neighbour[1]);
      this.reverseS(neighbour[2]);
    }
    else if (neighbour.length === 2) {
      // console.log("test");
      if(res === false){
        this.flood(neighbour[0]);
      }
      else {
        this.flood(neighbour[1]);
      }
      this.reverseS(neighbour[1]);
    }
    else if (neighbour.length === 1) {
      if(res === false){
        this.flood(neighbour[0]);
      }
    }
    this.reverseS(neighbour[0]);
    return;
  }

  flood (coords){
    // console.log("flood");
    let coordsVal = this.getCellAt(coords);
    if (coordsVal === "1") return;
    if (coordsVal === "D") {
        clearInterval(coordsVal.timer);
    }
    this.setCellAt(coords, "1");
    this.points += 1;

    let diff = [[0,1], [0,-1], [-1,0], [1,0]];
    diff.forEach( options => {
      let newCoords = [coords[0] + options[0], coords[1] + options[1]];
      this.flood(newCoords);
    });
    return;
  }

  checkAlienPos(coords) {

    if (this.getCellAt(coords) === "E") return true;
    else if (this.getCellAt(coords) === "1") return;
    else if (this.getCellAt(coords) === "S") return;
    else if (this.getCellAt(coords) === "D") return;
    else {
      this.setCellAt(coords, "S");
    }

    if (this.validMove([coords[0], coords[1] + 1])){
      if (this.checkAlienPos([coords[0], coords[1] + 1]) === true ) return true;
    }
    if (this.validMove([coords[0], coords[1] - 1])){
      if (this.checkAlienPos([coords[0], coords[1] - 1]) === true ) return true;
    }
    if (this.validMove([coords[0] + 1, coords[1]])){
      if (this.checkAlienPos([coords[0] + 1, coords[1]]) === true ) return true;
    }
    if (this.validMove([coords[0] - 1, coords[1]])){
      if (this.checkAlienPos([coords[0] - 1, coords[1]]) === true ) return true;
    }
    // if (this.checkAlienPos([coords[0] + 1, coords[1]]) === true ) return true;
    // if (this.checkAlienPos([coords[0] - 1, coords[1]]) === true ) return true;

    return false;
  }

  reverseS(coords) {
    if (this.getCellAt(coords) === "S" ) {
      this.setCellAt(coords, "0");
    }
    else {
      return;
    }

    let diff = [ [0, 1], [0, -1], [1, 0], [-1, 0] ];
    diff.forEach( options => {
      let newCoords = [coords[0] + options[0], coords[1] + options[1]];
      return this.reverseS(newCoords);
    });

    return;
  }

  getNeighbours(coords){
    let neighbours = [];
    let diff = [[ 1, 1], [1, -1], [-1, 1], [-1, -1] ];
    diff.forEach( options => {
      let newCoords = [coords[0] + options[0], coords[1] + options[1]];
      let newCoordVal = this.getCellAt(newCoords);
      if(newCoordVal === "0" || newCoordVal === "E" || newCoordVal === "D"){
        neighbours.push(newCoords);
      }
    });
    return neighbours;
  }

}

Board.BLANK_SYMBOL = "0";
Board.SAFE_SYMBOL = "1";

Board.PLAYER_SYMBOL = "P";
Board.ENAMY_SYMBOL = "E";
Board.SENAMY_SYMBOL = "D";
Board.MOVE_SYMBOL = "-";

module.exports = Board;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);

class Player {
  constructor (board){
    // this.size = [2,2];
    this.board = board;
    this.position = this.startPos();
    this.playerMoves = [];

  }

  startPos (){
    let row = 0;
    let col = (this.board.rowCol / 2) - 1;
    this.board.setCellAt([row, col], "P");
    return [row, col];
  }


  moves (e){
    switch (e.keyCode) {
      case 37:
        this.updatePos(Player.MOVES[3]);
      break;
      case 38:
        this.updatePos(Player.MOVES[1]);
      break;
      case 39:
        this.updatePos(Player.MOVES[2]);
      break;
      case 40:
        this.updatePos(Player.MOVES[0]);
      break;
    }
    return this.position;
  }

  validMove (pos){
    return this.board.validMove(pos);
  }

  collision (){
    this.board.collision();
  }

  pos (){
    return this.position;
  }

  updatePos (diff){
    let move =  [this.position[0] + diff[0], this.position[1] + diff[1]];
    let moveVal = this.board.getCellAt(move);

    if(this.validMove(move)){
      if( moveVal === "1" && this.playerMoves.length === 0) {
        //1. move on boarder with empty arr - nothing
        this.board.setCellAt(this.position, "1");
        this.board.setCellAt(move, "P");
      }
      else if (moveVal === "1" && !(this.playerMoves.length === 0)) {
        //2. move on boarder with NOT empty array - flood fill, make arr el safe zone, empty arr
        this.playerMoves.forEach( coord => this.board.setCellAt(coord, "1"));
        this.board.floodFillArea(move);
        this.board.points += this.playerMoves.length;
        this.playerMoves = [];
        this.board.setCellAt(move, "P");
      }
      else if (moveVal === "0" && this.playerMoves.length === 0 ) {
        //3. move on empty space + empty arr = push pos to arr until reach
        // safe zone, current pos make safe zone back
        this.playerMoves.push(move);
        this.board.setCellAt(this.position, "1");
        this.board.setCellAt(move, "P");
      }
      else if (moveVal === "0") {
        //4. move on empty space = push pos to arr
        this.playerMoves.push(move);
        this.board.setCellAt(this.position, "-");
        this.board.setCellAt(move, "P");
      }
      else {
        //collision with "-" or "E" or "D"
        this.collision();
      }
      this.position = move;
    }
    return this.position;
  }

  cleareArrayOfMoves (){
    if(this.playerMoves.length > 0) {
      this.playerMoves.forEach( move => {
        this.board.setCellAt(move, "0");
      });
      this.playerMoves = [];
    }
    this.board.setCellAt(this.position, "0");
  }

}

Player.MOVES = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1]
];

module.exports = Player;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);

class Enemy {
  constructor (board, opt){
    this.board = board;
    this.classE = opt;
    this.position = this.startPos();
    setInterval(() => this.moves(this.random_move()), 200);
  }

  startPos (){
    let col = Math.floor(Math.random() * Math.floor(this.board.rowCol-2)) + 1;
    let row = Math.floor(Math.random() * Math.floor((this.board.rowCol / 2)-2)) +1;
    this.board.setCellAt([row, col], this.classE);
    return [row, col];
  }

  random_move (){
    return Enemy.MOVES[Math.floor(Math.random() * 4) +1];
  }

  moves (randomDiff){
    let diff;
    let moveTo;
    try {
      moveTo = [this.position[0] + randomDiff[0], this.position[1] + randomDiff[1]];
    }
    catch(err) {
      moveTo = this.position;
    }

    let moveVal = this.board.getCellAt(moveTo);
    while(moveVal === "1" || !this.board.validMove(moveTo)) {
      try {
        diff = this.random_move();
        moveTo = [this.position[0] + diff[0], this.position[1] + diff[1]];
      }
      catch(err) {
        moveTo = this.position;
      }
      moveVal = this.board.getCellAt(moveTo);
    }

    if(moveVal === "P"){
      this.collisions();
      return this.position;
    }
    else if (moveVal === "-") {
      this.collisions();
      return this.position;
    }
    else if (moveVal === "0") {
      this.board.setCellAt(this.position, "0");
      this.position = moveTo;
      this.board.setCellAt(moveTo, this.classE);
    }
    else {
      return this.position;
    }
    return this.position;
  }

  collisions (){
    this.board.collision();
  }

}

Enemy.MOVES = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1]
];

module.exports = Enemy;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);

class EnemySmall {
  constructor (board){
    this.board = board;
    this.classE = "D";
    this.position = this.startPos();
  }

  changePos(){
    this.moves(this.random_move());
  }

  startPos (){
    let col = Math.floor(Math.random() * Math.floor(this.board.rowCol-2)) + 1;
    let row = Math.floor(Math.random() * Math.floor((this.board.rowCol / 2)-2)) +1;
    this.board.setCellAt([row, col], this.classE);
    return [row, col];
  }

  random_move (){
    return EnemySmall.MOVES[Math.floor(Math.random() * 4) +1];
  }

  moves (randomDiff){
    let diff;
    let moveTo;
    try {
      moveTo = [this.position[0] + randomDiff[0], this.position[1] + randomDiff[1]];
    }
    catch(err) {
      moveTo = this.position;
    }

    let moveVal = this.board.getCellAt(moveTo);
    while(moveVal === "1" || !this.board.validMove(moveTo)) {
      try {
        diff = this.random_move();
        moveTo = [this.position[0] + diff[0], this.position[1] + diff[1]];
      }
      catch(err) {
        moveTo = this.position;
      }
      moveVal = this.board.getCellAt(moveTo);
    }

    if(moveVal === "P"){
      this.collisions();
      return this.position;
    }
    else if (moveVal === "-") {
      this.collisions();
      return this.position;
    }
    else if (moveVal === "0") {
      this.board.setCellAt(this.position, "0");
      this.position = moveTo;
      this.board.setCellAt(moveTo, this.classE);
    }
    return this.position;
  }

  collisions (){
    this.board.collision();
  }

}

EnemySmall.MOVES = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1]
];

module.exports = EnemySmall;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", function () {
  window.location.href = '#rules';

  let elem = document.getElementById('over');
  let elem2 = document.getElementById('over2');
  let elem3 = document.getElementById('start1');

  let scrrenSize = window.innerWidth;
  let options;

  if (scrrenSize > 1504) options = 50;
  else if (scrrenSize > 1202) options = 40;
  else if (scrrenSize > 900) options = 30;
  else if (scrrenSize < 900 ) options = 20;

  let game = new Game(options);

  elem.onclick = modalClick;
  elem2.onclick = modalClick;
  elem3.onclick = modalClick;

  function modalClick(){
    scrrenSize = window.innerWidth;
    if (scrrenSize > 1504) options = 50;
    else if (scrrenSize > 1202) options = 40;
    else if (scrrenSize > 900) options = 30;
    else if (scrrenSize < 900 ) options = 20;
    //restart game
    game.restart(options);
    window.location.href = '#close';
  }

});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);
const Player = __webpack_require__(1);
const Enemy = __webpack_require__(2);
const EnemySmall = __webpack_require__(3);


class Game {
  constructor (){
    this.board;
    this.score = 0;
    this.life = 0;
    this.player;
    this.ememy;
    this.e1;
  }

  win (){
    window.location.href = '#win';
  }

  gameOver (){
    window.location.href = '#winOrLose';
  }

  restart (option = 50){
    this.board = new Board(option);
    this.board.drawMap();
    this.score = 0;
    this.life = 3;

    this.player = new Player(this.board);
    this.enemy = new Enemy(this.board, "E");

    this.e1 = new EnemySmall(this.board, "D");


    document.addEventListener('keydown', (e) => {
      this.player.moves(e);
    });
    this.gameLoop();
  }

  calcScore (){
    return this.board.points / (((this.board.rowCol / 2.0) - 2.0) * (this.board.rowCol - 2.0)) * 100;
  }

  gameLoop (){
    let gameLoopTimer = setInterval(() => {
      this.showPoints();
      this.board.eraseMap();
      this.board.drawMap();
      if(this.board.collisions){
        this.board.collisions = false;
        this.life -= 1;
        this.score = this.calcScore();
        this.player.cleareArrayOfMoves();
        this.board.setCellAt(this.player.position, "0");
        this.player.position = this.player.startPos();
      }
      if (this.life === 0 ) {
        this.showPoints();
        clearInterval(gameLoopTimer);
        this.gameOver();
      }
      this.score = this.calcScore().toFixed(2);
      if (this.score >= 80 ) {
        this.showPoints();
        clearInterval(gameLoopTimer);
        this.win();
      }
    }, 100);
  }

  showPoints (){
    let pointP = document.getElementById('points-div');
    let prese = this.calcScore().toFixed(2);
    pointP.innerHTML = "Score: " + prese + "% <br> Life: ";
    for (var i = 0; i < this.life; i++) {
      let tile = document.createElement('div');
      tile.classList.add('tile');
      tile.classList.add('player');
      pointP.appendChild(tile);
    }
  }

}

module.exports = Game;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map