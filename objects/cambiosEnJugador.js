var img = document.getElementById("trooper");

function enemigo(x, y) {
	var x: 0,
	var y: canvas.height - 50 - 20,
	var ancho: 50,
	var alto: 50,

	var velocidad: 10,

	var margenLateral: 20,
	var limite_izquierda: 20,
	var limite_derecha: 0,

	//bullet variables
	var tiempoUltimoDisparo: null,
	var frecuenciaDisparo: 250,
	var disparos: []

	//This function moves the enemy
	this.actualizarJugador = function(direccionDerecha, vertical) {
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
	};

	//This function draws the enemy
	this.dibujarJugador = function() {
			var imgPlayer = document.getElementById("trooper");

			imgPlayer.onload = function () {
				ctx.drawImage(imgPlayer, this.x, this.y, this.alto, this.ancho);
			}
	}	

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
	};

}