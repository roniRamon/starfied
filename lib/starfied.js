import Game from './game';
import Board from './board';

let game;
let grid;
document.addEventListener("DOMContentLoaded", function () {
   // grid = document.getElementById("grid");
   // game = new Game(grid);

   let board = new Board(50);
   board.drawMap();
   document.addEventListener('keydown', function (e) {
     board.player.moves(e);
   });

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
