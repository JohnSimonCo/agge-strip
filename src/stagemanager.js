function StageManager(stages) {
	this.stages = stages;
	this.setStage(0);
}
StageManager.prototype = {
	updateStage: function(score) {
		if(score > 0 && !this.islastStage) {
			if(score >= this.nextStage.score) {
				this.setStage(this.currentIndex + 1);
			}
		} else if(score <= 0) {
			this.setStage(0);
			game.level.killEntities(Catchable);
		}
	},
	setStage: function(stage) {
		console.log(stage);
		this.currentStage = this.stages[stage];
		this.currentIndex = stage;

		this.islastStage = stage >= this.stages.length - 1;

		this.nextStage = this.islastStage
		? this.currentStage
		: this.stages[stage + 1];
	},
	getOption: function(option) {
		return this.currentStage[option];
	}
};