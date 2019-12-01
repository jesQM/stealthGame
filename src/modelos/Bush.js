class Bush extends Modelo{
    constructor(x, y){
        super(pictures.bush, x, y);
    }

    colisiona(modelo) {
        var colisiona = false;

        if ( modelo.x  <=  this.x + this.ancho/2
            && modelo.x  >= this.x - this.ancho/2
            && this.y + this.alto/2 >= modelo.y
            && this.y - this.alto/2 <= modelo.y ){

            colisiona = true;

        }
        return colisiona;
    }
}