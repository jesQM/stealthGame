class AudioManager {

    constructor(){
        this.background = null;
        this.background_LPF = null;
        this.muteMusic = false;
        this.mute = false;

        this.persecution = null;
    }

    playSwordWeaponSelect(){
        if ( this.mute ) return;

        let possibleSounds = [];
            possibleSounds.push( audio.knife1 );
            possibleSounds.push( audio.knife2 );

        let index = Math.floor((Math.random() * possibleSounds.length))

        new AudioPlayer( possibleSounds[ index ] ).play();
    }

    playShieldWeaponSelect() {
        if ( this.mute ) return;
        //TODO;
    }

    playSwordSlash(){
        if ( this.mute ) return;
        let possibleSounds = [];
            possibleSounds.push( audio.slash1 );
            possibleSounds.push( audio.slash2 );
            possibleSounds.push( audio.slash3 );
            possibleSounds.push( audio.slash4 );
            possibleSounds.push( audio.slash5 );
            possibleSounds.push( audio.slash6 );
            possibleSounds.push( audio.slash7 );
            possibleSounds.push( audio.slash8 );
            possibleSounds.push( audio.slash9 );

        let index = Math.floor((Math.random() * possibleSounds.length))

        new AudioPlayer( possibleSounds[ index ] ).play();
    }

    playShieldBlock(){
        if ( this.mute ) return;
        //TODO;
    }

    playBackground(){
        if ( this.mute || this.muteMusic ) return;
        if ( this.background != null && !this.background.audio.paused ) return;

        let currentTime = 0;
        if ( this.background_LPF != null ) currentTime = this.background_LPF.audio.currentTime;

        this.background = new AudioPlayer( audio.background, true );
        this.background.audio.currentTime = currentTime;
        this.background.play();
        if ( this.background_LPF != null ) this.background_LPF.pause();
    }

    playBackgroundBush(){
        if ( this.mute || this.muteMusic ) return;
        if ( this.background_LPF != null && !this.background_LPF.audio.paused ) return;

        let currentTime = 0;
        if ( this.background != null ) currentTime = this.background.audio.currentTime;

        this.background_LPF = new AudioPlayer( audio.background_LPF, true );
        this.background_LPF.audio.currentTime = currentTime;
        this.background_LPF.play();
        if ( this.background != null ) this.background.pause();
    }

    changeTrack(current, substitute, track) {
        let currentTime = 0;
        if ( current != null ) currentTime = current.audio.currentTime;

        substitute = new AudioPlayer( track, true );
        substitute.audio.currentTime = currentTime;
        substitute.play();
        if ( current != null ) current.pause();
    }

    playPersecution() {
        if ( this.mute || this.muteMusic ) return;
        if ( this.persecution != null && !this.persecution.audio.paused && !this.persecution.audioTerminating) return;

        if ( this.persecution != null && this.persecution.audioTerminating ) this.persecution.pause();
        this.persecution = new AudioPlayer( audio.background_seen, true );
        this.persecution.play();

        if ( this.background != null && !this.background.audio.paused ) this.background.pause();
        if ( this.background_LPF != null && !this.background_LPF.audio.paused ) this.background_LPF.pause();

    }

    stopPersecution() {
        if ( this.mute || this.muteMusic ) return;
        if ( this.persecution == null || this.persecution.audio.paused ) return;

        this.playBackground();
        this.persecution.reduceVolume();
    }

    disableSound(){
        this.mute = true;
        this.disableMusic();
    }

    disableMusic(){
        this.muteMusic = true;
        if ( this.background != null ) this.background.pause();
        if ( this.background_LPF != null ) this.background_LPF.pause();
        if ( this.persecution != null ) this.persecution.pause();
    }

    enableSound(){
        this.mute = false;
        this.muteMusic = false;
        this.playBackground();
    }
}