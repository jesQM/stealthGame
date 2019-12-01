class Weapon extends Modelo {
    constructor(img, entity){
        super(img, entity.x, entity.y);

        this.entity = entity;
        this.cooldown = 30;
        this.timer = 0;
    }

    actualizar() {
        this.x = this.entity.x;
        this.y = this.entity.y;

        if (this.timer > 0)
            this.timer--;
    }

    trigger(){
        return null;
    }
}