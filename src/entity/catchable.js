function Catchable(x, speed) {
	var options = game.options.catchable;
	Entity.call(this, x, -options.height/2, options, 'catchable');
	this.speed = speed;
	this.fitToBoundsX();
}
$.extend(Catchable.prototype, Entity.prototype, {
	update: function() {
		this.move(0, this.speed);
	},
	move: function(xDiff, yDiff) {
		Entity.prototype.move.call(this, xDiff, yDiff);
		if (game.level.player.getRekt().intersects(this.getRekt())) {
			game.caught();
			this.die();
		} else if (this.outOfBounds()) {
			game.missed();
			this.die();
		}
	},
	outOfBounds: function() {
		return this.y > game.level.height - this.h / 2;
	},
	die: function() {
		Entity.prototype.die.call(this);
	}
});