class Sword extends Modelo {
    constructor(x, y) {
        super(pictures.swordR, x, y);
    }

    actualizar() {
        if ( gameLayer.player.colisiona(this) ){
            this.playerTakenSword();
        }
    }

    playerTakenSword() {
        gameLayer.espacio.eliminarCuerpoDinamico(this);
        gameLayer.player.weapons[0] = new SwordWeapon(gameLayer.player);

        gameLayer.addItemToHUD( pictures.swordR, 1 );
        gameLayer.addPictureToSlotInHUD( pictures.pic1, 1 );
    }
}