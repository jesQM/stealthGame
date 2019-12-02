class Shield extends Modelo {
    constructor(x, y) {
        super(pictures.shieldR, x, y);
    }

    actualizar() {
        if ( gameLayer.player.colisiona(this) ){
            this.playerTakenShield();
        }
    }

    playerTakenShield() {
        gameLayer.espacio.eliminarCuerpoDinamico(this);
        gameLayer.player.weapons[1] = new ShieldWeapon(gameLayer.player);

        gameLayer.addItemToHUD( pictures.shieldR, 2 );
        gameLayer.addPictureToSlotInHUD( pictures.pic2, 2 );
    }
}