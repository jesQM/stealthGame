class VisionArea extends Modelo {

    constructor(img, x, y){
        super(img, x, y);

        this.isVisible = true;
        //this.collider = new DefaultCollider(this);
    }

    dibujar(scrollX, scrollY) {
        if (this.isVisible)
            super.dibujar(scrollX, scrollY);
    }
}