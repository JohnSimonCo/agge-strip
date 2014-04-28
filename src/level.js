function Level(width, height, player) {
	this.width = width;
	this.height = height;

	this.player = player;
	this.entities = [player];
	this.actions = [];

	player.init(this);
}

Level.prototype = {
	update: function(delta, time) {
		var self = this;
		this.updating = true;
	
		this.entities.forEach(function(entity) {
			entity.update(self, delta);
		});
		while(this.actions.length > 0) {
			this.actions.pop().call(this, this.entities);
		}
		this.updating = false;
	},

	_action: function(action) {
		if(this.updating) this.actions.push(action);
		else action.call(this, this.entities);
	},
	addEntity: function(entity) {
		this._action(this._addEntity(entity));
	},
	_addEntity: function(entity) {
		return function(entities) {
			entities.push(entity);
			entity.init(this);
		}
	},
	removeEntity: function(entity) {
		this._action(this._removeEntity(entity));
	},
	_removeEntity: function(entity) {
		return function(entities) {
			var index = entities.indexOf(entity);
			if(index !== -1) entities.splice(index, 1);		
		}
	}
}
