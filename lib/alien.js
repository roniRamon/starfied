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

export default Alien;
