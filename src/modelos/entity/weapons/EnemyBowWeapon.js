class EnemyBowWeapon extends Weapon{
    constructor(entity) {
        super(pictures.bow, entity);
        this.damage = -25;
        this.cooldown = 50;
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
        gameLayer.espacio.agregarCuerpoDinamico( new Arrow( this.entity.x, this.entity.y, -x, -y ) )
    }
}

class Arrow extends Modelo{
    constructor( x, y, vx ,vy ) {
        super(pictures.arrow, x, y);

        this.vx = vx;
        this.vy = vy;

        this.damage = -25;
        this.targets = [];
        this.targets.push( gameLayer.player );
    }

    actualizar() {
        super.actualizar();

        if ( this.vx == 0 && this.vy == 0 ) {
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
}