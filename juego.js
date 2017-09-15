//OBTENEMOS EL CANVAS Y EL CONTEXT (USADO PARA DIBUJAR)
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//Setting the scale to the actual screen
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;


//TECLADO
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


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
	dibujarJugador();

	//Create the upper functions for the other objects we create
}