//boot.js

var bootState = {
	create: function () {
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.state.start('load');
	}
};
