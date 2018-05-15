class Board {
  constructor (rowCol){
    this.rowCol = rowCol;
    this.grid = Board.blankGrid(this.rowCol);
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
    this.grid = Board.blankGrid(this.rowCol);
    console.log(this.grid);
  }

  validMove (coord){
    return (coord[0] >= 0) && (coord[0] < this.rowCol) &&
     (coord[1] >= 0) && (coord[1] < this.rowCol);
  }

  getCellAt (coord){
    return this.grid[coord[0], coord[1]];
  }

}

Board.BLANK_SYMBOL = "0";
Board.SAFE_SYMBOL = "1";

Board.PLAYER_SYMBOL = "P";
Board.ENAMY_SYMBOL = "E";
Board.MOVE_SYMBOL = "-";

module.exports = Board;
