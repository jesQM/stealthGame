class AbstractSword extends Weapon {
    constructor( pic, entity ) {
        super( pic, entity );

        let callback = function () {
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
            gameLayer.music.playSwordSlash();

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

        this.animationStep = 0;
        this.damage = -25;
        this.damaging = false;

        this.lastDamaged = [];
        this.targets = [];
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
            this.lastDamaged = [];
            for(var i = 0; i < this.targets.length; i++){
                if ( this.targets[i] != null && this.colisiona( this.targets[i] ) && this.targets[i].woundCooldown == 0 ) {
                    this.targets[i].damage( this.damage );
                    this.lastDamaged.push( this.targets[i] );
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
        gameLayer.music.playSwordWeaponSelect();
    }

    addTarget(target) {
        this.targets.push(target);
    }
    
    removeTarget(target) {
        for (let i = 0; i < this.targets.length; i++){
            if ( this.targets[i] != null && this.targets[i] == target ) {
                this.targets.splice(i, 1);
                i--;
            }
        }
    }
}