$.extend(Math, {
	randomInt: function(max, min) {
		min = min || 0;
		var delta = max - min;
		return Math.floor(Math.random() * delta) + min;
	}
});