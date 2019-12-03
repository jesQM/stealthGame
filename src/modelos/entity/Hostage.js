class Hostage extends Character {
    constructor(x, y){
        super( pictures.hostageW0, x, y );

        this.maxHealth = 50;
        this.health = this.maxHealth;

        this.nextHostage = null;

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
                while ( modelToFollow.nextHostage != null ) // Traverse the linked list of hostages
                    modelToFollow = modelToFollow.nextHostage;

                modelToFollow.nextHostage = this;
                this.movementStrategy = new FollowModelMovement(this, modelToFollow);
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
        if ( this.nextHostage != null ){
            this.nextHostage.movementStrategy.modelToFollow = this.movementStrategy.modelToFollow;
        }

        this.removeFromGame();
    }

    removeFromGame(){
        gameLayer.espacio.eliminarCuerpoDinamico(this);
    }
}