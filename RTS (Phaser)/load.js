//load.js
var loadState = {
	preload: function(){
		game.load.image('star', 'assets/star.png');
        game.load.image('beleriand', 'assets/beleriand.jpg');
 	},
 	create: function(){
 		game.state.start('update');
 	}
 };
