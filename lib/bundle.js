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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(3);
const Enemy = __webpack_require__(4);

class Board {
  constructor (rowCol){
    this.rowCol = rowCol;
    this.grid = Board.blankGrid(this.rowCol);
    this.player = new Player(this);
    this.enemy = new Enemy(this);
  }

  static blankGrid (rowCol){
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
        else if (col === Board.ENAMY_SYMBOL || col === "E") {
          tile.setAttribute('color', 'red');
          tile.setAttribute('enemy', 'true');
          tile.classList.add('enemy');
        }
        tilesArray.push(tile);
      }
      let brTile = document.createElement('br');
      tilesArray.push(brTile);
    }
    return tilesArray;
  }

  drawMap() {
    let myBoard = document.createElement('div');
    myBoard.setAttribute('id', 'myBoard-div');

    let tiles = this.createTiles(this.grid);
    for (let tile of tiles) {
      myBoard.appendChild(tile);
    }

    document.body.appendChild(myBoard);
  }

  eraseMap() {
    let board = document.getElementById("myBoard-div");
    document.body.removeChild(board);
  }


  render (){
    this.grid = Board.blankGrid(this.rowCol);
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
    if(!this.validMove(coord)) return null;
    this.grid[coord[0]][coord[1]] = val;
  }

}

Board.BLANK_SYMBOL = "0";
Board.SAFE_SYMBOL = "1";

Board.PLAYER_SYMBOL = "P";
Board.ENAMY_SYMBOL = "E";
Board.MOVE_SYMBOL = "-";

module.exports = Board;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);

let game;
let grid;
document.addEventListener("DOMContentLoaded", function () {
   // grid = document.getElementById("grid");
   // game = new Game(grid);

  game = new Game;

});

// function reloadPage(){
//   window.location.href = '#close';
//   grid = document.getElementById("grid");
//   grid.innerHTML = '';
//   let gridReload = document.getElementById("grid");
//   game.startGame(grid);
// }

// let winOrLoseButton = document.getElementById('winOrLose-button');
// document.addEventListener('click', () => reloadPage());


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// import Alien from './alien';
const Board = __webpack_require__(0);


class Game {
  constructor (){
    // this.startGame(grid);
    // this.playerMoves = [];
    // this.player = document.querySelectorAll('[color="yellow"]')[0];
    // this.alien = new Alien();
    this.board = new Board(50);
    this.board.drawMap();
    this.points = 0;
    this.score = 0;
    this.life = 3;

    document.addEventListener('keydown', (e) => this.board.player.moves(e));
  }

  win (){
    return this.score >= 80;
  }

  lose (){
    return this.life <= 0;
  }

  calcScore (){
    this.score = this.points / (((this.board.rowCol / 2.0) - 2.0) * (this.board.rowCol - 2.0)) * 100;
  }

  start (){

  }

  gameLoop (){

  }

  collision (){

  }

  floodFillArea (){

  }

  // startGame(grid){
  //   document.getElementById("grid").innerHTML = '';
  //   this.createGrid(grid);
  //   this.playerMoves = [];
  //   this.player = document.querySelectorAll('[color="yellow"]')[0];
  //   let image = document.createElement('img');
  //   image.src = "assets/images/sprite/mothership_blue.png";
  //   this.player.appendChild(image);
  //   this.points = 0;
  //   this.alien = new Alien();
  // }

  // createGrid(grid) {
  //   let myBoard = document.createElement('div');
  //   myBoard.setAttribute('id', 'myBoard-div');
  //
  //   for (let i = 0; i < 60; i++) {
  //     let ul = document.createElement('ul');
  //     ul.setAttribute('id', `row-${i}`);
  //     for (let j = 0; j < 100; j++) {
  //       let li = document.createElement('li');
  //       li.setAttribute('id', `row-${i}-col-${j}`);
  //       if (i === 0 || i === 59 ) {
  //         li.setAttribute('color', 'black');
  //         li.setAttribute('border', true);
  //       }
  //       else if (j === 0 || j === 99 )  {
  //         li.setAttribute('color', 'black');
  //         li.setAttribute('border', true);
  //       }
  //       else li.setAttribute('color', 'white');
  //       ul.appendChild(li);
  //     }
  //     myBoard.appendChild(ul);
  //   }
  //
  //   grid.appendChild(myBoard);
  //   this.startPos();
  //
  // }

