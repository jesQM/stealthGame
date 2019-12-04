class SwordEnemy extends Enemy {
    constructor(x ,y){
        super(pictures.enemyW0, x, y);

        this.weapon = new EnemySwordWeapon(this);
    }

    setToPatrol( arrayOfWaypoints ){
        this.waypoints = arrayOfWaypoints;
        this.movementStrategy = new PatrolMovement(this);
        this.movementStrategy.orientationOfEntity = orientations.up;
        this.followState = enemyFollowStates.patrol;
    }
}