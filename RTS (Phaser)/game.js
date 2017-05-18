//game.js

var game = new Phaser.Game(580, 460, Phaser.AUTO, null, 'gameDiv');

//add each game state

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('update', updateState);
//game.state.add('play', playState);

//variables
var image;
//var bounds;
var coordinatesX;
var coordinatesY;
var displayX;
var displayY;
var worldX;
var worldY;
var isSelected;

//call the boot state
game.state.start('boot');
