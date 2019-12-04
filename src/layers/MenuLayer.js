class MenuLayer extends Layer {
    constructor() {
        super();

        this.backGround = new Fondo(pictures.background, 480/2, 320/2);
    }

    actualizar (){

    }

    dibujar (){
        this.backGround.dibujar();
    }

    procesarControles(){
        if (controles.continuar) {
            gameLayer.startMusic();
            changeLayer( gameLayer );
        }
    }
}