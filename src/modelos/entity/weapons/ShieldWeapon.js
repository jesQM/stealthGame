class ShieldWeapon extends Weapon {
    constructor(entity){
        super(pictures.shieldU, entity);
        this.lastOrientation = 0;
    }

    actualizar() {
        super.actualizar();

        this.changePosition();
        this.checkReflectArrow();
    }

    changePosition(orientation = this.entity.orientation) {
        if ( orientation > 3 ) orientation = this.lastOrientation;

        switch (orientation) {
            case orientations.up:
                this.y = this.entity.getAbajoDinamico();
                this.x = this.entity.x;
                this.imagen = this.changePic(pictures.shieldD);
                break;
            case orientations.down:
                this.y = this.entity.getArribaDinamico();
                this.x = this.entity.x;
                this.imagen = this.changePic(pictures.shieldU);
                break;
            case orientations.left:
                this.y = this.entity.y;
                this.x = this.entity.getIzquierdaDinamico();
                this.imagen = this.changePic(pictures.shieldL);
                break;
            case orientations.right:
                this.y = this.entity.y;
                this.x = this.entity.getDerechaDinamico();
                this.imagen = this.changePic(pictures.shieldR);
                break;
            default:
                break;
        }
        this.lastOrientation = orientation;
    }

    changePic(imagenRuta) {
        let imagen =new Image();
        imagen.src = imagenRuta;
        this.ancho = imagen.width;
        this.alto = imagen.height;
        return imagen;
    }

    checkReflectArrow() {
        for (var i = 0; i < gameLayer.espacio.dinamicos.length; i++) {
            if ( gameLayer.espacio.dinamicos[i] instanceof Arrow){
                if ( gameLayer.espacio.dinamicos[i].colisiona( this ) ){
                    this.reflectArrow(gameLayer.espacio.dinamicos[i]);
                }
            }
        }
    }

    reflectArrow(dinamico) {
        dinamico.vx *= -1;
        dinamico.vy *= -1;
        dinamico.targets = [];
        for ( var i = 0; i < gameLayer.enemies.length; i++ ){
            dinamico.targets.push( gameLayer.enemies[i] );
        }
        dinamico.arrowSetPicture();
        gameLayer.music.playShieldBlock();
    }

    wasEquipped(){
        gameLayer.music.playShieldWeaponSelect();
    }
}