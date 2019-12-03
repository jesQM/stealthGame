class SwordWeapon extends AbstractSword {
    constructor(entity) {
        super(pictures.swordR, entity);

        this.cooldown = 1;
        this.addTargets();
    }

    addTargets() {
        for (let i = 0; i < gameLayer.enemies.length; i++) {
            this.targets.push(gameLayer.enemies[i]);
        }
    }
}