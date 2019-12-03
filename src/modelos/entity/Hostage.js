class Hostage extends Character {
    constructor(x, y){
        super( pictures.playerW0, x, y );

        this.maxHealth = 50;
        this.health = this.maxHealth;

        this.nextHostage = null;
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
}