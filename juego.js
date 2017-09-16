//OBTENEMOS EL CANVAS Y EL CONTEXT (USADO PARA DIBUJAR)
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//Setting the scale to the actual screen
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var colors = ["green", "yellow", "pink", "white", "blue", "orange"];

//CHANGE THIS ("levelStage") WHEN YOU CHANGE THE STAGE AS DEATH OR PAUSE
//Use:
// Introduction 8==D Stage 0
// Main game 8==D Stage 1
// Pause game 8==D Stage 2
// Dead 8==D Stage 3
var levelStage = 0; 

//FUNCIONES
inicializar();

function inicializar() {
	//INICIALIZAR JUGADOR
	setJugador();

	menuInicial(); //Inside of this one we execute the game
}

function menuInicial() {
    ctx.fillStyle = "#e3edf0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font="50px StarWars";
    ctx.fillStyle = 'black';
    ctx.textBaseline="center"; 
    ctx.textAlign="center"; 
    ctx.fillText("Rebel Defense", canvas.width / 2, canvas.height/2 - 80); 
    ctx.font="24px StarWars";

	ctx.fillText("Press 'S' to Start and 'P' to Pause.", canvas.width / 2, canvas.height/2 - 30); 
}

function bucle() {
	if(levelStage==1){
		//LIMPIAR PANTALLA
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		//Moving the player
		actualizarJugador();
		//Drawing the player
		preShake(); //It will only shake when we call "startShake()"
		dibujarJugador();
		postShake();


		//Create the upper functions for the other objects we create
	}
}

function imprimirPausa() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font="40px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="center"; 
    ctx.textAlign="center"; 
    ctx.fillText("Pause", canvas.width / 2, canvas.height/2 - 120); 
    ctx.font="16px Arial";

     var bye = document.getElementById("wrap"); //Show the alien when pause is clicked
     bye.style.visibility = 'visible';
}


//Functions from google to shake the screen when a shoot is done
var shakeDuration = 200;
var shakeStartTime = -1;

function preShake() {
  if (shakeStartTime ==-1) return;
  var dt = Date.now()-shakeStartTime;
  if (dt>shakeDuration) {
      shakeStartTime = -1; 
      return;
  }
  var easingCoef = dt / shakeDuration;
  var easing = Math.pow(easingCoef-1,3) +1;
  ctx.save();  
  var dx = easing*(Math.cos(dt*0.1 ) + Math.cos( dt *0.3115))*2;
  var dy = easing*(Math.sin(dt*0.05) + Math.sin(dt*0.057113))*2;
  ctx.translate(dx, dy);  
}

function postShake() {
  if (shakeStartTime ==-1) return;
  ctx.restore();
}

function startShake() {
   shakeStartTime=Date.now();
}