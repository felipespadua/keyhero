class Key {
    constructor(posX,posY,ctx,keyIndex,pattern){
        this.img = new Image();
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.width = 25;
        this.height = 25;
        this.keyIndex = keyIndex;
        this.pattern = pattern;
        this.keys = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        this.keysImages = ["ABlack.png","BBlack.png","CBlack.png","DBlack.png","EBlack.png","FBlack.png","GBlack.png","HBlack.png","IBlack.png","JBlack.png","KBlack.png","LBlack.png","MBlack.png","NBlack.png","OBlack.png","PBlack.png","QBlack.png","RBlack.png","SBlack.png","TBlack.png","UBlack.png","VBlack.png","WBlack.png","XBlack.png","YBlack.png","ZBlack.png"];
        this.img.src = `./img/${this.keysImages[keyIndex]}`;
        this.keyName = this.keys[keyIndex];
    }
    drawKey(){
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }
    fireKey(){
        this.img.src = "./img/fire2.png";
         setTimeout( function (){
            this.img.src = "";
        }.bind(this),300);
    }
    moveKey(){
        this.posX += this.pattern.x;
        this.posY += this.pattern.y;
        this.width += 0.15;
        this.height += 0.15;
    }
}