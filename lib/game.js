

class Game {
  constructor (grid){
    this.createGrid(grid);

    document.addEventListener('keydown', this.keyDown.bind(this), false);
  }

  createGrid(grid) {
    let myBoard = document.createElement('div');
    myBoard.setAttribute('id', 'myBoard-div');

    for (let i = 0; i < 60; i++) {
      let ul = document.createElement('ul');
      ul.setAttribute('id', `row-${i}`);
      if (i === 0 || i === 59 ) ul.setAttribute('class', 'color-black');
      for (let j = 0; j < 100; j++) {
        let li = document.createElement('li');
        li.setAttribute('id', `row-${i}-col-${j}`);
        if (j === 0 || j === 99 ) li.setAttribute('class', 'color-black');
        ul.appendChild(li);
      }
      myBoard.appendChild(ul);
    }

    grid.appendChild(myBoard);
    this.startPos();
  }

  startPos() {
    let startLi = document.getElementById('row-59-col-49');
    startLi.setAttribute('class', 'color-yellow');
    startLi.setAttribute('player', 'true');
  }

  keyDown(e){
    let player = document.getElementsByClassName('color-yellow')[0];
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
    moveTo.setAttribute('class', 'color-yellow');
    player.classList.remove('color-yellow');
    player.setAttribute('class', 'color-black');
  }

  getNeighbours(liId){
    let player = document.getElementsByClassName('color-yellow')[0];
    let [row, col] = this.getColAndRowFromLi(player);
  }

  getColAndRowFromLi(player) {
    let col = Number(player.id.match(/\d+/g)[1]);
    let row = Number(player.id.match(/\d+/g)[0]);
    return [row, col];
  }

}




export default Game;
