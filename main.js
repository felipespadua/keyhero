window.onload = function () {
    var gameControl = {
        canvas: document.createElement("canvas"),
        frames: 0,
        framesFlame: 0,
        framesMusic: 0,
        missedNote: document.getElementById("missed-note"),
        selectList: document.getElementById("selectList"),
        music:  document.getElementById("main-music"),
        started: false,
        score: 0,
        countKeys: 0,
        errorsKeys: 0,
        gameOver: false,
        percentageScore: function(){
            return  100 * (this.errorsKeys / this.countKeys);
        },
        checkMusicSelected: function(){
            return document.getElementById("selectList").value != 0;
        },
        setMusic: function () {
            switch(selectList.value){
                case "1":
                    this.framesMusic = music1.frames;
                    this.music.src = "./music/kiss-rockandrollallnight.mp3";
                    break;
                case "2": 
                    this.framesMusic = music2.frames;
                    this.music.src = "./music/poison-talkdirtytome.mp3";
                    break;
                default:
                    this.music.src = "";
            }
           
        },
        start: function () {
            this.started = true;
            this.canvas.width = 700;
            this.canvas.height = 750;
            this.ctx = this.canvas.getContext("2d");
            document.getElementById("game-board").appendChild(this.canvas);
        },
        playMissedNote: function (){
            let random = Math.floor(Math.random() * 2 ) + 1;
            this.missedNote.src = `./music/missed-note-half${random}.mp3`;
            this.missedNote.play();        
        },
        startMusic: function (){    
            this.setMusic();
            this.music.volume = 0.6;
            this.music.play();
        }
    };
    let keys = [];
    let flames = [];
    const keysPos = [{x: 245, y: 50},{x: 295, y: 50}, {x:340, y:50},{x:385, y: 50},{x:435, y:50}];
    const buttonPos = [{ x: 22, y: 530}, {x: 156,y: 530}, {x:290, y:530}, { x:420, y:530}, {x:553, y:530}];
    const patterns = [{ x: -1.10, y: 3},{x:-0.62, y:3},{x:-0.15, y:3},{x:0.33, y:3},{x:0.80, y:3}];
    const imgGuitar = new Image();
    const imgGuitarScore = new Image();
    const imgEndGame = new this.Image();
    const keyZone = { yInicio: 580, yFinal: 670};    

    document.getElementById("start-button").onclick = function () {
        if(gameControl.checkMusicSelected()){
            startGame();
            document.getElementById("start-button").style.visibility = "hidden";
            document.getElementById("game-title").style.display = "none";
            document.getElementById("game-intro").style.display = "none";
            document.getElementById("myVideo").style.display = "block";
            // document.getElementById("myVideo").style.visibility = "inherit";
            
        }else{
            document.getElementById("select-alert").style.display = "block";
        }
    };
    
    document.getElementById("again-button").onclick = function () {
        if(gameControl.checkMusicSelected()){
            startGame();
            document.getElementById("start-button").style.visibility = "hidden";
            document.getElementById("game-title").style.display = "none";
            document.getElementById("game-intro").style.display = "none";
            document.getElementById("myVideo").style.display = "block";
            // document.getElementById("myVideo").style.visibility = "inherit";
            
        }else{
            document.getElementById("select-alert").style.display = "block";
        }
    };
    function drawScore(){
        imgGuitarScore.src = "./img/guitarScore.svg";
        gameControl.ctx.drawImage(imgGuitarScore, 530, 65, 200, 150);     
        gameControl.ctx.font = "30px Nightmare-Hero";
        gameControl.ctx.fillStyle = "white";
        gameControl.ctx.fillText(`Score: ${gameControl.score}`, 540,170);
       
    } 
    
    function drawGuitar() {
        imgGuitar.src = "./img/guitar3.png";
        gameControl.ctx.drawImage(imgGuitar, 0, 0, gameControl.canvas.width, gameControl.canvas.height);     
        updateKeys();  
        // updateKeysV2(music2);
       
    }
    function endGame(){
        cancelAnimationFrame(updateBoard);
        clearBoard();
        drawEndgame();
        // setTimeout(function () => {
            
        // })
    }
    function drawEndgame(){
        document.getElementById("myVideo").style.display = "none";
        document.body.style.backgroundImage =  "url('./img/win-background.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.zIndex = "1";
        gameControl.ctx.font = "150px Nightmare-Hero";
        gameControl.ctx.fillStyle = "white";
        gameControl.ctx.shadowColor = "rgba(0,0,0,0.3)";
        gameControl.ctx.shadowBlur = 8;
        gameControl.ctx.fillText("YOU ROCK!!!", 20,320);
        gameControl.ctx.font = "50px Nightmare-Hero";
        gameControl.ctx.fillText(`Final Score: ${gameControl.score}`, 70,450);   
        document.getElementById("selectListAgain").style.visibility = "visible";
        document.getElementById("again-button").style.visibility = "visible";
    }
    function startGame() {
        gameControl.start();
        gameControl.startMusic();
        drawGuitar();
        updateBoard();
    }

    function clearBoard() {
        gameControl.ctx.clearRect(0, 0, gameControl.canvas.width, gameControl.canvas.height);
    }
    function updateKeys(){
        gameControl.frames += 1;
        if (gameControl.frames % 60 === 0) {
            let randomPos = Math.floor(Math.random() * keysPos.length);
            let randomKeyIndex =  Math.floor(Math.random() * 26 );
            gameControl.countKeys += 1;
            keys.push(keysFactory(keysPos[randomPos].x,keysPos[randomPos].y,randomKeyIndex,patterns[randomPos],randomPos));
        }
        if(keys.length > 0){
            for (let i = 0; i < keys.length ; i+=1) {
                keys[i].moveKey();
                keys[i].drawKey();
                if(keys[i].posY > keyZone.yFinal){
                    keys.splice(i,1); //remove a chave do array se ja passou da keyZone
                    gameControl.score -= 8;
                    gameControl.playMissedNote();
                } 
            }
        }
       
    }
    function updateKeysV2(music){
        music.frames += 1;
        if(music.frames % 25 === 0){
            let noteArray = music.musicArray[music.pos];
            noteArray.forEach((note,index) => {
                if(note){
                    let randomKeyIndex =  Math.floor(Math.random() * 26 );
                    gameControl.countKeys += 1;
                    keys.push(keysFactory(keysPos[index].x,keysPos[index].y,randomKeyIndex,patterns[index],index));
                }
            })
           
            music.pos += 1;
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
        if(!gameControl.gameOver){
            clearBoard();
            drawGuitar();
            drawFlames();
            drawScore();
            requestAnimationFrame(updateBoard) ;
        }else {
            endGame();
        }

    }
    function keyOnKeyZone (keyName){
        let keyFiltered = keys.filter( key => {
            return ((keyZone.yFinal >= key.posY) && (key.posY >= keyZone.yInicio) && (key.keyName === keyName))
        })
        return keyFiltered;
    }

    window.onkeydown = function (e){
        if(gameControl.started){
            let stringKeyCode = String.fromCharCode(e.keyCode);
            let keyFiltered = keyOnKeyZone(stringKeyCode);
            if(keyFiltered.length > 0){
                keyFiltered.forEach((key) => {
                    key.dead = true;
                    flames.push(new Flame(gameControl.ctx,buttonPos[key.buttonPos].x,buttonPos[key.buttonPos].y));
                    gameControl.music.volume = 1;
                    gameControl.score += 8;
                    setTimeout( function () {  
                        gameControl.music.volume = 0.6;
                    },500);
                })
            }else{
                gameControl.errorsKeys +=1;
                gameControl.score -= 8;
                gameControl.playMissedNote();
            }
        }
    }
    document.getElementById("main-music").addEventListener("ended", function () {
        gameControl.gameOver = true;
    });

}