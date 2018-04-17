// import Player from './player';
// import Alien from './alien';
// import Board from './board';
import Game from './game';


document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext('2d');

  let game = new Game(canvas, ctx);

  game.start(ctx);

});
