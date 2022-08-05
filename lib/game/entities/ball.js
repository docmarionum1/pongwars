ig.module(
	'game.entities.ball'
)
.requires(
	'impact.entity',
	'game.audio'
)
.defines(function(){
	EntityBall = ig.Entity.extend({
		size: {x: 8, y: 8},
        collides: ig.Entity.COLLIDES.LITE,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/sprites/square.png', 8, 8),
        velSqr: 256*256,
        maxVel: {x: 256, y: 256},
        vel: {x: 182, y: 182},
        currentVel: {x: 0, y: 0},
        ball: true,
        opponent: -1,

        /*setVelX: function(vel) {
        	this.vel2.x = vel;
        	this.vel.x = vel;
        },

        setVelY: function(vel) {
        	this.vel2.y = vel;
        	this.vel.y = vel;
        },

        reverseVelX: function() {
        	this.setVelX(-this.vel2.x);
        },

        reverseVelY: function() {
        	this.setVelY(-this.vel2.y);
        },*/

        init: function(x, y, settings) {
        	this.parent(x, y, settings);
        	this.addAnim('white', 1, [0]);
        	this.addAnim('pink', 1, [1]);
        	//this.vel.y = 256;
        	//this.vel.x = 256;
        	//this.setVelX(256);
        	//this.setVelY(256);
        },

        update: function() {
        	this.currentVel = {x: this.vel.x, y: this.vel.y};
        	if (this.pos.y + this.size.y >= ig.system.height) {
        		this.pos.y = ig.system.height - 8;
        		this.vel.y = -this.vel.y;
        		//this.reverseVelY();
        		//SOUNDS.bounceY.play();
	        	playNextBounce();
        	} else if (this.pos.y <= 0) {
        		this.vel.y = -this.vel.y;
        		this.pos.y = 0;
        		//this.reverseVelY();
        		//SOUNDS.bounceY.play();
	        	playNextBounce();
        	}

        	if (this.pos.x + this.size.x >= ig.system.width) {
        		this.vel.x = -this.vel.x;
        		this.pos.x = ig.system.width - 8;
        		ig.game.score[0]++;
	        	playNextBounce();
        		//this.reverseVelX();
        	} else if (this.pos.x <= 0) {
        		this.vel.x = -this.vel.x;
        		this.pos.x = 0;
        		ig.game.score[1]++;
	        	playNextBounce();
        		//this.reverseVelX();
        	}

        	//currentVel = {x: this.vel.x, y: this.vel.y};

        	this.parent();
        },

        collideWith: function(other, axis) {
        	//console.log(this.vel);
        	//console.log(this.currentVel);
        	//console.log("HI");
        	//console.log(axis);
        	//this.vel.x = 256;//-this.vel.x;
        	//this.reverseVelX();
        	if (axis == "x") {
        		var i = this.pos.x < ig.system.width/2 ? 0 : 1;
        		var mul = Math.abs(this.pos.y - ig.game.centers[i])/48;
        		
        		this.vel.y = (this.currentVel.y > 0 ? 1 : -1)*Math.round(256*mul);
        		if (Math.abs(this.vel.y) > 222) {
        			this.vel.y = (this.vel.y > 0 ? 1 : -1)*222;
        		}
        		//console.log(this.vel.y);
        		this.vel.x = (this.currentVel.x > 0 ? -1 : 1)*Math.sqrt(this.velSqr-this.vel.y*this.vel.y);

        		//this.vel.x = -this.currentVel.x;
        	} else {
        		this.vel.y = -this.currentVel.y;
        	}

        	this.controller = other.controller;
        	this.opponent = (this.controller+1)%2;
        	if (other.controller == 0) {
        		this.currentAnim = this.anims.white;
        	} else {
        		this.currentAnim = this.anims.pink;
        	}

        	//SOUNDS.bounceX.play();
        	playNextBounce();

        	/*if (other.soldier) {
        		other.kill();
    		}*/
        }, 

        check: function(other) {
        	//console.log("HI2");
        	//this.vel.x = -this.vel.x;
        	if (other.soldier && other.controller == this.opponent) {
        		other.kill();
        		SOUNDS.hit.play();
        	}
        }
	});
});