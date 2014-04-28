function PseudoRandom(constant, multiplyer) {
	this.const = constant;
	this.mult = multiplyer;
	this.prob = constant;
}
PseudoRandom.prototype = {
	get: function() {
		return this.prob;
	},
	succes: function() {
		this.prob = this.const;
	},
	fail: function() {
		this.prob *= this.mult;
	}
};