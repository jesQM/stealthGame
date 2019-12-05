var pictures = {
    background : "res/background.png",
    playerW0 : "res/entity/player_wound0.png",
    playerW1 : "res/entity/player_wound1.png",
    playerW2 : "res/entity/player_wound2.png",
    playerW3 : "res/entity/player_wound3.png",
    playerW4 : "res/entity/player_wound4.png",
    enemyW0 : "res/entity/enemy_wound0.png",
    enemyW1 : "res/entity/enemy_wound1.png",
    enemyW2 : "res/entity/enemy_wound2.png",
    enemyW3 : "res/entity/enemy_wound3.png",
    enemyW4 : "res/entity/enemy_wound4.png",
    hostageW0 : "res/entity/hostage_wound0.png",
    hostageW2 : "res/entity/hostage_wound2.png",
    dead : "res/entity/dead.png",

    squareVisionArea : "res/squareVisionArea.png",
    squareVisionArea40x40 : "res/squareVisionArea40x40.png",
    squareVisionArea80x80 : "res/squareVisionArea80x80.png",

    wall32x32 : "res/wall/32x32.png",
    wall64x32 : "res/wall/64x32.png",
    wall32x64 : "res/wall/32x64.png",
    wall64x64 : "res/wall/64x64.png",

    bush : "res/bush.png",
    llave : "res/mapElements/llave.png",
    door : "res/mapElements/door.png",
    bow : "res/bow.png",
    heart : "res/heart.png",
    skullAnim : "res/skull/skullAnim.png",

    arrowU : "res/arrow/arrowU.png",
    arrowD : "res/arrow/arrowD.png",
    arrowL : "res/arrow/arrowL.png",
    arrowR : "res/arrow/arrowR.png",

    swordR: "res/swordAnim/swordR.png",
    swordL: "res/swordAnim/swordL.png",
    swordPreparationR: "res/swordAnim/preaparationAnimR.png",
    swordPreparationL: "res/swordAnim/preaparationAnimL.png",
    swordAttackR: "res/swordAnim/attackAnimR.png",
    swordAttackL: "res/swordAnim/attackAnimL.png",

    shieldU: "res/shield/shieldU.png",
    shieldD: "res/shield/shieldD.png",
    shieldL: "res/shield/shieldL.png",
    shieldR: "res/shield/shieldR.png",

    stealthOn: "res/StealthStartAnim/animOn.png",
    stealthLastStep: "res/StealthStartAnim/10.png",
    stealthOff: "res/StealthStartAnim/animOff.png",

    pic1: "res/1.png",
    pic2: "res/2.png",

    blood1: "res/blood/bloodsplats_0001_20x20.png",
    blood2: "res/blood/bloodsplats_0002_20x20.png",
    blood3: "res/blood/bloodsplats_0003_20x20.png",
    blood4: "res/blood/bloodsplats_0004_20x20.png",
    blood5: "res/blood/bloodsplats_0005_20x20.png",
    blood6: "res/blood/bloodsplats_0006_20x20.png",
    blood7: "res/blood/bloodsplats_0007_20x20.png",
};

var audio = {
    background: "res/sound/chicago.ogg",
    background_LPF: "res/sound/chicago_LPF.ogg",

    knife1 : "res/sound/fx/knifesharpener1.wav",
    knife2 : "res/sound/fx/knifesharpener2.wav",

    slash1 : "res/sound/fx/Socapex - new_hits.wav",
    slash2 : "res/sound/fx/Socapex - new_hits_1.wav",
    slash3 : "res/sound/fx/Socapex - new_hits_3.wav",
    slash4 : "res/sound/fx/Socapex - new_hits_4.wav",
    slash5 : "res/sound/fx/Socapex - small knock.wav",
    slash6 : "res/sound/fx/Socapex - Swordsmall.wav",
    slash7 : "res/sound/fx/Socapex - Swordsmall_1.wav",
    slash8 : "res/sound/fx/Socapex - Swordsmall_2.wav",
    slash9 : "res/sound/fx/Socapex - Swordsmall_3.wav",

    shield1 : "res/sound/fx/Shield_block1.ogg",
    shield2 : "res/sound/fx/Shield_block2.ogg",
    shield3 : "res/sound/fx/Shield_block3.ogg",
    shield4 : "res/sound/fx/Shield_block4.ogg",
    shield5 : "res/sound/fx/Shield_block5.ogg",

    critical : "res/sound/fx/Critical.mp3",
};

var uncachedAudio = {
    background_seen: "res/sound/chicago_seen.ogg",
}

const cache = [];
const cacheAudio = [];
var rutasImagenes = Object.values(pictures);
var rutasAudio = Object.values(audio);
cargarImagenes(0);

function cargarImagenes(indice){
    cache[rutasImagenes[indice]] = new Image();
    cache[rutasImagenes[indice]].src = rutasImagenes[indice];
    cache[rutasImagenes[indice]].onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            cargarAudio( 0 );
        }
    }
}

function cargarAudio(index, offset = cache.length-1) {
    cacheAudio[rutasAudio[index] ] = new Audio( rutasAudio[index] );
    if ( index < rutasAudio.length-1 ){
        index++;
        cargarAudio(index);
    } else {
        removeOnloadEvent()
        iniciarJuego();
    }
}

// change the onload event, in case it triggers, nothing happens else, the old one would get triggered
function removeOnloadEvent() {
    for (let i = 0; i < rutasImagenes.length; i++) {
        cache[rutasImagenes[i]].onload = () => {};
    }
}