class EnemyBowWeapon extends Weapon{
    constructor(entity) {
        super(pictures.bow, entity);
        this.damage = -25;
        this.cooldown = 50;

        this.targets = [];
    }

    trigger(){
        if (this.timer <= 0) {
            this.timer = this.cooldown;
            this.fireArrow();
        }
        return null;
    }

    fireArrow() {
        // 1.- Calculate acceleration on x and y
        let x = (this.entity.x - gameLayer.player.x);
        let y = (this.entity.y - gameLayer.player.y);

        x = x/20;
        y = y/20;

        console.log(x + " - " + y);
        // 2.- Create arrow
        gameLayer.espacio.agregarCuerpoDinamico( new Arrow( this.entity.x, this.entity.y, -x, -y, this.targets ) )
    }

    addTarget(target) {
        this.targets.push(target);
    }
}

class Arrow extends Modelo{
    constructor( x, y, vx ,vy, targets ) {
        super(pictures.arrow, x, y);

        this.inVx = vx;
        this.inVy = vy;
        this.vx = vx;
        this.vy = vy;

        this.damage = -25;
        this.targets = targets;

        this.toBeDestroyed = false;
    }

    actualizar() {
        super.actualizar();

        if (this.toBeDestroyed){
            gameLayer.espacio.eliminarCuerpoDinamico(this);
            return;
        }

        for ( var i = 0; i < this.targets.length; i++ ) {
            if ( this.targets[i] != null && this.colisiona( this.targets[i] ) ) {
                this.targets[i].damage( this.damage );
                this.targets[i].woundCooldown = 0;
                gameLayer.espacio.eliminarCuerpoDinamico(this);
                break;
            }
        }
    }

    stoppedByStaticObject(staticObject) {
        this.toBeDestroyed = true;
    }
}