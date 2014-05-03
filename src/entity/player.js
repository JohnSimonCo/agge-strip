function Player() {
	var options = game.options.player;
	Entity.call(this, 0, game.level.height - options.yOffset, options, 'player');
}

$.extend(Player.prototype, Entity.prototype, {
	update: function() {
		this.x = game.mouse.x;
		this.fitToBoundsX(game.level);
		this.renderer.updatePosition();
	}
});