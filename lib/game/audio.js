ig.module(
	'game.audio'
)
.requires(
	//'impact.entity'
)
.defines(function(){
	SOUNDS = {
                bounceX: new ig.Sound( 'media/sounds/bounceX.*' ),
                bounceY: new ig.Sound( 'media/sounds/bounceY.*' ),
                bounceZ: new ig.Sound( 'media/sounds/bounceZ.*' ),
                hit: new ig.Sound( 'media/sounds/hit.*' ),
        };

        bounceArr = [SOUNDS.bounceZ, SOUNDS.bounceY];
        bounceSoundCounter = 0;
        bounceSoundTimer = new ig.Timer(.1);

        playNextBounce = function() {
                if (bounceSoundTimer.delta() >= 0) {
                        bounceSoundTimer.reset();
                        bounceArr[bounceSoundCounter].play();
                        bounceSoundCounter = (bounceSoundCounter+1)%2;
                }
        };

});