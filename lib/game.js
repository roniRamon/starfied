import Alien from './alien';

class Game {
  constructor (grid){
    this.createGrid(grid);
    this.playerMoves = [];

    document.addEventListener('keydown', this.keyDown.bind(this), false);
    this.alien = new Alien();
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
        if (i === 0 || i === 59 ) li.setAttribute('color', 'black');
        else if (j === 0 || j === 99 ) li.setAttribute('color', 'black');
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
    player.setAttribute('color', 'black');
    // console.log(this.playerMoves);
  }

  playerMovedToWhiteArea(moveTo, player){
    let [rowP, colP] = this.getColAndRowFromLi(player);
    let [rowM, colM] = this.getColAndRowFromLi(moveTo);

    if (moveTo.getAttribute('color') === 'white' )
    {
      this.playerMoves.push([rowP, colP], [rowM, colM]);
    }
    else if (moveTo.getAttribute('color') !== 'black'){
      this.playerMoves.push([rowM, colM]);
    }
    else if (moveTo.getAttribute('color') === 'black'){
      let node = document.getElementById(`row-1-col-50`);
      // this.floodFillArea(node, 'white', 'black');
      let x = this.checkAlienPos(node, 'white', 'alien');
      console.log(x);
    }
  }

  floodFillArea(node, targetColor, replacementColor) {
    if (targetColor === replacementColor) return;
    if (node.getAttribute('color') !== targetColor ) return;

    node.setAttribute('color', replacementColor);

     let [row, col] = this.getColAndRowFromLi(node);

     let node1 = document.getElementById(`row-${row}-col-${col+1}`);
     let node2 = document.getElementById(`row-${row}-col-${col-1}`);
     let node3 = document.getElementById(`row-${row+1}-col-${col}`);
     let node4 = document.getElementById(`row-${row-1}-col-${col}`);
     this.floodFillArea(node1, targetColor, replacementColor);
     this.floodFillArea(node2, targetColor, replacementColor);
     this.floodFillArea(node3, targetColor, replacementColor);
     this.floodFillArea(node4, targetColor, replacementColor);

    return;
  }

  checkAlienPos(node, targetColor, attr) {
    if (node.getAttribute('color') !== targetColor ) return; 
    if (node.hasAttribute(attr) ) return true;

    let [row, col] = this.getColAndRowFromLi(node);

    let nodeArr = [];
    nodeArr.push(document.getElementById(`row-${row}-col-${col+1}`));
    nodeArr.push(document.getElementById(`row-${row}-col-${col-1}`));
    nodeArr.push(document.getElementById(`row-${row+1}-col-${col}`));
    nodeArr.push(document.getElementById(`row-${row-1}-col-${col}`));

    nodeArr.forEach( nodeEle => {
      if (nodeEle) this.checkAlienPos(nodeEle, targetColor, attr);
    });

    return false;
  }

  getNeighbours(){
    let player = document.querySelectorAll('[color="yellow"]')[0];
    let [row, col] = this.getColAndRowFromLi(player);
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

  getColAndRowFromLi(player) {
    let col = Number(player.id.match(/\d+/g)[1]);
    let row = Number(player.id.match(/\d+/g)[0]);
    return [row, col];
  }

}




export default Game;
