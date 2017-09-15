//OBTENEMOS EL CANVAS Y EL CONTEXT (USADO PARA DIBUJAR)
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//Setting the scale to the actual screen
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var colors = ["green", "yellow", "pink", "white", "blue", "orange"];

//FUNCIONES
inicializar();

function inicializar() {
	//INICIALIZAR JUGADOR
	setJugador();

	//BUCLE PRINCIPAL
	setInterval(bucle, 1000/60);
}

function bucle() {
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