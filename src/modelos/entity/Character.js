class Character extends Movable {

    constructor(img, x, y){
        super(img, x, y);

        this.maxHealth = 100;
        this.health = this.maxHealth;

        this.weapon = null;
        this.woundedPictures = [];
        this.woundMaxCooldown = 30;
        this.woundCooldown = this.woundMaxCooldown;
    }

    actualizar() {
        super.actualizar();
        if (this.weapon != null) {
            this.weapon.actualizar();
        }

        if ( this.woundCooldown > 0 ) this.woundCooldown--;
    }

    dibujar(scrollX, scrollY) {
        super.dibujar(scrollX, scrollY);
        if (this.weapon != null) {
            this.weapon.dibujar(scrollX, scrollY);
        }
    }

    setWeapon( weapon ){
        this.weapon = weapon;
    }

    triggerWeapon(){
        if (this.weapon != null) {
            this.weapon.trigger();
        }
    }

    damage( amount ){
        if ( this.woundCooldown > 0 ) return;
        this.woundCooldown = this.woundMaxCooldown;
        this.health += amount;
        this.changePictureToShowHealth();

        gameLayer.createBloodEffect( this.x, this.y);
    }

    changePictureToShowHealth() {
        if (this.health >= this.maxHealth) {
            // 100
            this.imagen = cache[this.woundedPictures[0]];

        } else if (this.health > this.maxHealth*0.75){
            // 75-100
            this.imagen = cache[this.woundedPictures[1]];

        } else if (this.health > this.maxHealth*0.5){
            // 50-75
            this.imagen = cache[this.woundedPictures[2]];

        } else if (this.health > this.maxHealth*0.25){
            // 25-75
            this.imagen = cache[this.woundedPictures[3]];

        } else if (this.health > 0){
            // 0 - 25
            this.imagen = cache[this.woundedPictures[4]];

        } else {
            // 0
            this.kill();
        }
    }

    kill(){
        this.health = 0;
        this.speed = 0;
        this.vx = 0;
        this.vy = 0;
        this.imagen = cache[pictures.dead];
    }

    colisiona(modelo) {
        return super.colisiona(modelo) && this.health > 0 ;
    }
}