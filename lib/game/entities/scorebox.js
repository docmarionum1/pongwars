ig.module(
	'game.entities.scorebox'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityScorebox = ig.Entity.extend({
		size: {x:28, y:15},
		collides: ig.Entity.COLLIDES.FIXED,
        animSheet: new ig.AnimationSheet('media/sprites/scorebox.png', 28, 15),
        scorebox: true,
        health: 9000,
 
        init: function(x, y, settings) {
        	//this.addAnim('idle', 1, [0]);
        	this.parent(x,y,settings);
        	this.opponent = (this.controller+1)%2;
        },

        update: function() {
        	if (this.controller == 0) {
        		var w = ig.game.font.widthForString(("0"+ig.game.score[0]).slice(-2));//, 64, 8, ig.Font.ALIGN.CENTER);
				this.size.x = w;
				this.pos.x = 64 - w/2;
        	} else if (this.controller == 1) {
        		var w = ig.game.font.widthForString(("0"+ig.game.score[1]).slice(-2));//, 64, 8, ig.Font.ALIGN.CENTER);
				this.size.x = w;
				this.pos.x = (ig.system.width - 64) - w/2;
        	}

        	if (this.health <= 8900) {
        		this.health += 100;

        		if (ig.game.score[this.controller] > 0) {
        			ig.game.score[this.controller]--;
        			ig.game.score[this.opponent]++;
        		}
        	}
        }


    });
});