class AudioPlayer {
    constructor(src, loop = false){
        this.audio = new Audio(src);
        this.audio.loop = loop;
    }

    play(){
        this.audio.play();
    }

    pause(){
        this.audio.pause();
    }
}