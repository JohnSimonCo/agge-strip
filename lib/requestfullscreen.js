(function() {
	var fn;
	$(document).ready(function() {
		var body = document.querySelector('body');
		fn = body.requestFullscreen ||
			body.webkitRequestFullscreen ||
			body.mozRequestFullScreen ||
			body.msRequestFullscreen;
	});
	window.requestFullscreen = function(element) {
		fn.call(element);
	};
})()
