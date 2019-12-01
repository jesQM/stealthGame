class LookAroundMovement extends MovementStrategy {
    constructor( objectToManage ) {
        super(objectToManage);

        this.iteration = 0;
        this.maxIterations = 3;
        this.rotateSpeedStart = 3;
        this.rotateSpeedDecrement = 3;
        this.timer = 0;

        this.startStep = this.entity.orientation;
        this.currentStep = this.entity.orientation;

        this.entity.vx = 0;
        this.entity.vy = 0;
    }

    actualizar() {

        if (this.status != movementStrategyStatus.finished) {

            if ( this.timer > 0 ) {
                this.timer--;
            } else {
                this.timer = this.rotateSpeedStart + this.rotateSpeedDecrement * this.iteration;
                //this.timer = 15;

                if ( this.currentStep < rotateAroundOrder.length-1 ) {
                    this.currentStep++;
                } else {
                    this.currentStep = 0;
                }

                // we finish the movement
                if ( this.iteration == this.maxIterations ) {
                    this.status = movementStrategyStatus.finished;
                } else {
                    if (this.currentStep == this.startStep)
                        this.iteration++;
                }

                this.entity.orientation = rotateAroundOrder[this.currentStep];
            }
        }
    }

    finishStrategy (){
        this.entity.followPlayerWaypoints.push( [this.entity.x, this.entity.y] ); // so we can get here if we get interrupted
    }
}