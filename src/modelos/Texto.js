class Texto {

    constructor(valor, x, y, font = "20px Arial") {
        this.valor = valor;
        this.x = x;
        this.y = y;

        this.font = font
    }

    dibujar (){
        contexto.font = this.font;
        contexto.fillStyle = "white";
        contexto.textAlign = "left";
        contexto.fillText(this.valor,this.x,this.y);
    }

}
