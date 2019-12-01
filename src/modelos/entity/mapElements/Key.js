class Key extends Modelo {
    constructor(x, y) {
        super(pictures.llave, x, y);
    }

    actualizar() {
        if ( gameLayer.player.colisiona(this) ){
            this.playerTakenKey();
        }
    }

    playerTakenKey() {
        gameLayer.espacio.eliminarCuerpoDinamico(this);
        gameLayer.player.hasKey = true;
    }
}