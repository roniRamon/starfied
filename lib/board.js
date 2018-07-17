const Player = require('./player.js');
const Enemy = require('./enemy.js');
const EnemySmall = require('./enemy_small.js');

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
    if (this.getCellAt(coords) === "S") {
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
      if(newCoordVal === "0" || newCoordVal === "E" ){
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
