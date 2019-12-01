class PatrolMovement extends MovementStrategy {
    constructor(o){
        super(o);

        this.currentStep = 0;
        this.getNextTarget();

        this.status = movementStrategyStatus.moving;
    }

    actualizar() {
        console.log(this.targetX + " - " + this.targetY);
        if ( this.status != movementStrategyStatus.finished ) {

            if ( this.areWeNearTarget() ) {
                this.currentStep++;
                if ( this.currentStep >= this.entity.waypoints.length )
                    this.status = movementStrategyStatus.finished;
                else
                    this.getNextTarget();
            }

            this.moveToTarget( this.entity.speed/2 );
            this.changeOrientation();
        }
    }

    resetPatrol(){
        this.currentStep = -1;
        this.status = movementStrategyStatus.moving;
    }

    finishStrategy (){
        this.entity.followPlayerWaypoints.push( [this.entity.x, this.entity.y] ); // so we can get here if we get interrupted
    }

    getNextTarget(){
        let nextTarget = this.entity.waypoints[this.currentStep];
        this.targetX = nextTarget[0];
        this.targetY = nextTarget[1];
    }
}