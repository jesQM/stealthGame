class GameLayer extends Layer {

    constructor() {
        super();
        this.start();
    }

    start (){
        this.espacio = new Espacio(0);

        this.scrollX = 0;
        this.scrollY = 0;
        this.player = null;
        this.bushes = [];
        this.enemies = [];

        this.backGround = new Fondo(pictures.background, 480/2, 320/2);

        new LevelLoader(this).cargarMapa("res/map/mapa.txt");
        new PropertyLoader(this).cargarMapa("res/map/properties001.txt");

        this.player.setWeapon( new ShieldWeapon(this.player) );

        this.stealthStartAnimation = null;
        this.updateStealthAnimation = false;
        this.stealthForeground = new Fondo(pictures.stealthLastStep, 480/2, 320/2);

        // extra below
        //this.player = new Player(100,100);

        /*
        this.enemy = new SwordEnemy(0,0);
        this.enemy.waypoints.push([-200,-100]);
        this.enemy.waypoints.push([-200,-200]);
        this.enemy.waypoints.push([-100,-200]);
        this.enemy.waypoints.push([-100,-100]);
        this.enemy.setToPatrol( this.enemy.waypoints );
        this.espacio.agregarCuerpoDinamico(this.enemy);
        */

        /*this.espacio.agregarCuerpoDinamico(this.player);
        //this.espacio.agregarCuerpoDinamico(this.enemy);
        this.espacio.agregarCuerpoEstatico(new Modelo(pictures.enemyW4, 300, 200));
        this.espacio.agregarCuerpoEstatico(new Modelo(pictures.enemyW4, 320, 200));
        this.espacio.agregarCuerpoDinamico(new SwordEnemy(310, 160));*/
    }


    actualizar (){
        this.espacio.actualizar();
        for (var i = 0; i < this.espacio.dinamicos.length; i++)
            this.espacio.dinamicos[i].actualizar();

        let inBush = false;
        for( var i = 0; i < this.bushes.length; i++ ){
            if (this.bushes[i].colisiona(this.player) ) {
                inBush = true;
                break;
            }
        }

        if (inBush) {
            if (this.player.stealthState != stealthStates.seen){
                if (!this.player.inBush){
                    this.player.inBush = true;
                    this.player.setStealthState(stealthStates.hidden);
                }
            }
        } else {
            if (this.player.inBush) {
                this.player.inBush = false;
                this.player.setStealthState(stealthStates.visible);
            }
        }

        if ( this.player.inBush) {
            if (this.stealthStartAnimation == null) {
                this.stealthStartAnimation = new Animacion(pictures.stealthOn, 480,320, 3,10, function () {
                    this.updateStealthAnimation = false;
                    this.drawStealthForeground = true;
                }.bind(this));
                this.updateStealthAnimation = true;
            }
            if (this.updateStealthAnimation)
                this.stealthStartAnimation.actualizar();

        } else if ( !this.player.inBush ){
            this.stealthStartAnimation = null;
            this.updateStealthAnimation = false;
            this.drawStealthForeground = false;
        }
    }

    calcularScroll() {
        this.scrollX = this.player.x - 480/2;
        this.scrollY = this.player.y - 320/2;
    }

    dibujar () {
        this.calcularScroll();

        this.backGround.dibujar();

        for (var i = 0; i < this.espacio.estaticos.length; i++)
            this.espacio.estaticos[i].dibujar(this.scrollX, this.scrollY);
        for (var i = 0; i < this.bushes.length; i++)
            this.bushes[i].dibujar(this.scrollX, this.scrollY);
        for (var i = 0; i < this.espacio.dinamicos.length; i++)
            this.espacio.dinamicos[i].dibujar(this.scrollX, this.scrollY);

        if (this.drawStealthForeground) {
            this.stealthForeground.dibujar();
        } else if (this.stealthStartAnimation != null) {
            this.stealthStartAnimation.dibujar(480 / 2, 320 / 2);
        }
    }

    procesarControles(){
        // Attack
        if (controles.disparo) {
            this.player.triggerWeapon();
        }

        // Eje X
        if ( controles.moverX > 0 ){
            this.player.moverX(1);

        }else if ( controles.moverX < 0){
            this.player.moverX(-1);

        } else {
            this.player.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.player.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.player.moverY(1);

        } else {
            this.player.moverY(0);
        }

    }

    checkIfCrit(damaged) {
        if ( this.player.stealthState == stealthStates.hidden ) {
            for (var i = 0; i < damaged.length; i++){
                damaged[i].kill(); // crit!
                console.log("Crit!");
            }
        }
    }
}