function Player(x, y, w, h, game, sprite) {
	Entity.call(this, x, y, w, h, game, sprite, 'player');
}

$.extend(Player.prototype, Entity.prototype, {
	update: function(level, delta) {
		this.x = this.game.mouse.x;
		this.fitToBoundsX(level);
		this.renderer.updatePosition();
	}
});