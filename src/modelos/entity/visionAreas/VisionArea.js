class VisionArea extends Modelo {

    constructor(img, x, y){
        super(img, x, y);

        this.isVisible = true;
    }

    dibujar(scrollX, scrollY) {
        if (this.isVisible)
            super.dibujar(scrollX, scrollY);
    }
}