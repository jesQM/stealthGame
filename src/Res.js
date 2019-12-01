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
    arrow : "res/bow.png",

    swordR: "res/swordAnim/swordR.png",
    swordL: "res/swordAnim/swordL.png",
    swordPreparationR: "res/swordAnim/preaparationAnimR.png",
    swordPreparationL: "res/swordAnim/preaparationAnimL.png",
    swordAttackR: "res/swordAnim/attackAnimR.png",
    swordAttackL: "res/swordAnim/attackAnimL.png",

    stealthOn: "res/StealthStartAnim/animOn.png",
    stealthLastStep: "res/StealthStartAnim/10.png",
    stealthOff: "res/StealthStartAnim/animOff.png",
}

var rutasImagenes = Object.values(pictures);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}