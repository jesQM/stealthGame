class BowEnemy extends Enemy {
    constructor(x ,y){
        super(pictures.enemyW0, x, y);

        this.weapon = new EnemyBowWeapon(this);
    }

    actualizar() {
        super.actualizar();
        this.weapon.actualizar();

        if ( this.followState == enemyFollowStates.followPlayer && gameLayer.player.stealthState != stealthStates.hidden ) {
            this.weapon.trigger();
        }
    }
}