ig.module(
	'game.entities.playerbrick'
)
.requires(
	'game.entities.paddlebrick'
)
.defines(function(){
	EntityPlayerbrick = EntityPaddlebrick.extend({
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim('idle', 1, [this.controller]);
		},
		
		update: function() {
			if (ig.input.state(this.input.up)) {
				this.vel.y = -this.velocity;
			} else if (ig.input.state(this.input.down)) {
				this.vel.y = this.velocity;
			} else {
				this.vel.y = 0;
			}

			this.parent();
		}
	});
});