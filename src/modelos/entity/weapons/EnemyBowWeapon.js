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
    }

    fireArrow() {
        // 1.- Calculate acceleration on x and y
        let x = (this.entity.x - this.entity.movementStrategy.modelToFollow.x);
        let y = (this.entity.y - this.entity.movementStrategy.modelToFollow.y);


        let xNormal = x/( Math.sqrt( Math.pow(x,2) + Math.pow(y,2) ) );
        let yNormal = y/( Math.sqrt( Math.pow(x,2) + Math.pow(y,2) ) );

        // 2.- Create arrow
        gameLayer.espacio.agregarCuerpoDinamico( new Arrow( this.entity.x, this.entity.y, -xNormal, -yNormal, this.targets ) )
    }

    addTarget(target) {
        this.targets.push(target);
    }

    removeTarget(target) {
        for (let i = 0; i < this.targets.length; i++){
            if ( this.targets[i] != null && this.targets[i] == target ) {
                this.targets.splice(i, 1);
                i--;
            }
        }
    }
}

class Arrow extends Modelo{
    constructor( x, y, vx ,vy, targets ) {
        super(pictures.arrowU, x, y);

        this.speed = 3.5;

        this.inVx = vx * this.speed;
        this.inVy = vy * this.speed;
        this.vx = vx * this.speed;
        this.vy = vy * this.speed;

        this.damage = -25;
        this.targets = targets;

        this.toBeDestroyed = false;

        this.arrowSetPicture();
    }

    actualizar() {
        super.actualizar();

        if (this.toBeDestroyed){
            gameLayer.espacio.eliminarCuerpoDinamico(this);
            return;
        }

        for ( var i = 0; i < this.targets.length; i++ ) {
            if ( this.targets[i] != null && this.colisiona( this.targets[i] ) ) {
                this.targets[i].woundCooldown = 0;
                this.targets[i].damage( this.damage );
                gameLayer.espacio.eliminarCuerpoDinamico(this);
                break;
            }
        }
    }

    stoppedByStaticObject(staticObject) {
        this.toBeDestroyed = true;
    }

    arrowSetPicture() {
        let newPic = null;

        if ( this.vx > 0 ) {
            // To the right
            if ( this.vx > this.vy ){
                // to the right
                newPic = cache[ pictures.arrowR ];

            } else {
                if ( this.vy > 0 )
                    newPic = cache[ pictures.arrowD ];
                else
                    newPic = cache[ pictures.arrowU ];

            }

        } else {
            // To the left
            if ( this.vx < this.vy ){
                // to the left
                newPic = cache[ pictures.arrowL ];

            } else {
                if ( this.vy > 0 )
                    newPic = cache[ pictures.arrowD ];
                else
                    newPic = cache[ pictures.arrowU ];
            }

        }

        this.imagen = newPic;
    }
}