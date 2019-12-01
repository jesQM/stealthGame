class TraceBackStepsMovement extends MovementStrategy {

    actualizar() {

        if (Math.abs(this.entity.x - this.targetX) < 2 && Math.abs(this.entity.y - this.targetY) < 2) {
            if ( this.entity.followPlayerWaypoints.length > 0 ){
                this.getNextTarget();
            } else {
                // we are at the beginning
                this.status = movementStrategyStatus.finished;
            }
        }

        if (this.targetX == null || this.targetY == null) {
            if ( this.entity.followPlayerWaypoints.length > 0 ){
                this.getNextTarget();
            } else {
                this.targetX = this.entity.x;
                this.targetY = this.entity.y;
                this.status = movementStrategyStatus.finished;
            }
        }

        this.moveToTarget( this.entity.speed/2 );
        this.changeOrientation();
    }

    finishStrategy (){
        this.entity.followPlayerWaypoints.push( [this.entity.x, this.entity.y] ); // so we can get here if we get interrupted
    }

    getNextTarget(){
        var nextTarget = this.entity.followPlayerWaypoints.pop();
        this.targetX = nextTarget[0];
        this.targetY = nextTarget[1];
    }
}