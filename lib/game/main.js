ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'game.levels.level',

	'game.entities.playerbrick',
	'game.entities.ball',
	'game.entities.swordsman',
	'game.entities.pikeman',
	'game.entities.miner',
	'game.entities.scorebox'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	score: [10,10],
	spawnTimers: [new ig.Timer(.25), new ig.Timer(.25)],
	gameOver: false,
	winner: -1,
	centers: [0,0],
	outer: [16, 304],
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.SHIFT, 'shift');

		
		ig.input.bind(ig.KEY.W, 'w');
		ig.input.bind(ig.KEY.S, 's');
		ig.input.bind(ig.KEY.D, 'd');
		ig.input.bind(ig.KEY.A, 'a');
		ig.input.bind(ig.KEY.SPACE, 'space');

		this.loadLevel(LevelLevel);

		for (var i = 0; i < 10; i++) {
			this.spawnEntity(EntityPlayerbrick, 0, 80+i*8, {input:{up:'w', down:'s'}, controller: 0});
			this.spawnEntity(EntityPlayerbrick, 8, 80+i*8, {input:{up:'w', down:'s'}, controller: 0});

			this.spawnEntity(EntityPlayerbrick, ig.system.width-8, 80+i*8, {input:{up:'up', down:'down'}, controller: 1});
			this.spawnEntity(EntityPlayerbrick, ig.system.width-16, 80+i*8, {input:{up:'up', down:'down'}, controller: 1});
		}

		this.spawnEntity(EntityBall, ig.system.width/2, ig.system.height/2);

		this.spawnEntity(EntityScorebox, 64, 8, {controller:0});
		this.spawnEntity(EntityScorebox, ig.system.width-64, 8, {controller:1});
		
	},

	checkGameOver: function() {
		if (this.score[0] >= 25) {
			this.gameOver = true;
			this.winner = 0;
			return;
		} else if (this.score[1] >= 25) {
			this.gameOver = true;
			this.winner = 1;
			return;
		}
		var bricks = ig.game.getEntitiesByType(EntityPaddlebrick);
		//players = [[],[]];
		var players = [0,0];
		for (var i = 0; i < bricks.length; i++) {
			players[bricks[i].controller]++;
		}

		if (players[0] == 0) {
			this.gameOver = true;
			this.winner = 1;
		} else if (players[1] == 0) {
			this.gameOver = true;
			this.winner = 0;
		}
	},

	paddleCenters: function() {
		var bricks = ig.game.getEntitiesByType(EntityPaddlebrick);
		//players = [[],[]];
		var top = [240,240];
		var bottom = [0,0];

		for (var i = 0; i < bricks.length; i++) {
			var c = bricks[i].controller;
			if (bricks[i].pos.y < top[c]) {
				top[c] = bricks[i].pos.y;
			}
			if (bricks[i].pos.y + 8 > bottom[c]) {
				bottom[c] = bricks[i].pos.y + 8;
			}
		}

		this.centers[0] = (bottom[0] + top[0])/2;
		this.centers[1] = (bottom[1] + top[1])/2;
	},
	
	update: function() {
		this.checkGameOver();
		if (!this.gameOver) {
			this.parent();
			
			this.paddleCenters();
			if (this.score[0] > 0) {
				if (ig.input.state('d') && this.spawnTimers[0].delta() >= 0) {
					this.spawnTimers[0].reset();
					this.spawnEntity(EntitySwordsman, 16, this.centers[0], {controller:0});
					this.score[0]--;
				}
				if (ig.input.state('a') && this.spawnTimers[0].delta() >= 0) {
					this.spawnTimers[0].reset();
					//this.spawnEntity(EntityPikeman, 16, this.centers[0] - 32, {controller:0});
					//this.spawnEntity(EntityPikeman, 16, this.centers[0] + 32, {controller:0});
					this.spawnEntity(EntityPikeman, 16, this.centers[0], {controller:0});
					this.score[0]--;
				}
				if (ig.input.state('space') && this.spawnTimers[0].delta() >= 0) {
					this.spawnTimers[0].reset();
					this.spawnEntity(EntityMiner, 16, this.centers[0], {controller:0});
					this.score[0]--;
				}
			}

			if (this.score[1] > 0) {
				if (ig.input.state('left') && this.spawnTimers[1].delta() >= 0) {
					this.spawnTimers[1].reset();
					this.spawnEntity(EntitySwordsman, ig.system.width-24, this.centers[1], {controller:1});
					this.score[1]--;
				}
				if (ig.input.state('right') && this.spawnTimers[1].delta() >= 0) {
					this.spawnTimers[1].reset();
					//this.spawnEntity(EntityPikeman, ig.system.width-24, this.centers[1] - 32, {controller:1});
					//this.spawnEntity(EntityPikeman, ig.system.width-24, this.centers[1] + 32, {controller:1});
					this.spawnEntity(EntityPikeman, ig.system.width-24, this.centers[1], {controller:1});
					this.score[1]--;
				}
				if (ig.input.state('shift') && this.spawnTimers[1].delta() >= 0) {
					this.spawnTimers[1].reset();
					this.spawnEntity(EntityMiner, ig.system.width-24, this.centers[1], {controller:1});
					this.score[1]--;
				}
			}
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		//var x = ig.system.width/2,
		//	y = ig.system.height/2;
		
		//this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
		this.font.draw(("0"+this.score[0]).slice(-2), 64, 8, ig.Font.ALIGN.CENTER);
		this.font.draw(("0"+this.score[1]).slice(-2), ig.system.width-64, 8, ig.Font.ALIGN.CENTER);

		if (this.gameOver) {
			this.font.draw("Player " + this.winner + " Wins!", ig.system.width/2, ig.system.height/2, ig.Font.ALIGN.CENTER);
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
