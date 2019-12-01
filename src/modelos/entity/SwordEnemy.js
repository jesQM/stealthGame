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


        if (this.movementStrategy.status == movementStrategyStatus.finished) {
            switch ( this.followState ) {
                case enemyFollowStates.patrol:
                    this.movementStrategy.resetPatrol(); // so when we have a patrol, we can start it again
                    break;

                case enemyFollowStates.lookAround:
                    this.movementStrategy = new TraceBackStepsMovement(this);
                    this.followState = enemyFollowStates.traceStepsBack;
                    break;

                case enemyFollowStates.traceStepsBack:
                    this.movementStrategy = this.interruptedMovementStrategy.pop();
                    this.followState = this.interruptedMovementStates.pop();
                    break;

                case enemyFollowStates.followPlayer:
                    this.movementStrategy = new LookAroundMovement(this);
                    this.followState = enemyFollowStates.lookAround;
                    break;
            }
        }
    }

    isWallBlocking() {
        //console.log("is blocking?");
        let playerX = gameLayer.player.x;
        let playerY = gameLayer.player.y;

        let bot = this.y+this.alto/2;
        let top = this.y-this.alto/2;
        let right = this.x+this.ancho/2;
        let left = this.x-this.ancho/2;

        let botP = playerY+gameLayer.player.alto/2;
        let topP = playerY-gameLayer.player.alto/2;
        let rightP = playerX+gameLayer.player.ancho/2;
        let leftP = playerX-gameLayer.player.ancho/2;

        let bloques = gameLayer.espacio.estaticos;
        for (var i = 0; i < bloques.length; i++){ // for all walls
            if ( this.visionArea.colisiona(bloques[i]) ){ // if they are inside my vision

                let Ebot = bloques[i].y+bloques[i].alto/2;
                let Etop = bloques[i].y-bloques[i].alto/2;
                let Eright = bloques[i].x+bloques[i].ancho/2;
                let Eleft = bloques[i].x-bloques[i].ancho/2;
                /* Caso del comentario:
                       P _
                        |_|
                            E
                 */
                if (
                    (( Etop < top && Eleft < left   &&   botP < Ebot && Eright > rightP ) || // Caso del comentario
                    ( Etop < top && Eright > right &&   botP < Ebot && Eleft < leftP ) || // P en top derecha
                    ( Ebot > bot && Eright > right &&   topP > Etop && Eleft < leftP ) || // P en bot derecha
                    ( Ebot > bot && Eleft < left   &&   topP > Etop && Eright > rightP ))
                ) {
                    // something blocks
                    //console.log("tapado");
                    return true;
                }
            }
        }

        return false;
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