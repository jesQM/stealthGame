class Player extends Character {
    constructor(x, y){
        super(pictures.playerW0, x, y);

        this.combatState = null;
        this.stealthState = stealthStates.visible;
        this.inBush = false;
        this.seenBy = [];

        this.woundedPictures = [
            pictures.playerW0,
            pictures.playerW1,
            pictures.playerW2,
            pictures.playerW3,
            pictures.playerW4,
        ];
    }

    actualizar() {
        super.actualizar();
        if ( this.seenBy.length == 0 && this.stealthState == stealthStates.seen )
            this.stealthState = stealthStates.visible;
    }

    moverX (direccion){
        this.vx = direccion * this.speed;
    }

    moverY (direccion){
        this.vy = direccion * this.speed;
    }

    setStealthState(newState){
        this.stealthState = newState;
    }
}