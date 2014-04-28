function Particle(x, y, w, h, game, sprite, xd, yd) {
	Entity.call(this, x, y, w, h, game, sprite, 'particle');
	this.xd = xd;
	this.yd = yd;
	this.startTime = Date.now();
}

$.extend(Particle.prototype, Entity.prototype, {
	update: function(level, delta, time) {
		this.move(this.xd, this.yd, delta);
		if(Date.now() - this.startTime > 1000) {
			this.die(level);
		}
	}
});