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
			event: 'mousemove'
		}
	});

	var self = this;
	this.mouse = {};
	inputManager.on('mousemove', function(data) {
		if(data.target == self.hoverTarget) {
			self.mouse.x = data.x;
			self.mouse.y = data.y;
		}
	});
}
Game.prototype = {
	init: function() {
		this.level = new Level(this.$container.width(), this.$container.height());
		this.level.init();

		this.stageManager = new StageManager(this.options.stages);
	},
	update: function(delta, timeStamp) {
		this.deltaT = delta;
		this.time = timeStamp;
		this.level.update(delta);
	},
	caught: function() {
		this.score += 10;
		this.stageManager.updateStage(this.score);
		this.$score.text(this.score);
	},
	missed: function() {
		this.score = 0;
		this.stageManager.updateStage(this.score);
		this.$score.text(this.score);
	},
	getSpeed: function() {
		return Math.randomInt(this.stageManager.getOption('maxSpeed'),
					   this.stageManager.getOption('minSpeed'));
	}
};