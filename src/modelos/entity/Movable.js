class Movable extends Modelo {

    constructor (img, x, y){
        super(img, x, y);

        this.movementStrategy = null;
        this.vx = 0;
        this.vy = 0;
        this.speed = 3;

        this.orientation = orientations.up;
    }

    actualizar() {
        if (this.movementStrategy != null)
            this.movementStrategy.actualizar();
    }
}