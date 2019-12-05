class Player extends Character {
    constructor(x, y){
        super(pictures.playerW0, x, y);

        this.combatState = null;
        this.stealthState = stealthStates.visible;
        this.inBush = false;
        this.seenBy = [];
        this.hasKey = false;
        this.weapons = [];
        this.nextHostage = null;

        this.woundMaxCooldown = 0;

        this.woundedPictures = [
            pictures.playerW0,
            pictures.playerW1,
            pictures.playerW2,
            pictures.playerW3,
            pictures.playerW4,
        ];
    }

    actualizar() {

        //console.log("player: " + this.x + " - " + this.y);

        super.actualizar();
        this.changeOrientation();
        if ( this.seenBy.length == 0 && this.stealthState == stealthStates.seen )
            this.setStealthState( stealthStates.visible );
    }

    moverX (direccion){
        this.vx = direccion * this.speed;
    }

    moverY (direccion){
        this.vy = direccion * this.speed;
    }

    setStealthState(newState){
        if ( newState == stealthStates.seen ) {
            if ( this.stealthState != stealthStates.seen ){
                gameLayer.music.playPersecution();
            }
        } else {
            if ( this.stealthState == stealthStates.seen ){
                gameLayer.music.stopPersecution();
            }
        }

        this.stealthState = newState;
    }

    changeOrientation() {
        if ( this.isMovingX() && this.isMovingY()){
            if (this.vx > 0){
                if (this.vy > 0)
                    this.orientation = orientations.upright;
                else
                    this.orientation = orientations.downright;
            }

            if (this.vx < 0) {
                if (this.vy > 0)
                    this.orientation = orientations.upleft;
                else
                    this.orientation = orientations.downleft;
            }
        } else if ( this.isMovingX() ) {
            if (this.vx > 0)
                this.orientation = orientations.right;
            else
                this.orientation = orientations.left;

        } else { // moving Y
            if (this.vy > 0)
                this.orientation = orientations.up;
            else if ( this.vy < 0 )
                this.orientation = orientations.down;
        }


    }

    damage(amount) {
        if ( this.health <= 0 ) return;

        super.damage(amount);
        gameLayer.updateHealth();
    }

    kill() {
        super.kill();
        gameLayer.playerWasKilled();
    }

    isMovingX() {
        return this.vx != 0;
    }

    isMovingY() {
        return this.vy != 0;
    }

    changeWeapon( index ) {
        if ( this.weapons[ index ] != null && this.weapons[ index ] != undefined ) {
            if ( this.weapon != this.weapons[index]){
                this.weapon = this.weapons[index];
                this.weapon.wasEquipped();
            }
        }
    }
}