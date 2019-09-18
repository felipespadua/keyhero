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
        framesFlame: 0,
        missedNote: document.getElementById("missed-note"),
        start: function () {
            this.canvas.width = 700;
            this.canvas.height = 750;
            this.ctx = this.canvas.getContext("2d");
            document.getElementById("game-board").appendChild(this.canvas);
        },
        playMissedNote: function (){
            this.missedNote.play();        
        }

    };
    let keys = [];
    let flames = [];
    const keysPos = [{x: 245, y: 50},{x: 295, y: 50}, {x:340, y:50},{x:385, y: 50},{x:435, y:50}];
    const buttonPos = [{ x: 22, y: 530}, {x: 156,y: 530}, {x:290, y:530}, { x:420, y:530}, {x:553, y:530}];
    const patterns = [{ x: -0.65, y: 2},{x:-0.37, y:2},{x:-0.07, y:2},{x:0.24, y:2},{x:0.54, y:2}];
    const imgGuitar = new Image();
    const keyZone = { yInicio: 590, yFinal: 680};    
    
    function drawGuitar() {
        imgGuitar.src = "./img/guitar3.png";
        gameControl.ctx.drawImage(imgGuitar, 0, 0, gameControl.canvas.width, gameControl.canvas.height);       
        updateKeys();
       
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
            keys.push(keysFactory(keysPos[randomPos].x,keysPos[randomPos].y,randomKeyIndex,patterns[randomPos],randomPos));
        }
        if(keys.length > 0){
            for (let i = 0; i < keys.length ; i+=1) {
                keys[i].moveKey();
                keys[i].drawKey();
                if(keys[i].posY > keyZone.yFinal){
                    keys.splice(i,1); //remove a chave do array se ja passou da keyZone
                    gameControl.playMissedNote();
                } 
            }
        }
       
    }


    function keysFactory(x,y,keyIndex,pattern,randomPos){
        return new Key(x,y,gameControl.ctx,keyIndex,pattern,randomPos);
    }
    function drawFlames(){
        flames = flames.filter((flame) => flame.lifeCycle < 25);
        keys = keys.filter((key) => key.dead === false);
        if(flames.length > 0){
            flames.forEach( (flame) => {
                flame.draw();
                flame.update();
            })
        }
        
    }

    function updateBoard() {
        clearBoard();
        drawGuitar();
        drawFlames();
        requestAnimationFrame(updateBoard) ;
        

    }
    function keyOnKeyZone (keyName){
        let keyFiltered = keys.filter( key => {
            return ((keyZone.yFinal >= key.posY) && (key.posY >= keyZone.yInicio) && (key.keyName === keyName))
        })
        return keyFiltered;
    }

    window.onkeydown = function (e){
        let stringKeyCode = String.fromCharCode(e.keyCode);
        let keyFiltered = keyOnKeyZone(stringKeyCode);
        if(keyFiltered.length > 0){
            keyFiltered.forEach((key) => {
                key.dead = true;
                flames.push(new Flame(gameControl.ctx,buttonPos[key.buttonPos].x,buttonPos[key.buttonPos].y));
            })
        }else{
            gameControl.playMissedNote();
        }
    }

}