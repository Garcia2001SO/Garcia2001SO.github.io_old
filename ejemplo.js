//------------
//  VARIABLES
//------------
var canvas = document.getElementById("gameCanvas");
canvas.width = "800";
canvas.height = "600";
var ctx = canvas.getContext("2d");

//gridBlock
var gridBlockX = canvas.width/5;
var gridBlockY = canvas.height/5;
var gridBlockWidth = 50;
var gridBlockHeight = 50;
var gridBlockColor = "black";
var gridBlockState = 0;

//Square
var squareX = canvas.width/2;
var squareY = canvas.height/2;
var squareWidth = 20;
var squareHeight = 20;
var squareSpeedX = 8;
var squareSpeedY = 8;
var squareUp = false;
var squareDown = false;
var squareLeft = false;
var squareRight = false;
var squareColor = "red";
var squareState = false;

//Ball
var Xball = 30;
var Yball = 30;
var ballRadius = 4;

//---------------	
//ON WINDOW LOAD
//---------------
//this is where the magic happens
window.onload = function(){
	var framesPerSecond = 60;
	
	setInterval(function(){
		moveEverything();
		dRaw();
	}, 1000/framesPerSecond); //do something every so miliseconds
	
    canvas.oncontextmenu = function(){ return false; }
//----------------
//Event Listeners
//----------------
	//on event 'mousemove'
	/*canvas.addEventListener('mousemove', 
		function(evt){
				var mousePos = calculateMousePos(evt);
				//paddle1Y = mousePos.y - paddleHeight/2;
	});*/

	//on event 'mousedown'
	canvas.addEventListener('mousedown', handleMouseClick, false);
	//event keydown
	document.addEventListener("keydown", handleKeyDown);
	//event keyup
	document.addEventListener("keyup", handleKeyup);
}
	

//--------
//  Logic
//--------
function moveEverything(){
	//Square keaybord movement
    if(squareState){
        if(squareUp){
            squareY = squareY - 8; 
        }
        if(squareDown){
            squareY = squareY + 8; 
        }
        if(squareLeft){
            squareX = squareX - 8;
        }
        if(squareRight){
            squareX = squareX + 8; 
        }
    }
}

function gridBlockStateAdder(cond = true){
    if(cond){
		gridBlockState++;
	}
}


//---------------------
//	CONTROLS FUNCTIONS
//---------------------

//KEYBOARD CONTROLS
function handleKeyDown(e){
	//up
	if(e.keyCode == 38){
		squareUp = true;
	}
	//down
	if(e.keyCode == 40){
		squareDown = true;
	}
	//left
	if(e.keyCode == 37){
		squareLeft = true;
	}
	//rightq
	if(e.keyCode == 39){
		squareRight = true;
	}
}

function handleKeyup(e){
	//up
	if(e.keyCode == 38){
		squareUp = false;
	}
	//down
	if(e.keyCode == 40){
		squareDown = false;
	}
	//left
	if(e.keyCode == 37){
		squareLeft = false;
	}
	//right
	if(e.keyCode == 39){
		squareRight = false;
	}
}

//MOUSE CONTROLS
//finds the mouse position in the canvas
function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	
    //alert("x:" + mouseX + " y:" + mouseY);
    
	return{
		x: mouseX,
		y: mouseY
	};
}


function handleMouseClick(e){
    //finds mouse position
    var x = e.x;
    var y = e.y;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    //alert("x:" + x + " y:" + y);
    
    //if left clicked
    if(e.button == 0){
        //change the gridBlockState
        gridBlockStateAdder();

        //change the squareState if x and y are inside the square
        if(x >= squareX && x <= (squareX + squareWidth) && y >= squareY && y <= (squareY + squareHeight)){
            squareState = true;
        }
        else {
            squareState = false;
        }
    }
    
    //if right clicked
    if(e.button == 2){
        //square teleport
        if(squareState){
            squareX = x - squareWidth/2;
            squareY = y - squareHeight/2;
        }
    }
}


//----------------
//	DRAW FUNCTIONS
//----------------
function dRaw(){
    //color of gridBlock
    if(gridBlockState == 0){
        gridBlockColor = "black";
        console.log("!")
    }
    else if(gridBlockState == 1){
        gridBlockColor = "red";
    }
    else if(gridBlockState == 2){
        gridBlockColor = "blue";
        gridBlockState == 0;
    }
    else if(gridBlockState == 3){
        gridBlockState = 0;
    }
    
    //squareColor
    if(squareState){
        squareColor = "blue";
    }
    else {
        squareColor = "red";
    }
    
	//canvas
	rects(0,0,canvas.width,canvas.height, 'white');
	
	//ball
	// circs(Xball, Yball, ballRadius, 'white');

	rects(squareX, squareY, squareWidth, squareHeight, squareColor);
    
    rects(gridBlockX, gridBlockY, gridBlockWidth, gridBlockHeight, gridBlockColor);
}

//draws rectangles
function rects(leftX, topY, width, height, color){
	ctx.fillStyle = color;
	ctx.fillRect(leftX, topY, width, height);
}

//draws balls
function circs(centerX, centerY, radius, color){
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	ctx.fill();
}