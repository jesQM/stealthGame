class Espacio {

    constructor(gravedad){
        this.gravedad = gravedad;
        this.dinamicos = []; // se pueden atravesar
        this.estaticos = []; // no se pueden atravesat
    }

    agregarCuerpoEstatico(modelo){
        this.estaticos.push(modelo);
    }
    agregarCuerpoDinamico(modelo){
        this.dinamicos.push(modelo);
    }

    eliminarCuerpoEstatico(modelo){
        for (var i = 0; i < this.estaticos.length; i++){
            if (modelo == this.estaticos[i]){
                this.estaticos.splice(i,1);
                break;
            }
        }
    }
    eliminarCuerpoDinamico(modelo){
        for (var i = 0; i < this.dinamicos.length; i++){
            if (modelo == this.dinamicos[i]){
                this.dinamicos.splice(i,1);
                break;
            }
        }
    }

    actualizar(){
        for( var i=0; i < this.dinamicos.length; i++){

            // aplicar gravedad (dinamicos)
            if (typeof this.dinamicos[i].gravityAffected === "undefined" || this.dinamicos[i].gravityAffected == true){
                this.dinamicos[i].vy = this.dinamicos[i].vy + this.gravedad;
            }

            // maxima velocidad de caida por gravedad, capamos pa que no acelere demasiado
            if (this.dinamicos[i].vy > 20) {
                this.dinamicos[i].vy = 20;
            }

            // reiniciar choques
            this.dinamicos[i].choqueAbajo = false;
            this.dinamicos[i].fueraPorDerecha = true; // suponemos que si se mueve, se cae
            this.dinamicos[i].fueraPorIzquierda = true;

            this.moverDerecha(i);
            if (typeof this.dinamicos[i] === "undefined") return;
            this.moverIzquierda(i);
            if (typeof this.dinamicos[i] === "undefined") return;
            this.moverAbajo(i);
            this.moverArriba(i);
        }

    }

    moverDerecha(i){
        if ( this.dinamicos[i].vx > 0){
            var movimientoPosible = this.dinamicos[i].vx;
            // El mejor "idealmente" vx partimos de ese

            for(var j=0; j < this.estaticos.length; j++){
                var arribaDinamico
                    = this.dinamicos[i].getArribaDinamico();
                //= this.dinamicos[i].y - this.dinamicos[i].alto/2;
                var abajoDinamico
                    = this.dinamicos[i].getAbajoDinamico();
                //= this.dinamicos[i].y + this.dinamicos[i].alto/2;
                var derechaDinamico
                    = this.dinamicos[i].getDerechaDinamico();
                //= this.dinamicos[i].x + this.dinamicos[i].ancho/2;
                var izquierdaEstatico
                    = this.estaticos[j].x - this.estaticos[j].ancho/2;
                var arribaEstatico
                    = this.estaticos[j].y - this.estaticos[j].alto/2;
                var abajoEstatico
                    = this.estaticos[j].y + this.estaticos[j].alto/2;

                // Alerta!, Elemento estático en la trayectoria.
                if ( (derechaDinamico + this.dinamicos[i].vx) >= izquierdaEstatico
                    && derechaDinamico <= izquierdaEstatico
                    && arribaEstatico < abajoDinamico
                    && abajoEstatico > arribaDinamico){

                    // Comprobamos si la distancia al estático es menor
                    // que nuestro movimientoPosible actual
                    if (movimientoPosible >= izquierdaEstatico - derechaDinamico){
                        // La distancia es MENOR que nuestro movimiento posible
                        // Tenemos que actualizar el movimiento posible a uno menor
                        movimientoPosible = izquierdaEstatico - derechaDinamico ;
                    }
                }
            }
            // Ya se han comprobado todos los estáticos
            this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
            this.dinamicos[i].vx = movimientoPosible;
        }
    }

    moverIzquierda(i){
        if ( this.dinamicos[i].vx < 0){
            var movimientoPosible = this.dinamicos[i].vx;
            // El mejor "idealmente" vx partimos de ese

            for(var j=0; j < this.estaticos.length; j++){
                var arribaDinamico
                    = this.dinamicos[i].getArribaDinamico();
                //= this.dinamicos[i].y - this.dinamicos[i].alto/2;
                var abajoDinamico
                    = this.dinamicos[i].getAbajoDinamico();
                //= this.dinamicos[i].y + this.dinamicos[i].alto/2;
                var izquierdaDinamico
                    = this.dinamicos[i].getIzquierdaDinamico();
                //= this.dinamicos[i].x - this.dinamicos[i].ancho/2;
                var derechaEstatico
                    = this.estaticos[j].x + this.estaticos[j].ancho/2;
                var arribaEstatico
                    = this.estaticos[j].y - this.estaticos[j].alto/2;
                var abajoEstatico
                    = this.estaticos[j].y + this.estaticos[j].alto/2;

                // Alerta!, Elemento estático en la trayectoria.
                if ( (izquierdaDinamico + this.dinamicos[i].vx) <= derechaEstatico
                    && izquierdaDinamico >= derechaEstatico
                    && arribaEstatico < abajoDinamico
                    && abajoEstatico > arribaDinamico ){

                    // Comprobamos si la distancia al estático es mayor
                    // que nuestro movimientoPosible actual
                    if (movimientoPosible <= derechaEstatico - izquierdaDinamico ){
                        // La distancia es MAYOR que nuestro movimiento posible
                        // Tenemos que actualizar el movimiento posible a uno mayor
                        movimientoPosible = derechaEstatico - izquierdaDinamico ;
                    }
                }
            }

            // Ya se han comprobado todos los estaticos
            this.dinamicos[i].x = this.dinamicos[i].x + movimientoPosible;
            this.dinamicos[i].vx = movimientoPosible;
        }
    }

    moverAbajo(i){
        if ( this.dinamicos[i].vy > 0){
            var movimientoPosible = this.dinamicos[i].vy;
            // El mejor "idealmente" es la velocidad vy.

            for(var j=0; j < this.estaticos.length; j++){
                var arribaDinamico
                    = this.dinamicos[i].getArribaDinamico();
                //= this.dinamicos[i].y - this.dinamicos[i].alto/2;
                var abajoDinamico
                    = this.dinamicos[i].getAbajoDinamico();
                //= this.dinamicos[i].y + this.dinamicos[i].alto/2;
                var derechaDinamico
                    = this.dinamicos[i].getDerechaDinamico();
                //= this.dinamicos[i].x + this.dinamicos[i].ancho/2;
                var izquierdaDinamico
                    = this.dinamicos[i].getIzquierdaDinamico();
                //= this.dinamicos[i].x - this.dinamicos[i].ancho/2;
                var arribaEstatico
                    = this.estaticos[j].y - this.estaticos[j].alto/2;
                var abajoEstatico
                    = this.estaticos[j].y + this.estaticos[j].alto/2;
                var derechaEstatico
                    = this.estaticos[j].x + this.estaticos[j].ancho/2;
                var izquierdaEstatico
                    = this.estaticos[j].x - this.estaticos[j].ancho/2;

                // Alerta!, Elemento estático en la trayectoria.
                if ( (abajoDinamico +  this.dinamicos[i].vy) >= arribaEstatico &&
                    arribaDinamico < abajoEstatico
                    && izquierdaDinamico < derechaEstatico
                    && derechaDinamico > izquierdaEstatico ){

                    // Comprobamos si la distancia al estático es menor
                    // que nuestro movimientoPosible actual
                    if (movimientoPosible >= arribaEstatico - abajoDinamico ){
                        // La distancia es MENOR que nuestro movimiento posible
                        // Tenemos que actualizar el movimiento posible a uno menor
                        movimientoPosible = arribaEstatico - abajoDinamico;
                        this.dinamicos[i].choqueAbajo = true;
                        if (this.dinamicos[i] == gameLayer.jugador)
                            this.estaticos[j].pisadoPorJugador()();

                        if (derechaDinamico <= derechaEstatico) {
                            this.dinamicos[i].fueraPorDerecha = false;
                        }

                        if (izquierdaDinamico >= izquierdaEstatico) {
                            this.dinamicos[i].fueraPorIzquierda = false;
                        }
                    }
                }
            }

            // Ya se han comprobado todos los estáticos
            this.dinamicos[i].y = this.dinamicos[i].y + movimientoPosible;
            this.dinamicos[i].vy = movimientoPosible;
        }
    }
    moverArriba(i){
        if ( this.dinamicos[i].vy < 0){
            var movimientoPosible = this.dinamicos[i].vy;
            // El mejor "idealmente" es la velocidad vy.

            for(var j=0; j < this.estaticos.length; j++){
                var arribaDinamico
                    = this.dinamicos[i].getArribaDinamico();
                    //= this.dinamicos[i].y - this.dinamicos[i].alto/2;
                var abajoDinamico
                    = this.dinamicos[i].getAbajoDinamico();
                    //= this.dinamicos[i].y + this.dinamicos[i].alto/2;
                var derechaDinamico
                    = this.dinamicos[i].getDerechaDinamico();
                    //= this.dinamicos[i].x + this.dinamicos[i].ancho/2;
                var izquierdaDinamico
                    = this.dinamicos[i].getIzquierdaDinamico();
                    //= this.dinamicos[i].x - this.dinamicos[i].ancho/2;
                var arribaEstatico
                    = this.estaticos[j].y - this.estaticos[j].alto/2;
                var abajoEstatico
                    = this.estaticos[j].y + this.estaticos[j].alto/2;
                var derechaEstatico
                    = this.estaticos[j].x + this.estaticos[j].ancho/2;
                var izquierdaEstatico
                    = this.estaticos[j].x - this.estaticos[j].ancho/2;

                // Alerta!, Elemento estático en la trayectoria
                if ( (arribaDinamico +  this.dinamicos[i].vy) <= abajoEstatico &&
                    abajoDinamico > arribaEstatico
                    && izquierdaDinamico < derechaEstatico
                    && derechaDinamico > izquierdaEstatico ){

                    // Comprobamos si la distancia al estático es MAYOR
                    // que nuestro movimientoPosible actual
                    if (movimientoPosible <= abajoEstatico - arribaDinamico ){
                        // La distancia es MAYOR que nuestro movimiento posible
                        // Tenemos que actualizar el movimiento posible a uno mayor

                        movimientoPosible = abajoEstatico - arribaDinamico ;
                    }

                }
            }

            this.dinamicos[i].y = this.dinamicos[i].y + movimientoPosible;
            this.dinamicos[i].vy = movimientoPosible;
        }
    }
}