var $canvas, canvas, ctx, inputManager,
	input = {left: false, right: false},
	mouse = {};

$(document).ready(function() {
	$canvas = $('#game-canvas');
	canvas = $canvas[0];
	ctx = canvas.getContext('2d');

	inputManager = new InputManager({
		keydown: {
			37: {
				event: 'move',
				data: {dir: 'left', state: true},
				prevent: true
			},
			39: {
				event: 'move',
				data: {dir: 'right', state: true},
				prevent: true
			}
		},
		keyup: {
			37: {
				event: 'move',
				data: {dir: 'left', state: false}
			},
			39: {
				event: 'move',
				data: {dir: 'right', state: false}
			}
		}
	});
	inputManager.on('move', function(data) {
		input[data.dir] = data.state;
	});

	inputManager.on('move', function(data) {
		mouse.x = data.x;
		mouse.y = data.y;
	});

	requestAnimationFrame(update);
});

var player = {
	x: 20,
	y: 20,
	r: 10,
	moveSpeed: 25
},
obstacles = [];

var lastTime;
function update(time) {
	var delta = (time - (lastTime || 0)) / 100;

	var deltaSpeed = player.moveSpeed * delta;
	if(input.left) player.x -= deltaSpeed;
	if(input.right) player.x += deltaSpeed;
	
	render();
	lastTime = time;
	requestAnimationFrame(update);
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var half = player.r/2;
	ctx.fillRect(player.x - half, player.y - half, player.r, player.r);
}

function Obstacle(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
}
Obstacle.prototype = {
	render: function(ctx) {
		var half = this.r/2;
		ctx.fillRect(this.x - half, this.y - half, this.r, this.r);		
	}
};