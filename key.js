class Key {
    constructor(posX,posY,ctx,keyIndex,pattern){
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.width = 25;
        this.height = 25;
        this.keyIndex = keyIndex;
        this.pattern = pattern;
        this.keys = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        this.keysImages = ["ABlack.png","BBlack.png","CBlack.png","DBlack.png","EBlack.png","FBlack.png","GBlack.png","HBlack.png","IBlack.png","JBlack.png","KBlack.png","LBlack.png","MBlack.png","NBlack.png","OBlack.png","PBlack.png","QBlack.png","RBlack.png","SBlack.png","TBlack.png","UBlack.png","VBlack.png","WBlack.png","XBlack.png","YBlack.png","ZBlack.png"];
        this.imgSource = `./img/${this.keysImages[keyIndex]}`;
    }
    drawKey(){
        const img = new Image();
        img.src = this.imgSource;
            this.ctx.drawImage(img, this.posX, this.posY, this.width, this.height);
        console.log(this.imgSource)
    }
    moveKey(){
        this.posX += this.pattern.x;
        this.posY += this.pattern.y;
        this.width += 0.1;
        this.height += 0.1;
    }
}