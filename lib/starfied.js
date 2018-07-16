const Game = require('./game.js');
// const Player = require('./player.js');
// const Enemy = require('./enemy.js');

document.addEventListener("DOMContentLoaded", function () {
  window.location.href = '#rules';

  let elem = document.getElementById('over');
  let elem2 = document.getElementById('over2');
  let elem3 = document.getElementById('start1');

  let scrrenSize = window.innerWidth;
  let options;

  if (scrrenSize > 1504) options = 50;
  else if (scrrenSize > 1202) options = 40;
  else if (scrrenSize > 900) options = 30;
  else if (scrrenSize < 900 ) options = 20;

  let game = new Game(options);

  elem.onclick = modalClick;
  elem2.onclick = modalClick;
  elem3.onclick = modalClick;

  function modalClick(){
    scrrenSize = window.innerWidth;
    if (scrrenSize > 1504) options = 50;
    else if (scrrenSize > 1202) options = 40;
    else if (scrrenSize > 900) options = 30;
    else if (scrrenSize < 900 ) options = 20;
    //restart game
    game.restart(options);
    window.location.href = '#close';
  }

});
