function scoreManager() {
	this.score = 0;
	
	this.addScore = function(puntos) {
		this.score += puntos;
	};

	this.dibujarScore = function() {
		ctx.fillStyle = "white";
		ctx.font="24px StarWars";
		ctx.fillText("SC0RE: " + this.score, 100, canvas.height - 100);
	};
};