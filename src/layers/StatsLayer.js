class StatsLayer extends Layer {
    constructor() {
        super();

        this.backGround = new Fondo(pictures.background, 480/2, 320/2);
        this.texts = [];

        this.textTimePlayed = new Texto("You played: x minutes", 20, 40 );
        this.textDeathCount = new Texto("You died: x times", 20, 70 );
        this.textPeopleSaved = new Texto("You saved: x hostages", 20, 100 );

        this.textEnemiesKilled = new Texto("You killed: x enemies", 20, 140 );
        this.textTimesSlashed = new Texto("You slashed: x times", 20, 170 );

        this.texts.push( this.textTimePlayed );
        this.texts.push( this.textDeathCount );
        this.texts.push( this.textPeopleSaved );
        //this.texts.push( this.textEnemiesKilled );
        this.texts.push( this.textTimesSlashed );

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

    setTimePlayed( minutes, seconds = 0 ) {
        if ( seconds == 0 )
            this.textTimePlayed.valor = "You played: "+minutes+" minutes";
        else
            this.textTimePlayed.valor = "You played: "+minutes+" min. "+ seconds + " seconds";
    }
    setDeathCount( number ) {
        this.textDeathCount.valor = "You died: "+number+" times";
    }
    setPeopleSaved( number ) {
        this.textPeopleSaved.valor = "You saved: "+number+" hostages";
    }
    setEnemiesKilled(enemiesKilled) {
        this.textEnemiesKilled.valor = "You killed: "+enemiesKilled+" enemies";
    }

    setTimesSlashed(timesSlashed) {
        this.textTimesSlashed.valor = "You slashed: "+timesSlashed+" times";
    }

    getCredits() {
        return [
            new Texto("Repository: https://github.com/jesQM/stealthGame", 20, 40 ),
            new Texto("External models:", 10, 70 ),
            new Texto("* Key model: https://opengameart.org/users/armisius", 20, 100, "10px Arial" ),
            new Texto("* Door model: Castle door by Tuomo Untinen", 20, 120, "10px Arial" ),
            new Texto("* Bow model: Heather Lee Harvey, EmeraldActivities.com & http://opengameart.org/users/emerald", 20, 140,"10px Arial"  ),
            new Texto("* Heart model: NicoleMarieProductions (https://opengameart.org/users/nicole-marie-t)", 20, 160,"10px Arial"  ),
            new Texto("* Blood splats: PWL (https://opengameart.org/users/pwl)", 20, 180,"10px Arial"  ),
            new Texto("Sounds:", 10, 210 ),
            new Texto("* Knife sounds: https://opengameart.org/content/knife-sharpening-slice-1, and knife-sharpening-slice-2", 20, 240,"10px Arial"  ),
            new Texto("* Other sounds: Philippe Groarke (https://opengameart.org/content/punches-hits-swords-and-squishes)", 20, 260,"10px Arial"  ),
            new Texto("* Background track: Perfect Dark (N64 year:2000) Chicago theme.", 20, 280,"10px Arial"  ),
        ];
    }

    calculate(){
        this.setTimePlayed( this.stats.calculateMinutesPlayed(), this.stats.calculateSecondsPlayed() );
        this.setDeathCount( this.stats.playerDeaths );
        this.setPeopleSaved( this.stats.points );

        this.setEnemiesKilled( this.stats.enemiesKilled );
        this.setTimesSlashed( this.stats.timesSlashed );
    }
}

class Stats {
    constructor(){
        this.points = 0;
        this.playerDeaths = 0;
        this.startTime = null;
        this.endTime = null;

        this.timesSlashed = 0;
        this.enemiesKilled = 0;
    }

    calculateMinutesPlayed() {
        let start = this.startTime.getTime();
        let end = this.endTime.getTime();

        let millisecondsPlayed = end - start;
        let seconds = millisecondsPlayed / 1000;

        return Math.floor(seconds/60);
    }

    calculateSecondsPlayed() {
        let start = this.startTime.getTime();
        let end = this.endTime.getTime();

        let millisecondsPlayed = end - start;
        let seconds = millisecondsPlayed / 1000;

        return Math.floor(seconds % 60);
    }
}