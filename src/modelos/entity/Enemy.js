class Enemy extends Character {
    constructor(img, x ,y) {
        super(img, x ,y);

        this.woundCooldown = 0;
        this.woundMaxCooldown = 30;

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

        if ( this.woundCooldown > 0 ) this.woundCooldown--;
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

    damage( amount ){
        if ( this.woundCooldown > 0 ) return;
        this.woundCooldown = this.woundMaxCooldown;

        this.health += amount;
        this.changePictureToShowHealth();
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

        //this.movementStrategy = null;
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
}