var jugador = {
	x: 0,
	y: canvas.height - 50 - 20,
	ancho: 50,
	alto: 50,

	velocidad: 10,

	margenLateral: 20,
	limite_izquierda: 20,
	limite_derecha: 0,

	//shots variables
	tiempoUltimoDisparo: null,
	frecuenciaDisparo: 2,
	disparos: []
};

function setJugador(){
	jugador.x = (canvas.width - 50)/2;
	jugador.y = canvas.height - jugador.alto - jugador.margenLateral;
	jugador.limite_izquierda = jugador.margenLateral;
	jugador.limite_derecha = canvas.width - jugador.ancho - jugador.margenLateral;
}

function actualizarJugador(){
	if (teclado.derecha) {
		jugador.x += jugador.velocidad;
	}
	if (teclado.izquierda) {
		jugador.x -= jugador.velocidad;
	} 
	if(teclado.espacio) {
		disparar();
	}
	//EVITAR QUE JUGADOR SALGA DE LA PANTALLA
	var limite_izquierda = jugador.margenLateral;

	if (jugador.x < jugador.limite_izquierda) {
		jugador.x = jugador.limite_izquierda;
	} else if (jugador.x > jugador.limite_derecha) {
		jugador.x = jugador.limite_derecha;
	}
}
function dibujarJugador(){
	//DIBUJAR JUGADOR
	ctx.fillStyle = "red";
	ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto);

	for(var j=0; j<jugador.disparos.length; j++){
		var disparo = jugador.disparos[j];
		disparo.actualizarDisparo();
		disparo.dibujarDisparo();
		if(disparo.y <= 0){
			delete jugador.disparos[j];
			jugador.disparos.splice(j, 1);
		}
	}
}

function disparar(){
	var tiempoActual = new Date().valueOf();
	if(jugador.tiempoUltimoDisparo === null || (tiempoActual - jugador.tiempoUltimoDisparo) > (1000 / jugador.frecuenciaDisparo)){
		var nuevoDisparo = new disparo(jugador.x, jugador.y);
		jugador.disparos.push(nuevoDisparo);
		teclado.espacio = false;
		jugador.tiempoUltimoDisparo = tiempoActual;
	}
}