class SwordEnemy extends Enemy {
    constructor(x ,y){
        super(pictures.enemyW0, x, y);

        this.weapon = new EnemySwordWeapon(this);
    }
}