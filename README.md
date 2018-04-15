# Starfied 2

### Background and Overview

A tribute to the game Volfied from 1989.
[The game](https://www.youtube.com/watch?v=RxuMVqkLD7o)

A player controls a marker that can move around the edges of the rectangle. The objective is to claim at least 80% of a level's area to finish the level.

Player can move using the keyboard arrows and SPACE to move to the enemy area.

### Functionality & MVP
*	User can play 4-5 levels - start and pause the game.
*	Move with the keyboard – left, right, up, down, space.
*	Hear Music while playing and mute music.
*	View his score and level.
*	In each level:
  *	Player will have enemies.
  *	Items to give him special abilities
*	The page will have the rules of the game


### Wireframes
The Game will be a single page with a game build on canvas, rules button for the user and a the player points. Keyboard to use on the side of the screen and links to my Facebook, LinkedIn and Github.
The canvas game will include 3 level screens. Each level has enemies and items to collect.
The player need to claim at least 80% of the canvas screen in order to pass to the next level.
Game controls start, pause and restart the game.
Sound controls mute, unmute.





### Architecture and Technologies
*	Vanilla JavaScript for overall structure and game logic
*	HTML5 Canvas for DOM manipulation and rendering
*	Scss for stylesheets
*	Webpack to bundle and serve up the various scripts
*	Downloaded [sprite](https://opengameart.org/content/complete-spaceship-game-art-pack)

###### Scripts involved in this project:
*	`enemy.js`: this script will generate the enemies and there logic. (enemy class)
*	p`layer.js`: this script will generate the player and his logic. ( player class)
*	`items.js`: this script will handle the items and the logic for the items. (item class)
*	`board.js`: the script will generate the board and updating the elements.
*	`game.js`: this script will keep track of the score, the levels and the logic of the rules.
*	`level1.js`: this script will generate all the objects and element level 1
*	`level2.js`: this script will generate all the objects and element for level 2  
*	`level3.js`: this script will generate all the objects and element for level 3

### Implementation Timeline
Over the weekend:
Researched what the best way to create the game
reading:
*	making a [game](https://hackernoon.com/making-a-game-with-javascript-and-pixijs-part-1-e3235139cd6f)
*	HTML5 audio tag
* Setup the webpack and scss and Learn how to use canvas.

** Day 1: **
Complete building the player class
The enemy class and setup of the canvas

** Day 2: **
Build level 1, game.js file and board.js file.

** Day 3: **
	Complete building the item class and add music.
  
** Day 4: **
	Style the page: add instructions volume control and add link to my Github, Linkedin and facebook   

#### Bonus features
* Add more levels.
* Add shooting for enemies and player.
* Improve graphics and add different sound in each level.  
