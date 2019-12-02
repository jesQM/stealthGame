class VisualEffect extends Modelo {
    constructor(pic, x, y, timeout){
        super(pic, x, y);
        this.timeout = timeout;
        this.ancho = 20;
        this.alto = 20;
    }

    actualizar() {
        this.timeout--;
        if ( this.timeout == 0 ) {
            gameLayer.removeEffect(this);
        }
    }
}