var jugador = {
	x: 0,
	y: canvas.height - 50 - 20,
	ancho: 50,
	alto: 50,

	velocidad: 10,

	margenLateral: 20,
	limite_izquierda: 20,
	limite_derecha: 0,

	//bullet variables
	tiempoUltimoDisparo: null,
	frecuenciaDisparo: 250,
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

	//Update all the bullets we have shot
	for(var j=0; j<jugador.disparos.length; j++){
		var disparo = jugador.disparos[j];
		disparo.actualizarDisparo();
		disparo.dibujarDisparo();
		
		//If the bullet position is out of the screen destroy the bullet
		if(disparo.y <= 0){
			delete jugador.disparos[j];
			jugador.disparos.splice(j, 1);
		}
	}
}

//This will add a bullet when the time defined as "frecuenciaDisparo" has passed or when we have never shot before
function disparar(){
	var tiempoActual = new Date().valueOf();
	if(jugador.tiempoUltimoDisparo === null || (tiempoActual - jugador.tiempoUltimoDisparo) > (jugador.frecuenciaDisparo)){
		var nuevoDisparo = new disparo(jugador.x, jugador.y); //We create a new bullet object 
		nuevoDisparo.sonido.play();
		jugador.disparos.push(nuevoDisparo); //We add the bullet to the array
		teclado.espacio = false;
		jugador.tiempoUltimoDisparo = tiempoActual; //We update the time
	}
}