//TECLADO
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var teclado = {
	derecha: false,
	derecha_code: 39,
	izquierda: false,
	izquierda_code: 37,
	espacio: false,
	espacio_code: 32,
	tecla_s: 83,
	tecla_p: 80
};

function keyDownHandler(e) {
	if (e.keyCode == teclado.derecha_code) {
		teclado.derecha = true;
	} else if (e.keyCode == teclado.izquierda_code) {
		teclado.izquierda = true;
	} else if (e.keyCode == teclado.espacio_code) {
		teclado.espacio = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == teclado.derecha_code) {
		teclado.derecha = false;
	} else if (e.keyCode == teclado.izquierda_code) {
		teclado.izquierda = false;
	} else if (e.keyCode == teclado.espacio_code) {
		teclado.espacio = false;
	}
	else if(e.keyCode == teclado.tecla_s){
		//BUCLE PRINCIPAL
		if(levelStage == 0){ //To only allow to create one main "main" and prevent more executions
			mainInterval = setInterval(bucle, 1000/60);
			levelStage = 1; //We set the levelStage into the main one
		} else if(levelStage==2) { //We were on pause so a game was already existing and there is no need to call it again
			levelStage = 1;
			var bye = document.getElementById("wrap"); //Show the alien when pause is clicked
     		bye.style.visibility = 'hidden';
		} else if (levelStage == 3) { //Restart the game
			clearInterval(mainInterval);
			gameSpeed = 1.0;
			levelStage = 0;
			inicializar();
		}
	} else if(e.keyCode == teclado.tecla_p) { //We enter on pause mode
		if(levelStage == 1){
			levelStage = 2;
			imprimirPausa();
		}
	}
}