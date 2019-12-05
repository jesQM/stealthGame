class AudioPlayer {
    constructor(src, loop = false){
        this.audio = new Audio(src);
        //this.audio = cacheAudio[src];
        this.audio.loop = loop;
        this.audioTerminating = false;
    }

    play(){
        this.audio.play();
    }

    pause(){
        this.audio.pause();
    }

    reduceVolume(){
        let reduceAmount = 0.1;
        this.audioTerminating = true;
        let intervalId = setInterval(function () {
            if ( this.audio.volume-reduceAmount > 0 && !this.audio.paused) {
                this.audio.volume -= reduceAmount;
            } else {
                this.pause();
                clearInterval(intervalId);
            }
        }.bind(this), 1000 / 5);
    }
}