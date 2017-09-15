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