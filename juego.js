//OBTENEMOS EL CANVAS Y EL CONTEXT (USADO PARA DIBUJAR)
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//Setting the scale to the actual screen
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var mainInterval;

var colors = ["green", "yellow", "pink", "white", "blue", "orange"];

var aumentoGameSpeed = 0.25;
var gameSpeed = 1.0;

//CHANGE THIS ("levelStage") WHEN YOU CHANGE THE STAGE AS DEATH OR PAUSE
//Use:
// Introduction 8==D Stage 0
// Main game 8==D Stage 1
// Pause game 8==D Stage 2
// Dead 8==D Stage 3
// Next Level --> Stage 4
var levelStage = 0; 
var jugador;
var enemigos;
var scoreManager = new scoreManager();

//FUNCIONES
inicializar();

function inicializar() {
  menuInicial(); //Inside of this one we execute the game
  enemigos = new enemigosController();
	//INICIALIZAR JUGADOR
    jugador = setJugador();
    //Enemies init
    enemigos.setEnemigos();
    jugador.disparos = [];
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

var timeNextStage = 0;
var level = 1;

function bucle() {
  var bye = document.getElementById("vader"); //Show the alien when pause is clicked
  bye.style.visibility = 'hidden';
	if(levelStage==1){
		//LIMPIAR PANTALLA
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
    		
    scoreManager.dibujarScore();
		//Moving the player
		actualizarJugador();
        enemigos.actualizarEnemigos();
		//Drawing the player
        preShake(); //It will only shake when we call "startShake()"
        dibujarJugador();
        comprobarColisiones();
        enemigos.dibujarEnemigos();
        postShake();
        
        
		//Create the upper functions for the other objects we create
    //Check if all enemies have died
    if (enemigosElimidos >= enemigos.xEnemigos*enemigos.yEnemigos) {
      levelStage = 4;
      enemigosElimidos = 0;
    }
	} else if (levelStage == 3) { //GAME OVER
    ctx.strokeStyle = "white";
    ctx.strokeRect(canvas.width/2 - 250, canvas.height/2 - 50, 250*2, 30*2);
    ctx.fillStyle = "black";
    ctx.fillRect(canvas.width/2 - 250, canvas.height/2 - 50, 250*2, 30*2);
    ctx.fillStyle = "white";
    ctx.font="50px StarWars";
    ctx.fillText("G A M E  0 ` E R", canvas.width/2, canvas.height/2);
  } else if (levelStage == 4) { //NEXT LEVEL
    if (timeNextStage == 0) {
      level++;
      gameSpeed += aumentoGameSpeed;
      timeNextStage = new Date().getTime();
    }

    if (new Date().getTime() > timeNextStage + 2000) {
      levelStage = 1;
      inicializar();
      timeNextStage = 0;
    } else {
      ctx.strokeStyle = "white";
    ctx.strokeRect(canvas.width/2 - 420, canvas.height/2 - 50, 420*2, 30*2);
    ctx.fillStyle = "black";
    ctx.fillRect(canvas.width/2 - 420, canvas.height/2 - 50, 420*2, 30*2);
    ctx.fillStyle = "white";
    ctx.font="50px StarWars";
    ctx.fillText("S T A G E  C 0 M P L E T E D", canvas.width/2, canvas.height/2);
    }
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

function comprobarColisiones(){
    for(var i in jugador.disparos){
        var disparo = jugador.disparos[i];
        var colision = enemigos.comprobarColisiones(disparo.x, disparo.y, disparo.ancho, disparo.alto);
        if(colision == true){
 			delete jugador.disparos[i];
			jugador.disparos.splice(i, 1);
        }
    }
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
