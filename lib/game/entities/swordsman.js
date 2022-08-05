ig.module(
	'game.entities.swordsman'
)
.requires(
	'game.entities.soldier'
)
.defines(function(){
	EntitySwordsman = EntitySoldier.extend({
        animSheet: new ig.AnimationSheet('media/sprites/sword.png', 8, 8),
        swordsman: true,
        passedOuter: false,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			//Choose a personality (ie target paddle vs target units)
			this.personality = 0; //Paddle

			this.chooseTarget();
		},

		/*chooseTarget: function() {
			bricks = ig.game.getEntitiesByType(EntityPaddlebrick);

			enemies = [];
			for (var i = 0; i < bricks.length; i++) {
				if (bricks[i].controller == this.opponent) {
					enemies.push(bricks[i]);
				}
			}
			//console.log(enemies);
			this.target = enemies[Math.floor((Math.random()*enemies.length))];
		},*/

		update: function() {
			//Choose a new enemy if current is dead
			if (this.target.health == 0) {
				this.chooseTarget();
				this.state = "walk";
				this.currentAnim = this.anims.walk;
			}
			if (this.state == "walk") {
				this.curAngle = this.normalizeAngle(this.angleTo(this.target));
				this.setVelocity();
			} else if (this.state == "attack") {
				if (!this.collided) {
					this.state = "walk";
					this.currentAnim = this.anims.walk;
				}
			}

			if (this.controller == 0) {
				if (this.pos.x + 8 > ig.game.outer[1] && !this.passedOuter) {
					if (Math.abs(this.pos.y - ig.game.centers[1]) < 36) {
						this.passedOuter = true;
					} else {
						this.pos.x = ig.game.outer[1] - 8;
					}
				}
			} else if (this.controller == 1) {
				if (this.pos.x < ig.game.outer[0] && !this.passedOuter) {
					if (Math.abs(this.pos.y - ig.game.centers[0]) < 36) {
						this.passedOuter = true;
					} else {
						this.pos.x = ig.game.outer[0];
					}
				}
			}

			this.parent();
		},

        collideWith: function(other, axis) {
        	//console.log(other);
        	//this.collided = true;
        	this.parent(other, axis);
        	/*
        	if (axis == "x") {
	        	if (this.state == "walk") {
		        	if ((other.paddle || other.soldier) && other.controller == this.opponent) {
		        		this.target = other;
		        		this.state = "attack";
		        		this.currentAnim = this.anims.attack;
		        		
		        		if (this.controller == 0) {
		        			this.vel.x = 1; this.vel.y = 0;
		        		} else {
		        			this.vel.x = -1; this.vel.y = 0;
		        		}
		        	}
	        	} else if (this.state == "attack") {
	        		if ((other.paddle || other.soldier) && other.controller == this.opponent) {
	        			this.target = other;
		        		other.receiveDamage(1, this);

		        		if (this.controller == 0) {
		        			this.vel.x = 1;
		        		} else {
		        			this.vel.x = -1;
		        		}      		

		        		if (other.health == 0) {
			        		this.chooseTarget();
			        		this.state = "walk";
			        		this.currentAnim = this.anims.walk;
			        	}
		        	}
	        	}
	        } else {
	        	if (other.paddle) {
	        		this.receiveDamage(1, other);
	        	}
	        }
	        */
        }
		
	});
});