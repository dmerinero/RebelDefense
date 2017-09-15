//OBTENEMOS EL CANVAS Y EL CONTEXT (USADO PARA DIBUJAR)
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//Setting the scale to the actual screen
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//OBJETOS
var jugador = {
	x: 0,
	y: canvas.height - 50 - 20,
	ancho: 50,
	alto: 50,

	velocidad: 10,

	margenLateral: 20,
	limite_izquierda: 20,
	limite_derecha: 0
};

//TECLADO
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var teclado = {
	derecha: false,
	derecha_code: 39,
	izquierda: false,
	izquierda_code: 37
};

function keyDownHandler(e) {
	if (e.keyCode == teclado.derecha_code) {
		teclado.derecha = true;
	} else if (e.keyCode == teclado.izquierda_code) {
		teclado.izquierda = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == teclado.derecha_code) {
		teclado.derecha = false;
	} else if (e.keyCode == teclado.izquierda_code) {
		teclado.izquierda = false;
	}
}

//FUNCIONES
inicializar();

function inicializar() {
	//INICIALIZAR JUGADOR
	jugador.x = (canvas.width - 50)/2;
	jugador.y = canvas.height - jugador.alto - jugador.margenLateral;
	jugador.limite_izquierda = jugador.margenLateral;
	jugador.limite_derecha = canvas.width - jugador.ancho - jugador.margenLateral;
	//BUCLE PRINCIPAL
	setInterval(bucle, 1000/60);
}

function bucle() {
	//LIMPIAR PANTALLA
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//MOVER AL JUGADOR
	if (teclado.derecha) {
		jugador.x += jugador.velocidad;
	} else if (teclado.izquierda) {
		jugador.x -= jugador.velocidad;
	}
	//EVITAR QUE JUGADOR SALGA DE LA PANTALLA
	var limite_izquierda = jugador.margenLateral;

	if (jugador.x < jugador.limite_izquierda) {
		jugador.x = jugador.limite_izquierda;
	} else if (jugador.x > jugador.limite_derecha) {
		jugador.x = jugador.limite_derecha;
	}
	//DIBUJAR JUGADOR
	ctx.fillStyle = "red";
	ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto);
}

/*
Yo creo que lo suyo sería crear dos funciones: actualizarJugador y dibujarJugador
Asi lo podriamos organizar mejor (y cuando creemos más objetos crear otras 2 funciones para ese objeto)
*/