class EnemyBowWeapon extends Weapon{
    constructor(entity) {
        super(pictures.bow, entity);
        this.damage = -25;
        this.cooldown = 50;
    }

    trigger(){
        if (this.timer == 0) {
            this.timer = this.cooldown;
            this.fireArrow();
        }
        return null;
    }

    fireArrow() {
        // 1.- Calculate acceleration on x and y
        let x = this.entity.x - gameLayer.player.x;
        let y = this.entity.y - gameLayer.player.y;

        // 2.- Create arrow
        gameLayer.espacio.agregarCuerpoDinamico( new Arrow( this.entity.x, this.entity.y, x, y ) )
    }
}

class Arrow extends Modelo{
    constructor( x, y, vx, vy ) {
        super(pictures.arrow, x, y);

        this.vx = vx;
        this.vy = vy;
    }

}