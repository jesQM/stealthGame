class FollowPlayerMovement extends MovementStrategy {

    constructor( objectToManage) {
        super(objectToManage);

        this.waypointInterval = 5;
        this.waypointTimer = 0;

        this.runTimer = true;
    }

    actualizar() {

        if (this.runTimer){
            if (this.waypointTimer > 0)
                this.waypointTimer--;
            else {
                this.waypointTimer = this.waypointInterval;

                //if (Math.abs(this.entity.x - this.targetX) < 2 && Math.abs(this.entity.y - this.targetY) < 2) {
                this.targetX = gameLayer.player.x;
                this.targetY = gameLayer.player.y;

                this.entity.followPlayerWaypoints.push( [this.targetX, this.targetY] );
            }
        } else {
            if (Math.abs(this.entity.x - this.targetX) < 2 && Math.abs(this.entity.y - this.targetY) < 2)
                this.status = movementStrategyStatus.finished;
        }

        if ( this.status != movementStrategyStatus.finished )
            super.actualizar();
    }
}