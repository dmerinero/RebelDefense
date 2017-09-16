function enemigo(x, y) {
	this.x = x;
	this.y = y;
	this.ancho = 40;
	this.alto = 40;

	this.color = colors[Math.floor(Math.random() * 7)]; //Get a random color
	this.velocidad = 3;

	//This function moves the enemy
	this.actualizarEnemigo = function(direccionDerecha) {
		if(direccionDerecha)
			this.x += this.velocidad;
		else
			this.x -= this.velocidad;
	};

	//This function draws the enemy
	this.dibujarEnemigo = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.ancho, this.alto);
	};
};

function enemigosController(){
	var enemigos = [];
	var direccionDerecha = true; //This is the side direction
	var changeDir = false; //When true, it will change the direction
	var direccionUp = false; //This is the vertical movement

	this.setEnemigos = function() {
		var posX = 30;
		var posY = 30;
		for(var j=0; j<4; j++){
			enemigos[j]= [];
			for(var i=0; i<10; i++){
				enemigos[j][i] = new enemigo(posX, posY);
				posX+= enemigos[j][i].ancho+30;
			}
			posY+=40+30;
			posX = 30;
		}
	}
	this.actualizarEnemigos = function(){
		if(direccionUp)
			console.log("Movimiento Vertical");
		else
			this.movimientoLateral(); //Movement to the sides


		if(changeDir == true){
			direccionDerecha = !direccionDerecha;
			changeDir = false;
		}
	}

	this.movimientoLateral = function() {
		for(var j=0; j<4; j++){
			for(var i=0; i<10; i++){
				enemigos[j][i].actualizarEnemigo(direccionDerecha);
				if(enemigos[j][i].x >= canvas.width - 70)
					changeDir = true;
				else if(enemigos[j][i].x <= 20)
					changeDir = true;
				
			}
		}
	}

	this.dibujarEnemigos = function(){
		for(var j=0; j<4; j++)
			for(var i=0; i<10; i++)
				enemigos[j][i].dibujarEnemigo();
	}

}