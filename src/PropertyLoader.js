class PropertyLoader {
    constructor (gamelayer) {
        this.gameLayer = gamelayer;
    }

    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function(){
            var texto = fichero.responseText; // el archivo en si, el texto
            var lineas = texto.split('\n');

            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];

                var data = linea.split(';');
                if (data.length == 1 || data[0] == '#') continue;

                let simbolo = data[0];
                let pos = data[1].split(',');
                let x = pos[0];
                let y = pos[1];
                let direction = data[2];

                // waypoints if any
                let waypoints = []
                for (let j = 3; j < data.length; j++){
                    pos = data[j].split(','); // get x y of each waypoint
                    let wx = pos[0];
                    let wy = pos[1];

                    waypoints.push( [wx,wy] );
                }

                this.cargarObjetoMapa(simbolo, x, y, direction, waypoints);

            }
        }.bind(this); // pa que sepa qué es 'this'

        fichero.send();
    }

    cargarObjetoMapa(simbolo, x, y, direction = "0", waypoints = []){
        switch (simbolo) {
            case "J":
                this.gameLayer.player = new Player(x, y); // esto lo coloca según la esquina
                this.gameLayer.player.x = this.gameLayer.player.x - this.gameLayer.player.ancho / 2;
                this.gameLayer.player.y = this.gameLayer.player.y - this.gameLayer.player.alto / 2; // esto lo centra
                this.gameLayer.espacio.agregarCuerpoDinamico(this.gameLayer.player);
                break;
            case "S":
                var enemy = new SwordEnemy(x, y);
                enemy.x = enemy.x- enemy.ancho / 2;
                enemy.y = enemy.y - enemy.alto / 2;
                enemy.movementStrategy.orientationOfEntity = parseInt( direction );
                if ( waypoints.length > 1 )
                    enemy.setToPatrol(waypoints);
                this.gameLayer.enemies.push(enemy);
                this.gameLayer.espacio.agregarCuerpoDinamico(enemy);
                break;
        }
    }
}