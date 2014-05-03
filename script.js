$(document).ready(function() {
	var container = document.querySelector('#game-container');
	window.game = new Game({
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
		},
		stages: [
			{
				model: 'aggedressed.jpg',
				maxSpeed: 10,
				minSpeed: 20
			},
			{
				score: 50,
				model: 'aggenoshirt.jpg',
				maxSpeed: 15,
				minSpeed: 25
			},
			{
				score: 100,
				model: 'aggeunderpants.jpg',
				maxSpeed: 20,
				minSpeed: 30
			},
			{
				score: 150,
				model: 'aggenude.jpg',
				maxSpeed: 25,
				minSpeed: 35
			}
		]

	}, container);
	game.init();

	requestAnimationFrame(update);
});
var lastTime;
function update(time) {
	var delta = (time - (lastTime || 0)) / 100;
	game.update(delta, time);

	lastTime = time;
	requestAnimationFrame(update);
}