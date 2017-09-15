function disparo(x, y) {
	this.x = x + 20;
	this.y = y;
	this.ancho= 10;
	this.alto= 10;
	this.color= colors[Math.floor(Math.random() * 7)]; //Get a random color

	this.velocidad= 5;

	//This function moves the bullet
	this.actualizarDisparo = function() {
		this.y -= this.velocidad;
	};

	//This function draws the bullet
	this.dibujarDisparo = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.ancho, this.alto);
	};
};