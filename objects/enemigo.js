var puntos = 200; //Puntos que da cada enemigo al morir
var img = document.getElementById("trooper");

function enemigo(x, y) {
	this.x = x;
	this.y = y;
	this.ancho = 40;
	this.alto = 40;

	this.color = colors[Math.floor(Math.random() * 7)]; //Get a random color
	this.velocidad = 3;

	//This function moves the enemy
	this.actualizarEnemigo = function(direccionDerecha, vertical) {
		if(vertical)
			this.y += this.velocidad-1.5;
		else
			if(direccionDerecha)
				this.x += this.velocidad;
			else
				this.x -= this.velocidad;
	};

	//This function draws the enemy
	this.dibujarEnemigo = function() {
			ctx.drawImage(img, this.x, this.y, 50, 50);
	};

}

function enemigosController(){
	var enemigos = [];
	var direccionDerecha = true; //This is the side direction
	var changeDir = false; //When true, it will change the direction
	var tiempoVertical = 500; //This is the vertical movement time
	var ultimoCambio = null;

	this.setEnemigos = function() {
		var posX = 30;
		var posY = 30;
		for(var j=0; j<4; j++){ //Change here to create more or less enemies rows
			enemigos[j]= [];
			for(var i=0; i<10; i++){ //Change here to change the weight of the enemies
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
                if(enemigos[j][i].x < dx + dan && enemigos[j][i].x + enemigos[j][i].ancho > dx &&
                    enemigos[j][i].y < dy + dal && enemigos[j][i].y + enemigos[j][i].alto > dy){
                    //The two objects are touching
                    //delete enemigos[j][i];
                    enemigos[j].splice(i, 1);
                    startShake();
                    scoreManager.addScore(puntos);
                    return true;
                }

            }
        return false;
			
    }

}
