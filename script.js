var game;
$(document).ready(function() {
	var container = document.querySelector('#game-container');
	game = new Game({
		player: {
			yOffset: 50,
			width: 150,
			height: 50,
			sprite: 'res/paddle.gif'
		},
		catchable: {
			width: 50,
			height: 50,
			sprite: 'res/dick.gif'
		} 

	}, container);	

	requestAnimationFrame(update);
});
var lastTime;
function update(time) {
	var delta = (time - (lastTime || 0)) / 100;
	game.update(delta, time);

	lastTime = time;
	requestAnimationFrame(update);
}

function randomInt(max) {
	return Math.floor(Math.random() * max);
}