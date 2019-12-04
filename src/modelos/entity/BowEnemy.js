class BowEnemy extends Enemy {
    constructor(x ,y){
        super(pictures.enemyW0, x, y);

        this.movementStrategy = new DefaultMovement(this);
        this.weapon = new EnemyBowWeapon(this);

        this.totalMaxSpeed = 0.25;
        this.currentMaxSpeed = this.totalMaxSpeed;
        this.speed = this.currentMaxSpeed;
    }

    actualizar() {
        super.actualizar();
        //this.weapon.actualizar();

        if ( gameLayer.player.stealthState != stealthStates.hidden && this.visionArea.colisiona(gameLayer.player) && !this.isWallBlocking() ) {
            this.weapon.trigger();
        }
    }
}