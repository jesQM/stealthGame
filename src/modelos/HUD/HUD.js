class HUD {
    constructor(numberOfSlots) {
        this.numberOfSlots = numberOfSlots;
        this.slots = [];
        for (let i = 0; i < numberOfSlots; i++) {
            this.slots[i] = new HUDSlot(40 + i * 50, 270);
        }
    }

    actualizar() {
        for (var i = 0; i < this.numberOfSlots; i++) {
            this.slots[i].actualizar();
        }
    }

    dibujar(scrollX, scrollY) {
        for (var i = 0; i < this.numberOfSlots; i++) {
            this.slots[i].dibujar();
        }
    }

    setItemInSlot(itemPicture, slot){
        this.slots[slot].itemHolding = new Modelo(itemPicture, this.slots[slot].x, this.slots[slot].y);
    }

    setPictureInSlot(picture, slot){
        this.slots[slot].picture = new Modelo(picture, this.slots[slot].x+10, this.slots[slot].y+10);
    }
}

class HUDSlot extends  Modelo{
    constructor(x, y) {
        super(pictures.squareVisionArea40x40, x,y);

        this.picture = null;
        this.itemHolding = null;
    }

    dibujar() {
        super.dibujar();
        if ( this.itemHolding != null ){
            this.itemHolding.dibujar();
            if (this.picture != null) {
                this.picture.dibujar();
            }
        }
    }
}