  // startPos() {
  //   let startLi = document.getElementById('row-59-col-49');
  //   startLi.setAttribute('color', 'yellow');
  //   startLi.setAttribute('player', 'true');
  // }

  // keyDown(e){
  //   let player = document.querySelectorAll('[color="yellow"]')[0];
  //   let [row, col] = this.getColAndRowFromLi(player);
  //
  //   let moveTo;
  //   switch (e.keyCode) {
  //     case 37:
  //       //left key
  //       //check if move valid
  //       moveTo = document.getElementById(`row-${row}-col-${col-1}`);
  //       //move valid - move and change Attribute player false plus remove class color yellow to black'
  //       if(moveTo !== null){
  //         this.validMove(moveTo, player);
  //        }
  //     break;
  //     case 38:
  //       //up key
  //       moveTo = document.getElementById(`row-${row-1}-col-${col}`);
  //       //move valid - move and change Attribute player false plus remove class color yellow to black'
  //       if(moveTo !== null){
  //         this.validMove(moveTo, player);
  //        }
  //     break;
  //     case 39:
  //       //right key
  //       moveTo = document.getElementById(`row-${row}-col-${col+1}`);
  //       //move valid - move and change Attribute player false plus remove class color yellow to black'
  //       if(moveTo !== null){
  //         this.validMove(moveTo, player);
  //        }
  //     break;
  //     case 40:
  //       //down key
  //       moveTo = document.getElementById(`row-${row+1}-col-${col}`);
  //       //move valid - move and change Attribute player false plus remove class color yellow to black'
  //       if(moveTo !== null){
  //           this.validMove(moveTo, player);
  //        }
  //     break;
  //   }
  //
  // }
  //
  // validMove(moveTo, player) {
  //   //move is on the grid
  //   this.playerMovedToWhiteArea(moveTo, player);
  //   moveTo.setAttribute('color', 'yellow');
  //   moveTo.appendChild(player.childNodes[0]);
  //   player.setAttribute('color', 'black');
  //   this.showPoints();
  // }
  //
  // playerMovedToWhiteArea(moveTo, player){
  //   let [rowP, colP] = this.getColAndRowFromLi(player);
  //   let [rowM, colM] = this.getColAndRowFromLi(moveTo);
  //
  //   if (this.alien.collision) return this.collisions();
  //
  //   if (moveTo.getAttribute('color') === 'white' &&
  //       this.playerMoves.length === 0)
  //   {
  //     this.playerMoves.push([rowP, colP], [rowM, colM]);
  //   }
  //   else if (moveTo.getAttribute('color') !== 'black'
  //       && this.playerMoves.length === 0 ){
  //     console.log('color - black');
  //   }
  //   else if (moveTo.getAttribute('color') === 'white' &&
  //             this.playerMoves.length > 0){
  //     this.playerMoves.push([rowM, colM]);
  //   }
  //   else if (moveTo.getAttribute('color') === 'black' &&
  //           this.playerMoves.length > 0 ){
  //
  //     this.getNeighbours(moveTo, this.floodFillArea);
  //     this.playerMoves = [];
  //
  //     let removeTestAttr = document.querySelectorAll('[test="true"]');
  //     removeTestAttr.forEach( ele => ele.removeAttribute("test"));
  //   }
  // }
  //
  // floodFillArea(node, targetColor, replacementColor) {
  //   if (targetColor === replacementColor) return;
  //   if (node.getAttribute('color') !== targetColor ) return;
  //
  //   node.setAttribute('border', true);
  //   node.setAttribute('color', replacementColor);
  //   this.points += 1;
  //
  //    let [row, col] = this.getColAndRowFromLi(node);
  //    let nodes = [];
  //    nodes.push(document.getElementById(`row-${row}-col-${col+1}`));
  //    nodes.push(document.getElementById(`row-${row}-col-${col-1}`));
  //    nodes.push(document.getElementById(`row-${row+1}-col-${col}`));
  //    nodes.push(document.getElementById(`row-${row-1}-col-${col}`));
  //
  //
  //    nodes.forEach( nodeEl => (
  //      this.floodFillArea(nodeEl, targetColor, replacementColor)
  //    ));
  //   return;
  // }
  //
  // checkAlienPos(node, targetColor, attr) {
  //   //if black return
  //   if (node.getAttribute('color') !== 'red' &&
  //       node.getAttribute('color') !== 'white' ) return;
  //   //if has test Attribute return
  //   if (node.hasAttribute('test')) return;
  //   //if has Attribute alien return true
  //   if (node.getAttribute('color') === 'red') {
  //     return true;
  //   }
  //
  //
  //   node.setAttribute('test', true);
  //
  //   let [row, col] = this.getColAndRowFromLi(node);
  //   // console.log(node.getAttribute('checked') !== null );
  //
  //   let node1 = document.getElementById(`row-${row}-col-${col+1}`);
  //   let node2 = document.getElementById(`row-${row}-col-${col-1}`);
  //   let node3 = document.getElementById(`row-${row+1}-col-${col}`);
  //   let node4 = document.getElementById(`row-${row-1}-col-${col}`);
  //
  //   if (this.checkAlienPos(node1, targetColor, attr) === true ) return true;
  //   if (this.checkAlienPos(node2, targetColor, attr) === true ) return true;
  //   if (this.checkAlienPos(node3, targetColor, attr) === true ) return true;
  //   if (this.checkAlienPos(node4, targetColor, attr) === true ) return true;
  //
  //   return false;
  // }
  //
  // getNeighbours(node, callback){
  //   let [row, col] = this.getColAndRowFromLi(node);
  //   //8 neighbours
  //   let neighbours = [];
  //   let nodeReturn;
  //
  //   if(document.getElementById(`row-${row}-col-${col+1}`) &&
  //     (document.getElementById(`row-${row}-col-${col+1}`).getAttribute('color') !== 'black') &&
  //     (document.getElementById(`row-${row}-col-${col+1}`).getAttribute('color') !== 'yellow')) {
  //       nodeReturn = document.getElementById(`row-${row}-col-${col+1}`);
  //       neighbours.push(nodeReturn);
  //   }
  //   if(document.getElementById(`row-${row}-col-${col-1}`) &&
  //     (document.getElementById(`row-${row}-col-${col-1}`).getAttribute('color') !== 'black') &&
  //     (document.getElementById(`row-${row}-col-${col-1}`).getAttribute('color') !== 'yellow')) {
  //       nodeReturn = document.getElementById(`row-${row}-col-${col-1}`);
  //        neighbours.push(nodeReturn);
  //   }
  //   if(document.getElementById(`row-${row+1}-col-${col}`) &&
  //     (document.getElementById(`row-${row+1}-col-${col}`).getAttribute('color') !== 'black') &&
  //     (document.getElementById(`row-${row+1}-col-${col}`).getAttribute('color') !== 'yellow')){
  //       nodeReturn = document.getElementById(`row-${row+1}-col-${col}`);
  //       neighbours.push(nodeReturn);
  //   }
  //   if(document.getElementById(`row-${row-1}-col-${col}`) &&
  //     (document.getElementById(`row-${row-1}-col-${col}`).getAttribute('color') !== 'black') &&
  //     (document.getElementById(`row-${row-1}-col-${col}`).getAttribute('color') !== 'yellow')) {
  //       nodeReturn = document.getElementById(`row-${row-1}-col-${col}`);
  //       neighbours.push(nodeReturn);
  //   }
  //
  //   if(document.getElementById(`row-${row-1}-col-${col-1}`)&&
  //     (document.getElementById(`row-${row-1}-col-${col-1}`).getAttribute('color') !== 'black') &&
  //     (document.getElementById(`row-${row-1}-col-${col-1}`).getAttribute('color') !== 'yellow')) {
  //       nodeReturn = document.getElementById(`row-${row-1}-col-${col-1}`);
  //       neighbours.push(nodeReturn);
  //   }
  //   if(document.getElementById(`row-${row-1}-col-${col+1}`)&&
  //     (document.getElementById(`row-${row-1}-col-${col+1}`).getAttribute('color') !== 'black') &&
  //     (document.getElementById(`row-${row-1}-col-${col+1}`).getAttribute('color') !== 'yellow')) {
  //       nodeReturn = document.getElementById(`row-${row-1}-col-${col+1}`);
  //       neighbours.push(nodeReturn);
  //   }
  //   if(document.getElementById(`row-${row+1}-col-${col-1}`)&&
  //     (document.getElementById(`row-${row+1}-col-${col-1}`).getAttribute('color') !== 'black') &&
  //     (document.getElementById(`row-${row+1}-col-${col-1}`).getAttribute('color') !== 'yellow')) {
  //       nodeReturn = document.getElementById(`row-${row+1}-col-${col-1}`);
  //       neighbours.push(nodeReturn);
  //   }
  //   if(document.getElementById(`row-${row+1}-col-${col+1}`)&&
  //     (document.getElementById(`row-${row+1}-col-${col+1}`).getAttribute('color') !== 'black') &&
  //     (document.getElementById(`row-${row+1}-col-${col+1}`).getAttribute('color') !== 'yellow')) {
  //       nodeReturn = document.getElementById(`row-${row+1}-col-${col+1}`);
  //       neighbours.push(nodeReturn);
  //   }
  //
  //   let nodeTofill = neighbours.map( neighbour => {
  //     if (this.checkAlienPos(neighbour, 'white', 'alien') !== true) {
  //       this.playerMoves.forEach(
  //         move => {
  //           move = document.getElementById(`row-${move[0]}-col-${move[1]}`);
  //           move.setAttribute('border', true);
  //         });
  //
  //       this.floodFillArea(neighbour, 'white', 'black');
  //     }
  //   });
  //
  //
  // }
  //
  // getColAndRowFromLi(player) {
  //   let col = Number(player.id.match(/\d+/g)[1]);
  //   let row = Number(player.id.match(/\d+/g)[0]);
  //   return [row, col];
  // }
  //
  // playerSetPos(pos){
  //   let startLi = document.getElementById(`row-${pos[0]}-col-${pos[1]}`);
  //   startLi.setAttribute('color', 'yellow');
  //   startLi.setAttribute('player', 'true');
  // }
  //
  // removeAllPlayerMoves() {
  //   this.playerMoves = [];
  //   let player = document.querySelectorAll('[color="yellow"]');
  //   player.forEach( ele => {
  //     ele.setAttribute('color', 'white');
  //     ele.removeAttribute('player');
  //   });
  // }

