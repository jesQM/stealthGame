class StatsLayer extends Layer {
    constructor() {
        super();

        this.backGround = new Fondo(pictures.background, 480/2, 320/2);
        this.texts = [];

        this.textTimePlayed = new Texto("You played: x minutes", 20, 40 );
        this.textDeathCount = new Texto("You died: x times", 20, 70 );
        this.textPeopleSaved = new Texto("You saved: x hostages", 20, 100 );

        this.texts.push( this.textTimePlayed );
        this.texts.push( this.textDeathCount );
        this.texts.push( this.textPeopleSaved );

        this.counter = 15;
    }

    actualizar (){
        if ( this.counter > 0 )
            this.counter--;
    }

    dibujar (){
        this.backGround.dibujar();
        for (let i = 0; i < this.texts.length; i++)
            this.texts[i].dibujar();
    }

    procesarControles(){
        if (controles.continuar) {
            if ( this.counter <= 0 )
                this.texts = this.getCredits();
        }
    }

    setTimePlayed( time ) {
        this.textTimePlayed.valor = "You played: "+time+" minutes";
    }
    setDeathCount( number ) {
        this.textDeathCount.valor = "You died: "+number+" times";
    }
    setPeopleSaved( number ) {
        this.textPeopleSaved.valor = "You saved: "+number+" hostages";
    }

    getCredits() {
        return [];
    }
}