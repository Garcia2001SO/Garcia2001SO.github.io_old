var canvas = document.getElementById("gameCanvas");
canvas.width = "800";
canvas.height = "600";
var ctx = canvas.getContext("2d");

	//pause variable
var pause = 1;

	//ball variables
var Xball = canvas.width/2;
var Yball = canvas.height/2;
var ballRadius = 10;
var ballSpeedX = -10;
var ballSpeedY = 7;
	
	//paddle variables
	//paddle 1
var paddle1Y = 250;
var paddle1X = 5;
var paddleHeight = 100;
var paddleWidth = 10;
var scoreP1 = 0;
	
	//paddle 2
var paddle2Y = 250;
var paddle2X = canvas.width - 15;
var scoreP2 = 0;
var paddle2Up = false;
var paddle2Down = false;
var paddle2Left = false;
var paddle2Right = false;
var e; //key codes
	
	//ON WINDOW LOAD
	//this is where the magic happens
window.onload = function(){
var framesPerSecond = 60;

setInterval(function(){
	//paddleAI();
	moveEverything();
	dRaw();
}, 1000/framesPerSecond); //do something every so miliseconds

//on event 'mousemove'
canvas.addEventListener('mousemove', 
	function(evt){
		if(pause == 1){
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - paddleHeight/2;
		}
});

//on event 'mousedown'
canvas.addEventListener('mousedown', handleMouseClick);

//event keydown
document.addEventListener("keydown", handleKeyDown);
//event keyup
document.addEventListener("keyup", handleKeyup);
}
	
	//paddle 2 KEYBOARD CONTROLS
function handleKeyDown(e){
	//up
	if(e.keyCode == 38){
		paddle2Up = true;
	}
	//down
	if(e.keyCode == 40){
		paddle2Down = true;
	}
	//left
	if(e.keyCode == 37){
		paddle2Left = true;
	}
	//right
	if(e.keyCode == 39){
		paddle2Right = true;
	}
}
function handleKeyup(e){
	//up
	if(e.keyCode == 38){
	console.log("!!!")
		paddle2Up = false;
	}
	//down
	if(e.keyCode == 40){
		paddle2Down = false;
	}
	//left
	if(e.keyCode == 37){
		paddle2Left = false;
	}
	//right
	if(e.keyCode == 39){
		paddle2Right = false;
	}
}

//turns on/off the pause variable
function handleMouseClick(){
	pause = -pause;
}

function moveEverything(){
	if(pause == 1){
		//updates the balls position
		Xball = Xball + ballSpeedX;
		Yball = Yball + ballSpeedY;
		
		//if ball goes out of horzontal limits it gets reset
		if(Xball > canvas.width){ 
			ballReset();
			scoreP1++;
			}
		if(Xball < 0){ 
			ballReset(); 
			scoreP2++;
		}
		//if ball goes out of vertical limits it bounces
		if(Yball > (canvas.height - ballRadius) || Yball < ballRadius)
		{ ballSpeedY = -ballSpeedY; }
		
		//bouncing on paddle 1
		if(Xball < (paddleWidth + paddle1X + ballRadius)){
			if(Yball > (paddle1Y - ballRadius) && Yball < (paddle1Y + paddleHeight + ballRadius)){
				ballSpeedX = -ballSpeedX;
				//the ball will go faster if it hits away 
				//from the center of the paddle
				var deltaY = Yball - (paddle1Y + paddleHeight/2);
				ballSpeedY = deltaY*0.35;
			}
		}
		
		//bouncing on paddle 2
		if(Xball > (paddle2X - ballRadius)){
			if(Yball > (paddle2Y - ballRadius) && Yball < (paddle2Y + paddleHeight + ballRadius)){
				ballSpeedX = -ballSpeedX;
				//the ball will go faster if it hits away 
				//from the center of the paddle
				var deltaY = Yball - (paddle2Y + paddleHeight/2);
				ballSpeedY = deltaY*0.3;
			}
		}
		
		//Paddle 2 Key Controls
		if(paddle2Up){
			paddle2Y = paddle2Y - 15; 
		}
		if(paddle2Down){
			paddle2Y = paddle2Y + 15; 
		}
		//if(paddle2Left){
		//	paddle2X = paddle2X - 8;
		//}
		//if(paddle2Right){
		//	paddle2X = paddle2X + 8; 
		//}
	}
}

function paddleAI(){
	if(pause == 1){
		//paddle2
		if(Yball > (paddle2Y + paddleHeight/2)){
			paddle2Y += Math.abs(ballSpeedY)/2;
		}
		
		if(Yball < (paddle2Y + paddleHeight/2)){
			paddle2Y -= Math.abs(ballSpeedY)/2;
		}
	}
}

function dRaw(){
	//canvas
	rects(0,0,canvas.width,canvas.height, 'black');
	
	//left paddle
	rects(paddle1X, paddle1Y, paddleWidth, paddleHeight, 'white');
	
	//paddle 2
	rects(paddle2X, paddle2Y, paddleWidth, paddleHeight, 'white');
	
	//ball
	circs(Xball, Yball, ballRadius, 'white');
	
	//Scores
	//paddle1
	ctx.fillStyle = 'White';
	ctx.fillText(scoreP1, 100, 100);
	//paddle2
	ctx.fillText(scoreP2, canvas.width - 110, 100);
}

function ballReset(){
	Xball = canvas.width/2;
	Yball = canvas.height/2;
	ballSpeedX = -ballSpeedX;
	ballSpeedY = -ballSpeedY;
}

	//finds the mouse position in the canvas
function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	
	return{
		x: mouseX,
		y: mouseY
	};
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