// import Player from './player';
// import Alien from './alien';
import Board from './board';


document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("game-canvas");



  // let ship = new Player(canvas);
  // let alien = new Alien({
  //   canvas: canvas,
  //   src: 'assets/images/alien/eyebot.png',
  //   size: [40, 40],
  // });

  let board = new Board({
    canvas
  });

});
