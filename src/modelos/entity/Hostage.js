class Hostage extends Character {
    constructor(x, y){
        super( pictures.hostageW0, x, y );

        this.maxHealth = 50;
        this.health = this.maxHealth;

        this.woundMaxCooldown = 0;

        this.nextHostage = null;
        this.previousHostage = null;

        this.woundedPictures = [
            pictures.hostageW0,
            pictures.hostageW0,
            pictures.hostageW0,
            pictures.hostageW2,
            pictures.hostageW2,
        ];
    }

    actualizar() {
        super.actualizar();
        if ( this.movementStrategy == null ){
            if ( this.colisiona( gameLayer.player ) ){

                // We follow the last hostage (chainlike)
                let modelToFollow = gameLayer.player;
                while ( modelToFollow.nextHostage != null ) { // Traverse the linked list of hostages
                    modelToFollow = modelToFollow.nextHostage;
                }

                modelToFollow.nextHostage = this;
                this.previousHostage = modelToFollow;
                this.movementStrategy = new FollowModelMovement(this, modelToFollow);

                this.addAsTarget();
            }
        }
    }

    getArribaDinamico(){
        return (this.y - this.alto/2) + this.alto/10;
    }
    getAbajoDinamico(){
        return (this.y + this.alto/2) - this.alto/10;
    }
    getDerechaDinamico(){
        return (this.x + this.ancho/2) - this.ancho/10;
    }
    getIzquierdaDinamico(){
        return (this.x - this.ancho/2) + this.ancho/10;
    }

    kill() {
        super.kill();
        this.previousHostage.nextHostage = this.nextHostage;

        if ( this.nextHostage != null ){
            this.nextHostage.movementStrategy.modelToFollow = this.movementStrategy.modelToFollow;
            this.nextHostage.previousHostage = this.previousHostage;
        }

        this.removeFromGame();
    }

    removeFromGame(){
        gameLayer.espacio.eliminarCuerpoDinamico(this);
        for (let i = 0; i < gameLayer.enemies.length; i++){
            gameLayer.enemies[i].weapon.removeTarget(this);
        }
    }

    addAsTarget() {
        for (let i = 0; i < gameLayer.enemies.length; i++){
            gameLayer.enemies[i].weapon.addTarget(this);
        }
    }
}