  // collisions() {
    // let startPos = this.playerMoves[0];
    // this.playerMoves.forEach( (move, i) => {
    //   document.getElementById(`row-${move[0]}-col-${move[1]}`)
    //   .setAttribute('color', 'white');
    // });
    // this.removeAllPlayerMoves();
    // setTimeout(() => {this.playerSetPos(startPos);}, 2000);
  //   this.youLose();
  // }
  //
  // youLose() {
  //   window.location.href = '#winOrLose';
  //   this.points = 0;
  //   this.alien.collision = false;
  // }
  //
  // showPoints(){
  //   let pointP = document.getElementById('points-div');
  //   let prese =  ((this.points / 6000.0) * 100).toFixed(2);
  //   pointP.innerHTML = "Score: " + prese + "%";
  //   if (prese >= 80 ){
  //     window.location.href = '#win';
  //     this.points = 0;
  //   }
  // }


}




module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);

class Player {
  constructor (board){
    // this.size = [2,2];
    this.board = board;
    this.imageSrc = "assets/images/sprite/mothership_blue.png";
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
    this.board.eraseMap();
    this.board.drawMap();
    return this.position;
  }

  validMove (pos){
    return this.board.validMove(pos);
  }

  collision (){

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
        console.log("nothing");
      }
      else if (moveVal === "1" && !(this.playerMoves.length === 0)) {
        //2. move on boarder with NOT empty array - flood fill, make arr el safe zone, empty arr
        this.playerMoves.forEach( coord => this.board.setCellAt(coord, "1"));
        // this.board.floodFillArea();
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
        this.board.setCellAt(move, "P");
      }
      else {
        //collision with "-" or "E"
        console.log("collision!!!!!");
      }
      this.position = move;
    }
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);

class Enemy {
  constructor (board){
    this.board = board;
    this.position = this.startPos();

    setInterval(() => this.moves(this.random_move()), 300);
  }

  startPos (){
    let col = Math.floor(Math.random() * Math.floor(this.board.rowCol-2)) + 1;
    let row = Math.floor(Math.random() * Math.floor((this.board.rowCol / 2)-2)) +1;
    this.board.setCellAt([row, col], "E");
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
      this.collision();
      return this.position;
    }
    else if (moveVal === "-") {
      this.collision();
      return this.position;
    }
    else if (moveVal === "0") {
      this.board.setCellAt(this.position, "0");
      this.position = moveTo;
      this.board.setCellAt(moveTo, "E");
    }

    this.board.eraseMap();
    this.board.drawMap();
    return this.position;
  }

  collision (){
    console.log("Lose life collision + remove array of player move + relocat player");
  }

}

Enemy.MOVES = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1]
];

module.exports = Enemy;


/***/ })
/******/ ]);