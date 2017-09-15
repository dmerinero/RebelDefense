function disparo(x, y) {
	this.x = x;
	this.y = y;
	this.ancho= 10;
	this.alto= 10;
	this.color= colors[Math.floor(Math.random() * 7)];

	this.velocidad= 5;

	this.actualizarDisparo = function() {
		this.y -= this.velocidad;
	};

	this.dibujarDisparo = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.ancho, this.alto);
	};
};