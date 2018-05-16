const Player = require('./player.js');

class Board {
  constructor (rowCol){
    this.rowCol = rowCol;
    this.player = new Player(this);
    this.grid = Board.blankGrid(this.rowCol);
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
    this.player.startPos();
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
    console.log(this.grid);
  }

  validMove (coord){
    return (coord[0] >= 0) && (coord[0] < this.rowCol) &&
     (coord[1] >= 0) && (coord[1] < this.rowCol);
  }

  getCellAt (coord){
    return this.grid[coord[0]][coord[1]];
  }

  setCellAt (coord, val){
    this.grid[coord[0]][coord[1]] = val;
  }

}

Board.BLANK_SYMBOL = "0";
Board.SAFE_SYMBOL = "1";

Board.PLAYER_SYMBOL = "P";
Board.ENAMY_SYMBOL = "E";
Board.MOVE_SYMBOL = "-";

module.exports = Board;
