class LevelLoader {
    constructor (gamelayer) {
        this.gameLayer = gamelayer;
    }

    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function(){
            var texto = fichero.responseText; // el archivo en si, el texto
            var lineas = texto.split('\n');

            this.anchoMapa = (lineas[0].length-1) * 32;
            this.altoMapa = (lineas.length-1) * 32;

            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40 / 2 + j * 32; // el '40/2' es por el centro, y el offset es lo que hay al otro lado del +
                    var y = 32 + i * 32;
                    this.cargarObjetoMapa(simbolo, x, y);
                }
            }
        }.bind(this); // pa que sepa qué es 'this'

        fichero.send();
    }

    cargarObjetoMapa(simbolo, x, y){
        switch (simbolo) {
            case "J":
                this.gameLayer.player = new Player(x, y); // esto lo coloca según la esquina
                this.gameLayer.player.x = this.gameLayer.player.x - this.gameLayer.player.ancho / 2;
                this.gameLayer.player.y = this.gameLayer.player.y - this.gameLayer.player.alto / 2; // esto lo centra
                this.gameLayer.espacio.agregarCuerpoDinamico(this.gameLayer.player);
                break;
            case "K":
                var llave = new Key(x, y);
                llave.x = llave.x- llave.ancho / 2;
                llave.y = llave.y - llave.alto / 2;
                this.gameLayer.espacio.agregarCuerpoDinamico(llave);
                break;
            case "D":
                var door = new Door(x, y);
                door.x = door.x- door.ancho / 2;
                door.y = door.y - door.alto / 2;
                this.gameLayer.espacio.agregarCuerpoDinamico(door);
                break;
            case "B":
                var bush = new Bush(x, y);
                bush.x = bush.x - bush.ancho / 2;
                bush.y = bush.y - bush.alto / 2;
                this.gameLayer.bushes.push(bush);
                break;
            case "#":
                var bloque = new Wall(pictures.wall32x32, x, y);
                bloque.x = bloque.x - bloque.ancho / 2;
                bloque.y = bloque.y - bloque.alto / 2;
                this.gameLayer.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "1":
                var bloque = new Wall(pictures.wall64x32, x, y);
                bloque.x = bloque.x - bloque.ancho / 2;
                bloque.y = bloque.y - bloque.alto / 2;
                this.gameLayer.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "2":
                var bloque = new Wall(pictures.wall32x64, x, y);
                bloque.x = bloque.x - bloque.ancho / 2;
                bloque.y = bloque.y - bloque.alto / 2;
                this.gameLayer.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "3":
                var bloque = new Wall(pictures.wall64x64, x, y);
                bloque.x = bloque.x - bloque.ancho / 2;
                bloque.y = bloque.y - bloque.alto / 2;
                this.gameLayer.espacio.agregarCuerpoEstatico(bloque);
                break;
        }
    }
}