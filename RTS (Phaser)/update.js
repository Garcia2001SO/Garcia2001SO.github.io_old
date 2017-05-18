var updateState = {
	create: function () {
		game.add.sprite(0,0, 'beleriand');
        image = game.add.sprite(game.world.centerX, game.world.centerY, 'star');
        
        //sets world bounds to 1893x1391 wich is bigger than the canvas
        game.world.setBounds(0, 0, 1893, 1391);
        
        //making a rectangle
        /*bounds = new Phaser.Rectangle(50,50, 20,20);
        var graphics = game.add.graphics(bounds.x, bounds.y);
        graphics.beginFill(0x000077);
        graphics.drawRect(0, 0, bounds.width, bounds.height);*/
        
        //moves the image anchor to the middle of the image instead of the top left corner
        image.anchor.set(0.5);
        
        //enabling all kinds of inputs like clicking
        image.inputEnabled = true;
        
        //enabling physics
        game.physics.enable(image);
        
        //adding event listener to the sprite 'image'
        image.events.onInputDown.add(selected, this);
        
        //image.input.boundsRect = bounds;
        game.camera.follow(image);
        game.input.onDown.add(pointerHandler, this);
	},
	update: function(){
        //if the sprite is < 10px away from the pointer it stops
        if(Math.abs(image.position.x - coordinatesX)<10 && Math.abs(image.position.y - coordinatesY)<10){
            //turn off velocity
            image.body.velocity.set(0);
        }
	}
};

function selected(){
    if(game.input.activePointer.leftButton.isDown){
        if(isSelected){
            console.log('already');
        }
        else{
            isSelected = true;
            console.log('selected!');
        }
    }
}

function moveStar(){
    game.physics.arcade.moveToPointer(image, 300);
}

//MOUSE BUTTONS
function pointerHandler(){
    //LEFT
    if(game.input.activePointer.leftButton.isDown){
        if(isSelected){
            isSelected = false;
            console.log('deselected');
        }
    }
    //MIDDLE
    if(game.input.activePointer.middleButton.isDown && isSelected){
        calcPointerWorldCoords();
        image.position.x = coordinatesX;
        image.position.y = coordinatesY;
    }
    //RIGHT
    if(game.input.activePointer.rightButton.isDown && isSelected){
        calcPointerWorldCoords();
        moveStar();
    }
}

function calcPointerWorldCoords(){
    displayX = game.input.activePointer.positionDown.x;
    displayY = game.input.activePointer.positionDown.y;
    worldX = game.world.worldPosition.x;
    worldY = game.world.worldPosition.y;
    coordinatesX = displayX - worldX;
    coordinatesY = displayY - worldY;
}