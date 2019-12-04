class Enemy extends Character {
    constructor(img, x ,y) {
        super(img, x ,y);

        this.totalMaxSpeed = 2.5;
        this.currentMaxSpeed = this.totalMaxSpeed;
        this.speed = this.currentMaxSpeed;
        this.speedIncreaseAfterHit = 0.05;

        this.waypoints = [];
        this.followPlayerWaypoints = [];

        this.visionArea = new VisionArea(pictures.squareVisionArea80x80, this.x, this.y);

        this.movementStrategy = new DefaultMovement(this);
        this.followState = enemyFollowStates.idle;

        this.interruptedMovementStrategy = [];
        this.interruptedMovementStates = [];


        this.woundedPictures = [
            pictures.enemyW0,
            pictures.enemyW1,
            pictures.enemyW2,
            pictures.enemyW3,
            pictures.enemyW4,
        ];
    }

    actualizar() {
        super.actualizar();
        this.updateVisionAreaPosition();

        // Increase Speed after being hit by an attack
        if (this.speed < this.currentMaxSpeed){
            this.speed += this.speedIncreaseAfterHit;
            if (this.speed > this.currentMaxSpeed)
                this.speed = this.currentMaxSpeed;
        }

        // Attack
        if ( (this.followState == enemyFollowStates.followPlayer || this.followState == enemyFollowStates.followHostage))
            if ( this.movementStrategy.modelToFollow != null && (this.movementStrategy.modelToFollow.stealthState === undefined || gameLayer.player.stealthState != stealthStates.hidden) )
                if (this.visionArea.colisiona(this.movementStrategy.modelToFollow) && !this.isWallBlocking(this.movementStrategy.modelToFollow))
                    this.weapon.trigger();

        if ( this.woundCooldown > 0 ) this.woundCooldown--;

        this.manageMovement();
    }

    dibujar(scrollX, scrollY) {
        super.dibujar(scrollX, scrollY);
        this.visionArea.dibujar(scrollX, scrollY);
    }

    updateVisionAreaPosition() {
        if (this.visionArea == null)
            return;

        var xValue = 0;
        var yValue = 0;

        switch (this.orientation) {
            case orientations.up:
                yValue = 1;
                break;
            case orientations.right:
                xValue = 1;
                break;
            case orientations.down:
                yValue = -1;
                break;
            case orientations.left:
                xValue = -1;
                break;

            case orientations.upright:
                xValue = 1;
                yValue = 1;
                break;
            case orientations.downright:
                xValue = 1;
                yValue = -1;
                break;
            case orientations.upleft:
                xValue = -1;
                yValue = 1;
                break;
            case orientations.downleft:
                xValue = -1;
                yValue = -1;
                break;
        }

        this.visionArea.x = this.x + xValue * this.visionArea.ancho/2;
        this.visionArea.y = this.y + yValue * this.visionArea.alto/2;
    }

    getArribaDinamico(){
        return (this.y - this.alto/2) + this.alto/10;
    }
    getAbajoDinamico(){
        return (this.y + this.alto/2) - this.alto/10;
    }
    getDerechaDinamico(){
        return (this.x + this.ancho/2) - this.ancho/10;
    }
    getIzquierdaDinamico(){
        return (this.x - this.ancho/2) + this.ancho/10;
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

            if ( this.followState == enemyFollowStates.followHostage ) {
                if ( this.visionArea.colisiona( this.movementStrategy.modelToFollow ) && !this.isWallBlocking( this.movementStrategy.modelToFollow ) ) {
                        this.movementStrategy.runTimer = true;
                } else { // we lost the hostage
                    this.movementStrategy.runTimer = false;
                    let target = this.lookForHostageTarget();
                    if ( target != null ) {
                        this.movementStrategy.modelToFollow = target;
                        this.movementStrategy.runTimer = true;
                    }
                }

            } else {
                let target = this.lookForHostageTarget();
                if ( target != null ) {
                    if (this.movementStrategy.status != movementStrategyStatus.finished) {
                        this.movementStrategy.finishStrategy();
                        this.interruptedMovementStates.push(this.followState);
                        this.interruptedMovementStrategy.push(this.movementStrategy);
                    }
                    this.movementStrategy = new FollowPlayerMovement(this, target);
                    this.followState = enemyFollowStates.followHostage;
                }
            }
        }

        this.changeState();
    }

    lookForHostageTarget() {
        for (let i = 0; i < this.weapon.targets.length; i++) {
            if ( this.weapon.targets[i] != null && this.weapon.targets[i] != gameLayer.player ){
                if ( this.visionArea.colisiona( this.weapon.targets[i] ) && !this.isWallBlocking( this.weapon.targets[i] ) ) {
                    return this.weapon.targets[i];
                }
            }
        }
        return null;
    }

    damage( amount ){
        if ( this.woundCooldown > 0 ) return;
        super.damage(amount);

        this.adjustMaxSpeed();

        this.speed = 0;

        if (this.followState != enemyFollowStates.followPlayer) {

            if (this.movementStrategy.status != movementStrategyStatus.finished) {
                this.movementStrategy.finishStrategy();
                this.interruptedMovementStates.push(this.followState);
                this.interruptedMovementStrategy.push(this.movementStrategy);
            }
            this.movementStrategy = new LookAroundMovement(this);
            this.followState = enemyFollowStates.lookAround;
        }
    }

    adjustMaxSpeed() {
        if (this.health >= this.maxHealth) {
            // 100
            this.currentMaxSpeed = this.totalMaxSpeed;

        } else if (this.health > this.maxHealth*0.75){
            // 75-100
            this.currentMaxSpeed = this.totalMaxSpeed*0.9;

        } else if (this.health > this.maxHealth*0.5){
            // 50-75
            this.currentMaxSpeed = this.totalMaxSpeed*0.75;

        } else if (this.health > this.maxHealth*0.25){
            // 25-75
            this.currentMaxSpeed = this.totalMaxSpeed*0.6;

        } else if (this.health > 0){
            // 0 - 25
            this.currentMaxSpeed = this.totalMaxSpeed*0.4;

        } else {
            // 0
            this.currentMaxSpeed = 0;
        }
    }

    kill(){
        super.kill();

        this.visionArea = null;

        for (var i = 0; i<gameLayer.player.seenBy.length; i++)
        { // we remove ourselves from the "we see player" list
            if (gameLayer.player.seenBy[i] == this) {
                gameLayer.player.seenBy.splice(i,1);
                i--;
            }
        }

        this.removeFromGame();
    }

    removeFromGame(){
        for (var i = 0; i < gameLayer.enemies.length; i++) {
            if ( gameLayer.enemies[i] == this ) {
                gameLayer.enemies.splice(i, 1);
                break;
            }
        }
        gameLayer.espacio.eliminarCuerpoDinamico(this);
    }

    changeState(){
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

                case enemyFollowStates.followHostage:
                    this.movementStrategy = new LookAroundMovement(this);
                    this.followState = enemyFollowStates.lookAround;
                    break;
            }
        }
    }

    isWallBlocking( target = gameLayer.player ) {
        //console.log("is blocking?");
        let playerX = target.x;
        let playerY = target.y;

        let bot = this.y+this.alto/2;
        let top = this.y-this.alto/2;
        let right = this.x+this.ancho/2;
        let left = this.x-this.ancho/2;

        let botP = playerY + target.alto/2;
        let topP = playerY - target.alto/2;
        let rightP = playerX + target.ancho/2;
        let leftP = playerX - target.ancho/2;

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

                    return true;
                }
            }
        }

        return false;
    }
}