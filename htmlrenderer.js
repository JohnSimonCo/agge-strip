function HtmlRenderer(entity, $container, entityClass) {
	this.entity = entity;
	this.$container = $container;
	this.element = document.createElement('img');
	$container.append(this.element);

	this.element.src = entity.sprite;
	this.$element = $(this.element)
		.addClass('sprite').addClass(entityClass);
	this.updatePosition();
}
HtmlRenderer.prototype = {
	updatePosition: function() {
		this.$element.css({
			left: this.entity.x - this.entity.w / 2,
			top: this.entity.y - this.entity.h / 2
		});
	},
	die: function() {
		this.$element.remove();
	}
};