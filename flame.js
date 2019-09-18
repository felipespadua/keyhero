class Flame{
    constructor(ctx,posX,posY){
        this.x = posX;
        this.y = posY;
        this.img = new Image();
        this.img.src = "./img/flames5.png";
        this.imgWidth = 3728 ; // Largura da sprite
        this.imgHeight = 912; // Altura da sprite
        // this.cols = 5; // Numero de sprites na horizontal
        this.rows = 3; // Numero de linhas na sprite
        this.frameWidth = 615; // Largura de cada "bloco" da sprite
        this.frameHeight = 784  ; // Altura de cada "bloco" da sprite
        this.curFrame = 0; // Frame atual
        this.srcX = 0; // Posição X da sprite que irá começar o "corte" de um bloco
        this.srcY = 0; // Posição Y da sprite que irá começar o "corte" de um bloco
        // this.lastSrcY = 2 * this.frameHeight;
        this.updateFrameSpeed = 0.2;
        this.ctx = ctx;
        this.width = 120;
        this.height = 130;
        this.lifeCycle = 0;

    }
    update() {
        this.curFrame += this.updateFrameSpeed; // Isso serve pra 'retardar' o update nos frames do this
        this.srcX = (Math.floor(this.curFrame) % 6) * this.frameWidth;
        
        
    }
    draw(){
        this.lifeCycle += 1;
        if(this.lifeCycle < 25){
            this.ctx.drawImage(this.img, this.srcX, this.srcY , this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
        }else {
            this.lifeCycle = 0;
            this.img.src = "";
        }

    }
}