class Door extends Modelo {
    constructor(x, y) {
        super(pictures.door, x, y);
    }

    actualizar() {
        if ( gameLayer.player.hasKey && gameLayer.player.colisiona(this) ){
            this.playerOpenDoor();
        }
    }

    playerOpenDoor() {
        gameLayer.finishLevel();
    }
}