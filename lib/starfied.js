const Game = require('./game.js');
const Player = require('./player.js');
const Enemy = require('./enemy.js');

document.addEventListener("DOMContentLoaded", function () {
  window.location.href = '#rules';

  let elem = document.getElementById('over');
  let elem2 = document.getElementById('over2');
  let elem3 = document.getElementById('start1');
  elem.onclick = function() {
    let game = new Game;
    game.board.render();
    game.player = {};
    game.enemy = {};
    game.player = new Player(game.board);
    game.enemy = new Enemy(game.board);
    window.location.href = '#close';
  };
  elem2.onclick = function() {
    let game = new Game;
    game.board.render();
    game.player = {};
    game.enemy = {};
    game.player = new Player(game.board);
    game.enemy = new Enemy(game.board);
    window.location.href = '#close';
  };
  elem3.onclick = function() {
    let game = {};
    game = new Game;
    game.board.render();
    game.player = {};
    game.enemy = {};
    game.player = new Player(game.board);
    game.enemy = new Enemy(game.board);
     window.location.href = '#close';
  };
});
