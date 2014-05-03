function Entity(x, y, options, customClass) {
	this.x = x;
	this.y = y;
	this.w = options.width;
	this.h = options.height;
	this.sprite = options.sprite;

	this.renderer = new HtmlRenderer(this, customClass);
}

Entity.prototype = {
	update: function() {

	},
	move: function(xDiff, yDiff) {
		this.x += xDiff * game.deltaT;
		this.y += yDiff * game.deltaT;

		this.renderer.updatePosition();
	},
	getRekt: function() {
		var hw = this.w/2, hh = this.h/2;
		return new Rect(this.x - hw, this.y - hh, this.x + hw, this.y + hh);
	},
	die: function() {
		game.level.removeEntity(this);
		this.renderer.die();
	},
	fitToBoundsX: function() {
		var xBoundsLeft = this.w / 2, xBoundsRight = game.level.width - this.w / 2;
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