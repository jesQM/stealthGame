class EnemySwordWeapon extends AbstractSword {
    constructor(entity) {
        super(pictures.swordR, entity);

        let callback = function () {
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
            gameLayer.music.playSwordSlash();

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

        this.cooldown = 50;
        this.targets = [];
    }
}