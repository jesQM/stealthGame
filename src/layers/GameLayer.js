class GameLayer extends Layer {

    constructor() {
        super();
        this.maxLevel = 2;

        this.stats = new Stats();
        this.music = new AudioManager();

        this.start(0);
    }

    finishLevel() {
        this.stats.points += this.savedHostages();
        this.music.stopPersecution();
        if ( this.levelNumber < this.maxLevel ) {
            this.start(this.levelNumber + 1);
        } else {

            this.stats.endTime = new Date();
            statsLayer.stats = this.stats;
            statsLayer.calculate();
            changeLayer( statsLayer );
        }
    }

    playerWasKilled(){
        this.stats.playerDeaths++;
        this.playerAlive = false;

        let animSkull = new Animacion(pictures.skullAnim, 200, 157, 6, 5, function () {
            this.music.stopPersecution();
            this.start( this.levelNumber );
        }.bind(this) );
        let animBorder = new Animacion(pictures.stealthOn, 480,320, 3,10);

        this.foregroundAnimations.push( animSkull );
        this.foregroundAnimations.push( animBorder );
    }

    savedHostages() {
        let count = 0;
        let modelToFollow = gameLayer.player;
        while ( modelToFollow.nextHostage != null ) { // Traverse the linked list of hostages
            modelToFollow = modelToFollow.nextHostage;
            count++;
        }

        return count;
    }

    startMusic() {
        this.music.playBackground();
    }

    start (levelNumber){
        this.levelNumber = levelNumber;

        this.espacio = new Espacio(0);

        this.scrollX = 0;
        this.scrollY = 0;
        this.player = null;

        this.bushes = [];
        this.enemies = [];
        this.visualEffects = [];
        this.foregroundAnimations = [];

        this.hud = new HUD(3, 40, 270);
        this.healthMeter = new HUD(4, 40, 50);

        this.backGround = new Fondo(pictures.background, 480/2, 320/2);

        new LevelLoader(this).cargarMapa("res/map/map"+levelNumber+".txt");
        new PropertyLoader(this).cargarMapa("res/map/properties"+levelNumber+".txt");

        this.playerAlive = true;

        this.stealthStartAnimation = null;
        this.updateStealthAnimation = false;
        this.stealthForeground = new Fondo(pictures.stealthLastStep, 480/2, 320/2);

        this.updateHealth();
        for (var i = 0; i < this.enemies.length; i++)
            this.enemies[i].weapon.addTarget(this.player);
    }


    actualizar (){

        this.espacio.actualizar();
        for (var i = 0; i < this.espacio.dinamicos.length; i++)
            this.espacio.dinamicos[i].actualizar();
        for (var i = 0; i < this.visualEffects.length; i++)
            this.visualEffects[i].actualizar();
        for (var i = 0; i < this.foregroundAnimations.length; i++)
            this.foregroundAnimations[i].actualizar();

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
                    this.music.playBackgroundBush();
                }
            }
        } else {
            if (this.player.inBush) {
                this.player.inBush = false;
                this.player.setStealthState(stealthStates.visible);
                this.music.playBackground();
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
        for (var i = 0; i < this.visualEffects.length; i++)
            this.visualEffects[i].dibujar(this.scrollX, this.scrollY);
        for (var i = 0; i < this.bushes.length; i++)
            this.bushes[i].dibujar(this.scrollX, this.scrollY);
        for (var i = 0; i < this.espacio.dinamicos.length; i++)
            this.espacio.dinamicos[i].dibujar(this.scrollX, this.scrollY);

        for (var i = 0; i < this.foregroundAnimations.length; i++)
            this.foregroundAnimations[i].dibujar(480 / 2, 320 / 2);

        if (this.drawStealthForeground) {
            this.stealthForeground.dibujar();
        } else if (this.stealthStartAnimation != null) {
            this.stealthStartAnimation.dibujar(480 / 2, 320 / 2);
        }

        this.hud.dibujar();
        this.healthMeter.dibujar();
    }

    procesarControles(){
        if ( !this.playerAlive ) return;

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

        // Weapon change
        if ( controles.weapon != 0) {
            this.player.changeWeapon( controles.weapon-1 )
        }

        if ( controles.mute ) {
            if ( this.music.mute )
                this.music.enableSound();
            else
                this.music.disableSound();
            controles.mute = false;
        }
        if ( controles.muteMusic ) {
            if ( this.music.muteMusic )
                this.music.enableSound();
            else
                this.music.disableMusic();
            controles.muteMusic = false;
        }
    }

    checkIfCrit(damaged) {
        if ( this.player.stealthState == stealthStates.hidden ) {
            for (var i = 0; i < damaged.length; i++){
                damaged[i].kill(); // crit!
                this.music.playCriticalHit();
            }
        }
    }

    addItemToHUD(itemsrc, slot) {
        this.hud.setItemInSlot(itemsrc, slot);
    }
    addPictureToSlotInHUD(itemsrc, slot) {
        this.hud.setPictureInSlot(itemsrc, slot);
    }

    updateHealth() {
        let numHearts = this.player.health / (this.player.maxHealth/this.healthMeter.numberOfSlots);
        for (let i = 0; i < numHearts; i++) {
            this.healthMeter.setItemInSlot(pictures.heart, i);
        }
        for (let i = numHearts; i < this.healthMeter.numberOfSlots; i++) {
            this.healthMeter.slots[i].itemHolding = null;
        }
    }

    removeEffect(visualEffect) {
        for (var i = 0; i < this.visualEffects.length; i++){
            if (this.visualEffects[i] == visualEffect){
                this.visualEffects.splice(i,1);
                break;
            }
        }
    }

    createBloodEffect(x,y) {
        let possiblePics = [];
            possiblePics.push( pictures.blood1 );
            possiblePics.push( pictures.blood2 );
            possiblePics.push( pictures.blood3 );
            possiblePics.push( pictures.blood4 );
            possiblePics.push( pictures.blood5 );
            possiblePics.push( pictures.blood6 );
            possiblePics.push( pictures.blood7 );

        let index = Math.floor((Math.random() * possiblePics.length))
        let pic = possiblePics[ index ]

        let offsetX = Math.floor((Math.random() * 21) - 10);
        let offsetY = Math.floor((Math.random() * 21) - 10);
        this.visualEffects.push( new VisualEffect( pic, x + offsetX, y + offsetY, 200 ) );
    }
}