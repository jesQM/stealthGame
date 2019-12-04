class MenuLayer extends Layer {
    constructor() {
        super();

        this.backGround = new Fondo(pictures.background, 480/2, 320/2);
        this.texts = [];
        this.texts.push( new Texto("Controls", 20, 40, "40px Arial") );
        this.texts.push( new Texto("· Arrow keys to move", 20, 90) );
        this.texts.push( new Texto("· Numbers (1,2) to change weapon", 20, 120) );
        this.texts.push( new Texto("· Space bar to attack", 20, 150) );
        this.texts.push( new Texto("· M or N to mute (all sounds or music)", 20, 180) );

        this.texts.push( new Texto("Press SPACE to start the mission", 20, 250, "30px Arial") );
    }

    actualizar (){

    }

    dibujar (){
        this.backGround.dibujar();
        for (let i = 0; i < this.texts.length; i++)
            this.texts[i].dibujar();
    }

    procesarControles(){
        if (controles.continuar) {
            gameLayer.startMusic();
            gameLayer.startTime = new Date();
            changeLayer( gameLayer );
        }
    }
}