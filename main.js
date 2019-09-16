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
    function drawGuitar() {
        var img = new Image();
        img.onload = function () {
            gameControl.ctx.drawImage(img, 0, 0, gameControl.canvas.width, gameControl.canvas.height);
            updateKeys();
            // gameControl.ctx.fillStyle = "red";
            // gameControl.ctx.fillRect(245, 50, 25, 25);
            // gameControl.ctx.fillStyle = "blue";
            // gameControl.ctx.fillRect(295, 50, 25, 25);
            // gameControl.ctx.fillStyle = "black";
            // gameControl.ctx.fillRect(340, 50, 25, 25);
            // gameControl.ctx.fillStyle = "blue";
            // gameControl.ctx.fillRect(385, 50, 25, 25);
            // gameControl.ctx.fillStyle = "red";
            // gameControl.ctx.fillRect(430, 50, 25, 25);
        }
        img.src = "./img/guitar3.png";
    }

    function startGame() {
        gameControl.start();
        drawGuitar();
       

        this.interval = setInterval(updateBoard, 50);

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
        return new Key(x,y,gameControl.ctx,"A",pattern);
    }

    function updateBoard() {
        clearBoard();
        drawGuitar();
       

    }

}