import Alien from './alien';


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




export default Game;
