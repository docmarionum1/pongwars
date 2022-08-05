ig.module(
	'game.entities.soldier'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntitySoldier = ig.Entity.extend({
		size: {x: 8, y: 8},
        //collides: ig.Entity.COLLIDES.ACTIVE,
        collides: ig.Entity.COLLIDES.FIXED,
        type: ig.Entity.TYPE.A,
        //animSheet: new ig.AnimationSheet('media/sprites/sword.png', 8, 8),
        controller: -1,
        velocity: 48,
        target: null,
        curAngle: 0,
        state: "walk",
        //swordsman: true,
        soldier: true,
        health: 50,
        collided: false,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			/*this.addAnim('idle', 1, [0]);
			this.addAnim('walk', .1, [1,2]);
			this.addAnim('attack', .2, [0, 3]);*/

			this.addAnim('idle', 1, [this.controller*4]);
			this.addAnim('walk', .1, [this.controller*4+1,this.controller*4+2]);
			this.addAnim('attack', .2, [this.controller*4, this.controller*4+3]);

			//this.currentAnim = this.anims.attack;

			this.currentAnim = this.anims.walk;
			//this.vel.x = this.velocity;
			//this.vel.y = Math.floor((Math.random()*2)-1)*this.velocity;

			//this.parent(x, y, settings);

			if (this.controller == 1) {
				this.anims.idle.flip.x = true;
				this.anims.walk.flip.x = true;
				this.anims.attack.flip.x = true;
			}

			this.opponent = (this.controller+1)%2;

			//Choose a personality (ie target paddle vs target units)
			//this.personality = 0; //Paddle

			//this.chooseTarget();
		},

		chooseTarget: function() {
			bricks = ig.game.getEntitiesByType(EntityPaddlebrick);

			enemies = [];
			for (var i = 0; i < bricks.length; i++) {
				if (bricks[i].controller == this.opponent) {
					enemies.push(bricks[i]);
				}
			}
			//console.log(enemies);
			this.target = enemies[Math.floor((Math.random()*enemies.length))];
		},

		update: function() {
			this.collided = false;
			if (this.pos.y + this.size.y >= ig.system.height) {
        		this.pos.y = ig.system.height - 8;
        		this.vel.y = -this.vel.y;
        	} else if (this.pos.y <= 0) {
        		this.vel.y = -this.vel.y;
        		this.pos.y = 0;
        	}
			this.parent();
		},

		setVelocity: function(velocity) {
			velocity = typeof velocity !== 'undefined' ? velocity : this.velocity;
            this.vel.x = Math.ceil(Math.cos(this.curAngle)*velocity);
            this.vel.y = Math.ceil(Math.sin(this.curAngle)*velocity);
        },

		normalizeAngle: function(rad) {
                rad = rad % (2*Math.PI);
                return rad >= 0 ? rad : rad + 2*Math.PI;
        },

        walkToTarget: function(velocity) {
        	velocity = typeof velocity !== 'undefined' ? velocity : this.velocity;
        	//this.curAngle = this.normalizeAngle(this.angleTo(this.target));
        	this.curAngle = this.angleTo(this.target);
			this.setVelocity(velocity);
        },

        collideWith: function(other, axis) {
        	//console.log(other);
        	//console.log(other);
        	this.collided = true;
        	if (axis == "y" && other.paddle && other.vel.y != 0) {
        		this.receiveDamage(1, other);
        	} else {
	        	if (this.state == "walk") {
		        	if ((other.paddle || other.soldier || other.scorebox) && other.controller == this.opponent) {
		        		this.target = other;
		        		this.state = "attack";
		        		this.currentAnim = this.anims.attack;
		        		//this.vel.x = 0; this.vel.y = 0;
		        		this.walkToTarget(4);
		        	}
	        	} else if (this.state == "attack") {
	        		//console.log(this);
	        		if ((other.paddle || other.soldier || other.scorebox) && other.controller == this.opponent) {
	        			this.target = other;
		        		other.receiveDamage(1, this);

		        		if (other._killed) {
			        		this.chooseTarget();
			        		this.state = "walk";
			        		this.currentAnim = this.anims.walk;
			        	} else {
			        		this.walkToTarget(4);
			        	}
		        	}
	        	}
	        }
	        this.parent();
        }
		/*
		update: function() {
			if (ig.input.state(this.input.up)) {
				this.vel.y = -this.velocity;
			} else if (ig.input.state(this.input.down)) {
				this.vel.y = this.velocity;
			} else {
				this.vel.y = 0;
			}

			this.parent();
		}*/
	});
});