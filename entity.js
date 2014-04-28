function Entity(x, y, w, h, game, sprite, customClass) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.game = game;
	this.sprite = sprite;

	this.renderer = new HtmlRenderer(this, game.$container, customClass);
}

Entity.prototype = {
	init: function(level) {

	},
	update: function(level, delta, time) {

	},
	move: function(xDiff, yDiff, delta) {
		this.x += xDiff * delta;
		this.y += yDiff * delta;

		this.renderer.updatePosition();
	},
	getRekt: function() {
		var hw = this.w/2, hh = this.h/2;
		return new Rect(this.x - hw, this.y - hh, this.x + hw, this.y + hh);
	},
	die: function(level) {
		level.removeEntity(this);
		this.renderer.die();
	},
	fitToBoundsX: function(level) {
		var xBoundsLeft = this.w / 2, xBoundsRight = level.width - this.w / 2;
		if(this.x < xBoundsLeft) this.x = xBoundsLeft;
		else if(this.x > xBoundsRight) this.x = xBoundsRight;
	}
};

function Rect(x0, y0, x1, y1) {
	this.x0 = x0;
	this.y0 = y0;
	this.x1 = x1;
	this.y1 = y1;

	this.intersects = function(o) {
		return !(o.x0 >= x1 || o.y0 >= y1 || o.x1 <= x0 || o.y1 <= y0); 
	}
}