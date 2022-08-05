ig.module(
	'game.entities.miner'
)
.requires(
	'game.entities.soldier'
)
.defines(function(){
	EntityMiner = EntitySoldier.extend({
        animSheet: new ig.AnimationSheet('media/sprites/ax.png', 8, 8),
        miner: true,
        health: 25,
        enemyBox: null,

        init: function(x, y, settings) {
        	this.parent(x, y, settings);
        	var boxes = ig.game.getEntitiesByType(EntityScorebox);
        	if (boxes[0].controller == this.opponent)
        		this.enemyBox = boxes[0];
        	else
        		this.enemyBox = boxes[1];
        	//this.target = this.enemyBox;
        	this.chooseTarget();
        	this.walkToTarget();
        },

        chooseTarget: function() {
        	this.target = this.enemyBox;
        	this.state = "walk";
        	this.currentAnim = this.anims.walk;
        },

        update: function() {
        	if (this.state == "walk") {
        		if (this.target === null || this.target._killed || this.target.health == 0) {
        			this.chooseTarget();
        		} else {
        			this.walkToTarget();
				}
        	} else if (this.state == "attack") {
        		if (ig.game.score[this.opponent] == 0) {
        			this.kill();
        		}
				if (!this.collided || this.target._killed) {
					this.chooseTarget();
				}
			}
			this.parent();
        }

    });
});