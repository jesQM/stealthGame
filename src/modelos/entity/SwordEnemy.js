class SwordEnemy extends Enemy {
    constructor(x ,y){
        super(pictures.enemyW0, x, y);

        this.weapon = new EnemySwordWeapon(this);
    }

    actualizar() {
        super.actualizar();
        //this.weapon.actualizar();

        if ( this.followState == enemyFollowStates.followPlayer && gameLayer.player.stealthState != stealthStates.hidden ) {
            this.weapon.trigger();
        }
    }

    setToPatrol( arrayOfWaypoints ){
        //for (let i = 0; i < arrayOfWaypoints.length; i++)
        //    this.waypoints.push( arrayOfWaypoints[i] );

        this.waypoints = arrayOfWaypoints;
        this.movementStrategy = new PatrolMovement(this);
        this.movementStrategy.orientationOfEntity = orientations.up;
        this.followState = enemyFollowStates.patrol;
    }
}