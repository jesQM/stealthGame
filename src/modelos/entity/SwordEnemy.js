class SwordEnemy extends Enemy {
    constructor(x ,y){
        super(pictures.enemyW0, x, y);

        this.weapon = new EnemySwordWeapon(this);
    }

    actualizar() {
        super.actualizar();
        this.weapon.actualizar();

        if ( this.followState == enemyFollowStates.followPlayer && gameLayer.player.stealthState != stealthStates.hidden ) {
            this.weapon.trigger();
        }

        this.manageMovement();
    }

    manageMovement() {

        // FOLLOW STATE
        if ( gameLayer.player.stealthState != stealthStates.hidden && this.visionArea.colisiona(gameLayer.player) && !this.isWallBlocking()){ // if we see the player
            gameLayer.player.setStealthState( stealthStates.seen );
            gameLayer.player.seenBy.push(this);

            if (this.followState != enemyFollowStates.followPlayer) { // and we are not following it => follow it
                if (this.movementStrategy.status != movementStrategyStatus.finished) {
                    this.movementStrategy.finishStrategy();
                    this.interruptedMovementStates.push(this.followState);
                    this.interruptedMovementStrategy.push(this.movementStrategy);
                }
                this.movementStrategy = new FollowPlayerMovement(this);
                this.followState = enemyFollowStates.followPlayer;
            } else {

                // If we see the player we run to its position
                this.movementStrategy.targetX = gameLayer.player.x;
                this.movementStrategy.targetY = gameLayer.player.y;
                this.movementStrategy.runTimer = true;
            }

        } else { // if we dont see the player

            if (this.followState == enemyFollowStates.followPlayer) {
                this.movementStrategy.runTimer = false; // if we were following the player, the strategy was FollowThePlayer, this makes it to stop tracking

                for (var i = 0; i<gameLayer.player.seenBy.length; i++)
                { // we remove ourselves from the "we see player" list
                    if (gameLayer.player.seenBy[i] == this) {
                        gameLayer.player.seenBy.splice(i,1);
                        i--;
                    }
                }
            }
        }

        super.manageMovement();
    }

    setToPatrol( arrayOfWaypoints ){
        //for (let i = 0; i < arrayOfWaypoints.length; i++)
        //    this.waypoints.push( arrayOfWaypoints[i] );

        this.waypoints = arrayOfWaypoints;
        this.movementStrategy = new PatrolMovement(this);
        this.movementStrategy.orientationOfEntity = orientations.up;
        this.followState = enemyFollowStates.patrol;
    }
}