ig.module(
	'game.entities.paddlebrick'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPaddlebrick = ig.Entity.extend({
		size: {x: 8, y: 8},
        collides: ig.Entity.COLLIDES.FIXED,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet('media/sprites/square.png', 8, 8),
        health: 50,
        maxVel: {x: 0, y: 200},
        velocity: 128,
        controller: -1,
        paddle: true,

        init: function(x, y, settings) {
        	this.parent(x, y, settings);
        	//this.addAnim('idle', 1, [0]);

        }
	});
});