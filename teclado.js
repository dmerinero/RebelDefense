//TECLADO
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var teclado = {
	derecha: false,
	derecha_code: 39,
	izquierda: false,
	izquierda_code: 37,
	espacio: false,
	espacio_code: 32
};

function keyDownHandler(e) {
	if (e.keyCode == teclado.derecha_code) {
		teclado.derecha = true;
	} else if (e.keyCode == teclado.izquierda_code) {
		teclado.izquierda = true;
	} else if (e.keyCode == teclado.espacio_code) {
		teclado.espacio = true;
		startShake();
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
}