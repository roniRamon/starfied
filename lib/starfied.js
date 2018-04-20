import Game from './game';


document.addEventListener("DOMContentLoaded", function () {
   const grid = document.getElementById("grid");
   new Game(grid);

});

function reloadPage(){
  window.location.href = '#close';
  document.getElementById("grid").innerHTML = '';
  let gridReload = document.getElementById("grid");
  new Game(gridReload);
}

let winOrLoseButton = document.getElementById('winOrLose-button');
document.addEventListener('click', () => reloadPage());
