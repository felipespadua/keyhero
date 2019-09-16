window.onload = function () {
    document.getElementById("start-button").onclick = function () {
        document.getElementById("start-button").style.visibility = "hidden";
        document.getElementById("logo-image").style.display = "none";
        document.getElementById("game-intro").style.display = "none";
        startGame();
    };
    var gameControl = {
        canvas: document.createElement("canvas"),
        frames: 0,
        start: function () {
            this.canvas.width = 700;
            this.canvas.height = 750;
            this.ctx = this.canvas.getContext("2d");
            document.getElementById("game-board").appendChild(this.canvas);
        }

    };
    const keys = [];
    const keysPos = [{x: 245, y: 50},{x: 295, y: 50}, {x:340, y:50},{x:385, y: 50},{x:435, y:50}];
    const patterns = [{ x: -0.65, y: 2},{x:-0.37, y:2},{x:-0.07, y:2},{x:0.24, y:2},{x:0.54, y:2}];
    const imgGuitar = new Image();
    const imgFire = new Image();
    const keyZone = { yInicio: 590, yFinal: 680};    
    
    function drawGuitar() {
        imgGuitar.src = "./img/guitar3.png";
        // imgGuitar.onload = function ()     {
            gameControl.ctx.drawImage(imgGuitar, 0, 0, gameControl.canvas.width, gameControl.canvas.height);
            updateKeys();
            
            // gameControl.ctx.fillStyle = "red";
            // gameControl.ctx.fillRect(35, 635, 635, 25);
            // gameControl.ctx.fillStyle = "blue";
            // gameControl.ctx.fillRect(70, 635, 25, 25);
            // gameControl.ctx.fillStyle = "black";
            // gameControl.ctx.fillRect(340, 50, 25, 25);
            // gameControl.ctx.fillStyle = "blue";
            // gameControl.ctx.fillRect(385, 50, 25, 25);
            // gameControl.ctx.fillStyle = "red";
            // gameControl.ctx.fillRect(430, 50, 25, 25);
        // }
       
    }

    function startGame() {
        gameControl.start();
        drawGuitar();
       
        updateBoard();
        // this.interval = setInterval(updateBoard, 1000/60);

    }

    function clearBoard() {
        gameControl.ctx.clearRect(0, 0, gameControl.canvas.width, gameControl.canvas.height);
    }
    function updateKeys(){
        gameControl.frames += 1;
        if (gameControl.frames % 60 === 0) {
            let randomPos = Math.floor(Math.random() * keysPos.length);
            let randomKeyIndex =  Math.floor(Math.random() * 26 );
            keys.push(keysFactory(keysPos[randomPos].x,keysPos[randomPos].y,randomKeyIndex,patterns[randomPos]));
        }
        if(keys.length > 0){
            for (let i = 0; i < keys.length ; i+=1) {
                keys[i].moveKey();
                keys[i].drawKey();
                if(keys[i].posY > keyZone.yFinal) keys.splice(i,1); //remove a chave do array se ja passou da keyZone
                // keys[1].moveKey(patterns[1]);
                // keys[1].drawKey();
                // keys[2].moveKey(patterns[2]);
                // keys[2].drawKey();
                // keys[3].moveKey(patterns[3]);
                // keys[3].drawKey();
                // keys[4].moveKey(patterns[4]);
                // keys[4].drawKey();
            }
        }
       
    }
    function keysFactory(x,y,keyIndex,pattern){
        return new Key(x,y,gameControl.ctx,keyIndex,pattern);
    }

    function updateBoard() {
        clearBoard();
        drawGuitar();
        drawButton();
        requestAnimationFrame(updateBoard) ;
        

    }
    function keyOnKeyZone (keyName){
        let keyFiltered = keys.filter( key => {
            // console.log("keyPosY",key.posY)
            // console.log("keyName",keyName)
            // console.log("key.keyName",key.keyName)
            // console.log((keyZone.yFinal >= key.posY) && (key.posY >= keyZone.yInicio) && (key.keyName === keyName))
            return ((keyZone.yFinal >= key.posY) && (key.posY >= keyZone.yInicio) && (key.keyName === keyName))
        })
        return keyFiltered;
    }
    function drawButton(){
        let imgButton = new Image();
        // imgButton.src = "";
        imgButton.src = "./img/green1.png";
        gameControl.ctx.drawImage(imgButton, 35, 625, 110, 60);
        setTimeout( function() {
           
            gameControl.ctx.drawImage(imgButton, 35, 625, 110, 60);
        },1000)
       
        
    }
    function drawFire(){
        imgFire.src = "./img/fire2.png";
        gameControl.ctx.drawImage(imgFire, 70, 635,200, 200);
       
        // setTimeout( function (){
        //     gameControl.ctx.drawImage(imgFire, 70, 635,30, 30);
        // },1000);
    }
    window.onkeydown = function (e){
        let stringKeyCode = String.fromCharCode(e.keyCode);
        let keyFiltered = keyOnKeyZone(stringKeyCode);
        console.log(keyFiltered);
        if(keyFiltered.length > 0){
            keyFiltered[0].fireKey();
            
        }else{
            // drawFire();
        }
    }

}