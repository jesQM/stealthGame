class BowEnemy extends Enemy {
    constructor(x ,y){
        super(pictures.enemyW0, x, y);

        this.movementStrategy = new DefaultMovement(this);
        this.weapon = new EnemyBowWeapon(this);

        this.totalMaxSpeed = 0.25;
        this.currentMaxSpeed = this.totalMaxSpeed;
        this.speed = this.currentMaxSpeed;
    }

    setToPatrol(arrayOfWaypoints) {
        super.setToPatrol(arrayOfWaypoints);
        this.totalMaxSpeed = 0.5;
        this.currentMaxSpeed = this.totalMaxSpeed;
        this.speed = this.currentMaxSpeed;
    }
}