class HUD {
    constructor(numberOfSlots) {
        this.numberOfSlots = numberOfSlots;
        this.slots = [];
        for (let i = 0; i < numberOfSlots; i++) {
            this.slots[i] = new HUDSlot(40 + i * 50, 270, i+1);
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
}

class HUDSlot extends  Modelo{
    constructor(x, y, slotNumber) {
        super(pictures.squareVisionArea40x40, x,y);

        this.itemHolding = null;
    }

    dibujar() {
        super.dibujar();
        if ( this.itemHolding != null ){
            this.itemHolding.dibujar();
        }
    }
}
