function Catchable(x, y, w, h, game, sprite) {
	Entity.call(this, x, y, w, h, game, sprite, 'catchable');
}
$.extend(Catchable.prototype, Entity.prototype, {
	init: function(level) {
		this.fitToBoundsX(level);
	},
	update: function(level, delta) {
		this.move(0, Catchable.speed, delta, level);
	},
	move: function(xDiff, yDiff, delta, level) {
		Entity.prototype.move.call(this, xDiff, yDiff, delta);
		if (level.player.getRekt().intersects(this.getRekt())) {
			this.game.caught();
			this.die(level);
		} else if (this.outOfBounds(level)) {
			this.game.missed();
			this.die(level);
		}
	},
	outOfBounds: function(level) {
		return this.y > level.height - this.h / 2;
	},
	die: function(level) {
		Entity.prototype.die.call(this, level);
		for(var i = 0; i < Math.PI * 2; i += Math.PI / 20) {
			level.addEntity(new Particle(this.x, this.y, 10, 10, this.game, 'res/spinning-dick.gif', Math.cos(i) * 10, Math.sin(i) * 10));
		}
	}
});
Catchable.speed = 20;