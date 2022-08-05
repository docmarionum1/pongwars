ig.module(
	'game.entities.enemybrick'
)
.requires(
	'game.entities.paddlebrick'
)
.defines(function(){
	EntityEnemybrick = EntityPaddlebrick.extend({
		update: function() {
			/*
			if (ig.input.state('up')) {
				this.vel.y = -this.velocity;
			} else if (ig.input.state('down')) {
				this.vel.y = this.velocity;
			} else {
				this.vel.y = 0;
			}
			*/

			this.parent();
		}
	});
});