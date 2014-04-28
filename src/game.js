function Game(options) {
	this.options = options;
	this.$container = $('#game-container');
	this.hoverTarget = document.querySelector('#hover-target');
	this.$score = $('#score'); 
	this.score = 0;

	$(this.hoverTarget)
		.width(this.$container.width())
		.height(this.$container.height())
		.css(this.$container.offset());

	var inputManager = new InputManager({
		mousemove: {
			event: 'move'
		}
	});

	var self = this;
	this.mouse = {};
	inputManager.on('move', function(data) {
		if(data.target == self.hoverTarget) {
			self.mouse.x = data.x;
			self.mouse.y = data.y;
		}
	});

	this.pseudo = new PseudoRandom(0.008, 1.05);

	var playerOptions = options.player, width = this.$container.width(), height = this.$container.height(),
	player = new Player(width / 2, height - playerOptions.yOffset,
		playerOptions.width, playerOptions.height, this, playerOptions.sprite);
	
	this.level = new Level(width, height, player);
}
Game.prototype = {
	update: function(delta, time) {
		if(Math.random() < this.pseudo.get()) {
			this.pseudo.succes();
			this.level.addEntity(this._createCathable());
		} else this.pseudo.fail();
		
		this.level.update(delta);
	},
	caught: function() {
		this.$score.text((this.score += 10));
	},
	missed: function() {
		this.$score.text((this.score = 0));
	},
	_createCathable: function() {
		var catchableOptions = this.options.catchable;
		return new Catchable(randomInt(this.level.width), -catchableOptions.width / 2,
			catchableOptions.width, catchableOptions.height, this, catchableOptions.sprite);
	}
};
/*
{
	player: {
		sprite: 'bla bla',
		width: 1
		height: 1,
		y: 10
	}
}
*/