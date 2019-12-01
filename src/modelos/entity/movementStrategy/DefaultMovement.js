class DefaultMovement extends MovementStrategy {

    constructor( objectToManage) {
        super(objectToManage);

        this.orientationOfEntity = null;
    }

    actualizar() {
        if (this.orientationOfEntity != null)
            this.entity.orientation = this.orientationOfEntity;
    }

    finishStrategy (){
        this.entity.followPlayerWaypoints.push( [this.entity.x, this.entity.y] ); // so we can get here if we get interrupted
    }
}