class MovementStrategy {
    constructor( objectToManage ) {
        this.entity = objectToManage;
        this.targetX = null;
        this.targetY = null;

        this.status = movementStrategyStatus.starting;
    }

    actualizar() {
        this.moveToTarget( this.entity.speed );
        this.changeOrientation();
    }

    moveToTarget(speed) {
        if (Math.abs(this.entity.x - this.targetX) > 1) {
            this.status = movementStrategyStatus.moving;
            if (this.entity.x < this.targetX) {
                this.entity.vx = 1 * speed;
            } else {
                this.entity.vx = -1 * speed;
            }
        } else {
            this.entity.vx = 0;
        }
        if (Math.abs(this.entity.y - this.targetY) > 1) {
            this.status = movementStrategyStatus.moving;
            if (this.entity.y < this.targetY) {
                this.entity.vy = 1 * speed;
            } else {
                this.entity.vy = -1 * speed;
            }
        } else {
            this.entity.vy = 0;
        }
    }

    changeOrientation() {
        if ( this.isMovingX() && this.isMovingY()){
            if (this.entity.vx > 0){
                if (this.entity.vy > 0)
                    this.entity.orientation = orientations.upright;
                else
                    this.entity.orientation = orientations.downright;
            }

            if (this.entity.vx < 0) {
                if (this.entity.vy > 0)
                    this.entity.orientation = orientations.upleft;
                else
                    this.entity.orientation = orientations.downleft;
            }
        } else if ( this.isMovingX() ) {
            if (this.entity.vx > 0)
                this.entity.orientation = orientations.right;
            else
                this.entity.orientation = orientations.left;

        } else { // moving Y
            if (this.entity.vy > 0)
                this.entity.orientation = orientations.up;
            else if ( this.entity.vy < 0 )
                this.entity.orientation = orientations.down;
        }


    }

    areWeNearTarget(){
        return (Math.abs(this.entity.x - this.targetX) < 2) && (Math.abs(this.entity.y - this.targetY) < 2);
    }

    isMovingX() {
        return this.entity.vx != 0;
    }

    isMovingY() {
        return this.entity.vy != 0;
    }

    finishStrategy (){

    }
}