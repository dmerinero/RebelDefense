var puntos = 200; //Puntos que da cada enemigo al morir
var img = document.getElementById("trooper");

var anchoEnemigo = 40;
var altoEnemigo = 40;

var enemigosElimidos = 0;

function enemigo(x, y) {
	this.x = x;
	this.y = y;
	this.ancho = anchoEnemigo;
	this.alto = altoEnemigo;

	this.alive = true;

	this.color = colors[Math.floor(Math.random() * 7)]; //Get a random color
	this.velocidad = 3;

	this.disparo = new disparoEnemigo();
	this.shootTime = -10;

	//This function moves the enemy
	this.actualizarEnemigo = function(direccionDerecha, vertical) {
		//Actualizar disparo
		this.disparo.actualizar();

		this.comprobarColision();

		if (!this.alive) return;
		if(vertical)
			this.y += (this.velocidad-1.5)*gameSpeed;
		else
			if(direccionDerecha)
				this.x += this.velocidad*gameSpeed;
			else
				this.x -= this.velocidad*gameSpeed;
	};

	//This function draws the enemy and the shot
	this.dibujarEnemigo = function() {
		if (this.alive) ctx.drawImage(img, this.x, this.y, 50, 50);
		this.disparo.dibujar();
	};

	this.actualizarDisparo = function() {
		
		if (this.shootTime <= 0) {
			this.reloadShot();
		}

		if (this.disparo.alive) return; //Only one shot alive
		if (this.shootTime < new Date().getTime()) {
			this.disparo.disparar(this.x, this.y);
			this.reloadShot();
		}
	};

	this.reloadShot = function() {
		this.shootTime = new Date().getTime() + (Math.floor(Math.random() * 6)*1000 + 1000)/gameSpeed;
	};

	this.comprobarColision = function() {
		if (jugador.x < this.x + this.ancho && jugador.x + jugador.ancho > this.x &&
                    jugador.y < this.y + this.alto && jugador.y + jugador.alto > this.y) {
			//Player was hit --> GAME OVER
			levelStage = 3;
		}
	}
}

function disparoEnemigo() {
	this.x = 0 + anchoEnemigo/2;
	this.y = 0 + altoEnemigo + 5;

	this.ancho= 10;
	this.alto= 10;

	this.alive = false;
	this.velocidad = 5;

	this.disparar = function(x, y) {
		this.alive = true;
		this.x = x + anchoEnemigo/2;
		this.y = y + altoEnemigo;
	};

	this.actualizar = function() {
		if (!this.alive) return;
		this.y += this.velocidad*gameSpeed; //Move
		if (this.y > canvas.width) {
			this.alive = false;
		}
		this.comprobarColision();
	};

	this.dibujar = function() {
		if (this.alive) {
			ctx.fillStyle = "red";
			ctx.fillRect(this.x, this.y, this.ancho, this.alto)
		}
	};

	this.comprobarColision = function() {
		if (jugador.x < this.x + this.ancho && jugador.x + jugador.ancho > this.x &&
                    jugador.y < this.y + this.alto && jugador.y + jugador.alto > this.y) {
			//Player was hit --> GAME OVER
			levelStage = 3;
		}
	};
}

function enemigosController(){
	var enemigos = [];
	var direccionDerecha = true; //This is the side direction
	var changeDir = false; //When true, it will change the direction
	var tiempoVertical = 500; //This is the vertical movement time
	var ultimoCambio = null;

	this.xEnemigos = 10; //Change here to change the weight of the enemies
	this.yEnemigos = 4; //Change here to create more or less enemies rows

	this.setEnemigos = function() {
		var posX = 30;
		var posY = 30;
		for(var j=0; j<this.yEnemigos; j++){ 
			enemigos[j]= [];
			for(var i=0; i<this.xEnemigos; i++){
				enemigos[j][i] = new enemigo(posX, posY);
				posX+= enemigos[j][i].ancho+30;
			}
			posY+=40+30;
			posX = 30;
		}
	}
	this.actualizarEnemigos = function(){
		var tiempoActual = new Date().valueOf();
		if(( tiempoActual - ultimoCambio) < tiempoVertical)
			this.movimientoVertical();
		else
			this.movimientoLateral(); //Movement to the sides


		if(changeDir == true){
			direccionDerecha = !direccionDerecha;
			changeDir = false;
			ultimoCambio = new Date().valueOf();
		}

		//Enemies shots
		for (var i = 0; i<this.xEnemigos; i++) {
			var j = enemigos.length-1;
			while (!enemigos[j][i].alive && j > 0) {
				j--;
			}
			if (!enemigos[j][i].alive) continue;
			enemigos[j][i].actualizarDisparo();
			
		}
	}

	this.movimientoLateral = function() {
		for(var j=0; j<enemigos.length; j++){
			for(var i=0; i<enemigos[j].length; i++){
				enemigos[j][i].actualizarEnemigo(direccionDerecha, false);
				if(enemigos[j][i].x >= canvas.width - 70)
					changeDir = true;
				else if(enemigos[j][i].x <= 20)
					changeDir = true;
				
			}
		}
	}

	this.movimientoVertical = function (){
		for(var j=0; j<enemigos.length; j++){
			for(var i=0; i<enemigos[j].length; i++){
				enemigos[j][i].actualizarEnemigo(direccionDerecha, true);
			}
		}
	}

	this.dibujarEnemigos = function(){
		for(var j=0; j<enemigos.length; j++)
			for(var i=0; i<enemigos[j].length; i++)
				enemigos[j][i].dibujarEnemigo();
	}

    this.comprobarColisiones = function(dx, dy, dan, dal) {
        for(var j=0; j<enemigos.length; j++)
			for(var i=0; i<enemigos[j].length; i++){
				if (!enemigos[j][i].alive) continue;
                if(enemigos[j][i].x < dx + dan && enemigos[j][i].x + enemigos[j][i].ancho > dx &&
                    enemigos[j][i].y < dy + dal && enemigos[j][i].y + enemigos[j][i].alto > dy){
                    //The two objects are touching
                    //delete enemigos[j][i];
                    //enemigos[j].splice(i, 1);
                    enemigos[j][i].alive = false;
                    startShake();
                    scoreManager.addScore(puntos);
                    enemigosElimidos++;
                    return true;
                }

            }
        return false;
			
    }

}
