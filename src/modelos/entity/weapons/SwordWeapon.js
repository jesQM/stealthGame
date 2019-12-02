class SwordWeapon extends Weapon {
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

            gameLayer.checkIfCrit(this.lastDamaged);
            this.lastDamaged = []
            this.timer = 0;
        }.bind(this);

        let callbackPreparation = function () {
            this.animationStep++;
            this.damaging = true;
            new AudioManager().playSwordSlash();

            if ( this.entity.vx < 0 ) {
                this.orientationAnimations = this.animL;
            } else if ( this.entity.vx > 0 ) {
                this.orientationAnimations = this.animR;
            }
        }.bind(this);

        this.animR = [
            new Animacion(pictures.swordR, 20, 20, 0, 1),
            new Animacion(pictures.swordPreparationR, 20, 20, 2, 6, callbackPreparation),
            new Animacion(pictures.swordAttackR, 20, 20, 1 , 4, callback),
        ];

        this.animL = [
            new Animacion(pictures.swordL, 20, 20, 0, 1),
            new Animacion(pictures.swordPreparationL, 20, 20, 2, 6, callbackPreparation),
            new Animacion(pictures.swordAttackL, 20, 20, 1, 4, callback),
        ];

        this.orientationAnimations = this.animR;

        this.animationStep = 0;

        this.damage = -25;

        this.lastDamaged = [];
    }

    actualizar(){
        this.x = this.entity.x;
        this.y = this.entity.y;

        this.orientationAnimations[ this.animationStep ].actualizar();

        if ( this.animationStep == 0 ) {
            if ( this.entity.vx < 0 ) {
                this.orientationAnimations = this.animL;
            } else if ( this.entity.vx > 0 ) {
                this.orientationAnimations = this.animR;
            }
        }

        if ( this.damaging ) {
            this.lastDamaged = [];
            for(var i = 0; i < gameLayer.enemies.length; i++){
                if ( this.colisiona( gameLayer.enemies[i] ) && gameLayer.enemies[i].woundCooldown == 0 ) {
                    gameLayer.enemies[i].damage(-25);
                    this.lastDamaged.push(gameLayer.enemies[i]);
                }
            }
            this.damaging = false;
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

    wasEquipped(){
        new AudioManager().playSwordWeaponSelect();
    }
}