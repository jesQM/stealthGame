class FollowModelMovement extends MovementStrategy {

    constructor( objectToManage, modelToFollow = gameLayer.player) {
        super(objectToManage);

        this.modelToFollow = modelToFollow;

        this.runTimer = true;
        this.targetX = this.modelToFollow.x;
        this.targetY = this.modelToFollow.y;
    }

    actualizar() {

        if (this.runTimer){

            if (Math.abs(this.entity.x - this.modelToFollow.x) > 25 || Math.abs(this.entity.y - this.modelToFollow.y) > 25){
                this.targetX = this.modelToFollow.x;
                this.targetY = this.modelToFollow.y;
            }

        } else {
            if (Math.abs(this.entity.x - this.targetX) < 2 && Math.abs(this.entity.y - this.targetY) < 2)
                this.status = movementStrategyStatus.finished;
        }

        if ( this.status != movementStrategyStatus.finished )
            super.actualizar();
    }
}