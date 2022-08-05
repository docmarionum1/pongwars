ig.module(
	'game.entities.pikeman'
)
.requires(
	'game.entities.soldier'
)
.defines(function(){
	EntityPikeman = EntitySoldier.extend({
        animSheet: new ig.AnimationSheet('media/sprites/pike.png', 8, 8),
        pikeman: true,
        health: 75,
        state: "defend",

        init: function(x, y, settings) {
        	this.parent(x, y, settings);
        	this.chooseTarget();

        },

        chooseTarget: function() {
			soldiers = ig.game.getEntitiesByType(EntitySoldier);

			enemies = [];
			for (var i = 0; i < soldiers.length; i++) {
				if (soldiers[i].controller == this.opponent) {
					if ((this.controller == 0 && soldiers[i].pos.x < ig.system.width/2) ||
						(this.controller == 1 && soldiers[i].pos.x > ig.system.width/2)) {
						enemies.push(soldiers[i]);
					}
				}
			}
			//console.log(enemies);
			if (enemies.length > 0) {
				this.target = enemies[Math.floor((Math.random()*enemies.length))];
				this.state = "walk";
				this.currentAnim = this.anims.walk;
			} else {
				this.target = null;
				this.state = "defend";
				this.currentAnim = this.anims.idle;
				this.vel.x = 0; this.vel.y = 0;
			}
        },

        update: function() {
        	if (this.state == "defend") {
        		this.chooseTarget();
        	} else if (this.state == "walk") {
        		if (this.target === null || this.target._killed || this.target.health == 0) {
        			this.chooseTarget();
        		} else {
        			this.walkToTarget();
				}
        	} else if (this.state == "attack") {
				if (!this.collided || this.target._killed) {
					this.chooseTarget();
				}
			}
        	this.parent();
        }
    });
});