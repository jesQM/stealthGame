class EnemySwordWeapon extends Weapon {
    constructor(entity) {
        super(pictures.swordR, entity);

        let callback = function () {
            this.animationStep++;
            this.animationStep = 0;
            this.damaging = false;

            if ( this.entity.vx < 0 ) {
                this.orientationAnimations = this.animL;
            } else if ( this.entity.vx > 0 ) {
                this.orientationAnimations = this.animR;
            }
        }.bind(this);

        let callbackPreparation = function () {
            this.animationStep++;
            this.damaging = true;
            if ( this.animationStep >= this.animR.length ) this.animationStep = 0;

            if ( this.entity.vx < 0 ) {
                this.orientationAnimations = this.animL;
            } else if ( this.entity.vx > 0 ) {
                this.orientationAnimations = this.animR;
            }
        }.bind(this);

        this.animR = [
            new Animacion(pictures.swordR, 20, 20, 0, 1),
            new Animacion(pictures.swordPreparationR, 20, 20, 8, 6, callbackPreparation),
            new Animacion(pictures.swordAttackR, 20, 20, 1 , 4, callback),
        ];

        this.animL = [
            new Animacion(pictures.swordL, 20, 20, 0, 1),
            new Animacion(pictures.swordPreparationL, 20, 20, 8, 6, callbackPreparation),
            new Animacion(pictures.swordAttackL, 20, 20, 1, 4, callback),
        ];

        this.orientationAnimations = this.animR;

        this.animationStep = 0;
        this.damage = -25;
        this.cooldown = 50;

        this.damaging = false;
    }

    actualizar(){
        this.x = this.entity.x;
        this.y = this.entity.y;

        if (this.timer > 0 && this.animationStep == 0)
            this.timer--;

        this.orientationAnimations[ this.animationStep ].actualizar();

        if ( this.animationStep == 0 ) {
            if ( this.entity.vx < 0 ) {
                this.orientationAnimations = this.animL;
            } else if ( this.entity.vx > 0 ) {
                this.orientationAnimations = this.animR;
            }
        }

        if ( this.damaging ) {
            if (this.colisiona( gameLayer.player )){
                gameLayer.player.damage( this.damage );
                this.damaging = false;
            }
        }
    }

    dibujar(scrollX, scrollY) {
        this.orientationAnimations[ this.animationStep ].dibujar(this.entity.x - scrollX, this.entity.y - scrollY); // scrollX, scrollY
    }

    trigger(){
        if (this.timer == 0) {
            this.timer = this.cooldown;
            this.animationStep++;
        }
        return null;
    }
}