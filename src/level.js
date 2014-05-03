function Level(width, height) {
	this.width = width;
	this.height = height;

	this.entities = [];
	this.actions = [];

	this.pseudo = new PseudoRandom(0.008, 1.05);
}

Level.prototype = {
	init: function() {
		this.player = new Player();
		this.entities.push(this.player);
	},
	update: function(delta, time) {
		var self = this;
		this.updating = true;

		if(Math.random() < this.pseudo.get()) {
			this.pseudo.succes();
			this.entities.push(new Catchable(Math.randomInt(this.width), game.getSpeed()));
		} else this.pseudo.fail();
	
		this.entities.forEach(function(entity) {
			entity.update();
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
	},
	killEntities: function(/*type1, ..., typeN*/) {
		var args = arguments;
		this.entities.forEach(function(entity) {
			var kill = args.length <= 0, i = -1;
			while(!kill && ++i < args.length) {
				kill = kill || entity instanceof args[i];
			}
			if(kill) entity.die();
		});
	}
}
