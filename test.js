var canvas = document.getElementById("theCanvas");
var context = canvas.getContext("2d");



var spriteObject = {
    sourceX: 0,
    sourceY: 0,
    sourceWidth: 64,
    sourceHeight: 64,
    width: 64,
    height: 64,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    gravity: 3.8,


    centerX: function() {
        return this.x + (this.width / 2);
    },
    centerY: function() {
        return this.y + (this.height / 2);
    },
    halfWidth: function() {
        return this.width / 2;
    },
    halfHeight: function() {
        return this.height / 2;
    }
};

var startGame = false;
var gameOver = false;
var score = 0;

var background = Object.create(spriteObject);
background.x = 0;
background.y = 0;
background.width = 550;
background.height = 500;

var backgroundImage = new Image();
backgroundImage.src = "images/bg.png";

var birdImage = new Image();
birdImage.src = "images/sean.png";
var bird = Object.create(spriteObject);
bird.x = 200;
bird.y = 240;
bird.width = 50;
bird.height = 50;

//pipe images
var pipe1topImage = new Image();
pipe1topImage.src = "images/pipetop1.png";

var pipe2topImage = new Image();
pipe2topImage.src = "images/pipetop2.png";

var pipe3topImage = new Image();
pipe3topImage.src = "images/pipetop3.png";

var pipe1bottomImage = new Image();
pipe1bottomImage.src = "images/pipebottom1.png";

var pipe2bottomImage = new Image();
pipe2bottomImage.src = "images/pipebottom2.png";

var pipe3bottomImage = new Image();
pipe3bottomImage.src = "images/pipebottom3.png";

var pipeBottom1 = Object.create(spriteObject);
pipeBottom1.x = 500;
pipeBottom1.y = 300;
pipeBottom1.width = 100;
pipeBottom1.height = 400;
pipeBottom1.vx = -8;

var pipeBottom2 = Object.create(spriteObject);
pipeBottom2.x = 1000;
pipeBottom2.y = 350;
pipeBottom2.width = 100;
pipeBottom2.height = 400;
pipeBottom2.vx = -8;

var pipeBottom3 = Object.create(spriteObject);
pipeBottom3.x = 1500;
pipeBottom3.y = 320;
pipeBottom3.width = 100;
pipeBottom3.height = 400;
pipeBottom3.vx = -8;

//PIPE TOP

var pipeTop1 = Object.create(spriteObject);
pipeTop1.x = 500;
pipeTop1.y;
pipeTop1.width = 100;
pipeTop1.height = 400;
pipeTop1.vx = -8;

var pipeTop2 = Object.create(spriteObject);
pipeTop2.x = 1000;
pipeTop2.y;
pipeTop2.width = 100;
pipeTop2.height = 400;
pipeTop2.vx = -8;

var pipeTop3 = Object.create(spriteObject);
pipeTop3.x = 1500;
pipeTop3.y;
pipeTop3.width = 100;
pipeTop3.height = 400;
pipeTop3.vx = -8;

window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);


//when you press the up key the bird jumps up 50 pixels if the game isn't over
function onKeyDown(event) {

    if (event.keyCode === 38 && gameOver === false) {
        bird.y += -50;
        startGame = true;
    }
    if (gameOver === true) {
        window.location.reload();
    }
}
//when you release the key, it stops going up
function onKeyUp(event) {

    if (event.keyCode === 38 && gameOver === false) {
        bird.y += 0;
    }
}

//call main, the main function that's recursive and calls itself every 33 ms--this handles hit detection/redrawing the screen, all that jazz
main();

function main() {
    window.setTimeout(main, 33);
    //this clears the canvas I believe
    context.clearRect(0, 0, 550, 500);
    //cursor is disabled 
    canvas.style.cursor = "none";

    //don't let it go off the screen
    if (bird.y < 0) {
        bird.y = 0;
    }
    if (bird.y > canvas.height - bird.height) {
        bird.y = canvas.height - bird.height;
    }

    //whatever you draw first is BEHIND the things you draw after it

    context.fillStyle = "#666666";
    context.drawImage(backgroundImage, background.x, background.y, background.width, background.height)
    context.fillRect(0, 450, 550, 50);
    context.fillRect(0, 00, 550, 50);

    //context.fillStyle = "#f00";

    //this creates the bird rectangle
    //context.fillRect(bird.x,bird.y,bird.width,bird.height);
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

    context.fillStyle = "#00665e";
    // context.fillRect(pipeBottom1.x,pipeBottom1.y,pipeBottom1.width,pipeBottom1.height);
    // context.fillRect(pipeBottom2.x,pipeBottom2.y,pipeBottom2.width,pipeBottom2.height);
    // context.fillRect(pipeBottom3.x,pipeBottom3.y,pipeBottom3.width,pipeBottom3.height);
    context.drawImage(pipe1bottomImage, pipeBottom1.x, pipeBottom1.y, pipeBottom1.width, pipeBottom1.height);
    context.drawImage(pipe2bottomImage, pipeBottom2.x, pipeBottom2.y, pipeBottom2.width, pipeBottom2.height);
    context.drawImage(pipe3bottomImage, pipeBottom3.x, pipeBottom3.y, pipeBottom3.width, pipeBottom3.height);

    //this makes the space between the pipes
    pipeTop1.y = pipeBottom1.y - 530;
    pipeTop2.y = pipeBottom2.y - 530;
    pipeTop3.y = pipeBottom3.y - 530;
    //this creates the pipes
    // context.fillRect(pipeTop1.x,pipeTop1.y,pipeTop1.width,pipeTop1.height);
    // context.fillRect(pipeTop2.x,pipeTop2.y,pipeTop2.width,pipeTop2.height);
    // context.fillRect(pipeTop3.x,pipeTop3.y,pipeTop3.width,pipeTop3.height);
    context.drawImage(pipe1topImage, pipeTop1.x, pipeTop1.y, pipeTop1.width, pipeTop1.height);
    context.drawImage(pipe2topImage, pipeTop2.x, pipeTop2.y, pipeTop2.width, pipeTop2.height);
    context.drawImage(pipe3topImage, pipeTop3.x, pipeTop3.y, pipeTop3.width, pipeTop3.height);

    //console.log(pipeBottom2.x);

    //once it gets 10 pixels past a pipe you get a point
    if (bird.x > pipeBottom1.x + pipeBottom1.width && bird.x < pipeBottom1.x + pipeBottom1.width + 10) {
        score++;
    }
    if (bird.x > pipeBottom2.x + pipeBottom2.width && bird.x < pipeBottom2.x + pipeBottom2.width + 10) {
        score++;
    }
    if (bird.x > pipeBottom3.x + pipeBottom3.width && bird.x < pipeBottom3.x + pipeBottom3.width + 10) {
        score++;
    }

    //once the pipes make it off to the left, they snap back to the right aaannd are assigned a random height that varies by 100 pixels
    if (pipeTop1.x < -100) {
        pipeTop1.x = 1300;
        pipeTop1.y = 300 + Math.random() * 100;
    }
    if (pipeTop2.x < -100) {
        pipeTop2.x = 1300;
        pipeTop2.y = 300 + Math.random() * 100;
    }
    if (pipeTop3.x < -100) {
        pipeTop3.x = 1300;
        pipeTop3.y = 300 + Math.random() * 100;
    }

    if (pipeBottom1.x < -100) {
        pipeBottom1.x = 1300;
        pipeBottom1.y = 300 + Math.random() * 150;
    }
    if (pipeBottom2.x < -100) {
        pipeBottom2.x = 1300;
        pipeBottom2.y = 300 + Math.random() * 150;
    }
    if (pipeBottom3.x < -100) {
        pipeBottom3.x = 1300;
        pipeBottom3.y = 300 + Math.random() * 150;
    }

    //if the game has started and game is not over, add the velocity to the pipes so they move
    if (startGame === true && gameOver === false) {
        pipeTop1.x += pipeTop1.vx;
        pipeTop2.x += pipeTop2.vx;
        pipeTop3.x += pipeTop3.vx;

        pipeBottom1.x += pipeBottom1.vx;
        pipeBottom2.x += pipeBottom2.vx;
        pipeBottom3.x += pipeBottom3.vx;

        //add the gravity to the bird so it drops slowly
        bird.y += bird.gravity;

        //adding all the text
        context.fillStyle = "black";
        context.font = "bold 24pt Arial";
        context.fillText("SCORE: " + score, 300, 30);
    }

    //add beginning instructions 
    if (startGame === false && gameOver === false) {
        context.fillStyle = "black";
        context.font = "bold 32pt Arial";
        context.fillText("FLAPPY SEAN!", 80, 100);

        context.font = "bold 20pt Arial";
        context.fillText("PRESS THE UP KEY TO FLAP", 80, 400);
        context.fillText("AVOID THE PIPES!", 150, 440);
    }

    //add game over text
    if (gameOver === true) {
        context.fillStyle = "black";
        context.font = "bold 32pt Arial";
        context.fillText("GAME OVER!", 145, 100);

        context.font = "bold 20pt Arial";
        context.fillText("PRESS THE UP KEY TO RESTART", 60, 400);
    }




    //COLLISION DETECTION-----------------------------------------------------------------------------------------------


    var vx = bird.centerX() - pipeTop1.centerX();
    var vy = bird.centerY() - pipeTop1.centerY();

    var combinedHalfWidths = bird.halfWidth() + pipeTop1.halfWidth();
    var combinedHalfHeights = bird.halfHeight() + pipeTop1.halfHeight();


    if (Math.abs(vx) < combinedHalfWidths) {
        if (Math.abs(vy) < combinedHalfHeights) {
            gameOver = true;
            startGame = false;
        }
    }

    var vx2 = bird.centerX() - pipeTop2.centerX();
    var vy2 = bird.centerY() - pipeTop2.centerY();

    var combinedHalfWidths2 = bird.halfWidth() + pipeTop2.halfWidth();
    var combinedHalfHeights2 = bird.halfHeight() + pipeTop2.halfHeight();


    if (Math.abs(vx2) < combinedHalfWidths2) {
        if (Math.abs(vy2) < combinedHalfHeights2) {
            gameOver = true;
            startGame = false;
        }
    }

    var vx3 = bird.centerX() - pipeTop3.centerX();
    var vy3 = bird.centerY() - pipeTop3.centerY();

    var combinedHalfWidths3 = bird.halfWidth() + pipeTop3.halfWidth();
    var combinedHalfHeights3 = bird.halfHeight() + pipeTop3.halfHeight();


    if (Math.abs(vx3) < combinedHalfWidths3) {
        if (Math.abs(vy3) < combinedHalfHeights3) {
            gameOver = true;
            startGame = false;
        }
    }


    var vx4 = bird.centerX() - pipeBottom1.centerX();
    var vy4 = bird.centerY() - pipeBottom1.centerY();

    var combinedHalfWidths4 = bird.halfWidth() + pipeBottom1.halfWidth();
    var combinedHalfHeights4 = bird.halfHeight() + pipeBottom1.halfHeight();


    if (Math.abs(vx4) < combinedHalfWidths4) {
        if (Math.abs(vy4) < combinedHalfHeights4) {
            gameOver = true;
            startGame = false;
        }
    }

    var vx5 = bird.centerX() - pipeBottom2.centerX();
    var vy5 = bird.centerY() - pipeBottom2.centerY();

    var combinedHalfWidths5 = bird.halfWidth() + pipeBottom2.halfWidth();
    var combinedHalfHeights5 = bird.halfHeight() + pipeBottom2.halfHeight();


    if (Math.abs(vx5) < combinedHalfWidths5) {
        if (Math.abs(vy5) < combinedHalfHeights5) {
            gameOver = true;
            startGame = false;
        }
    }

    var vx6 = bird.centerX() - pipeBottom3.centerX();
    var vy6 = bird.centerY() - pipeBottom3.centerY();

    var combinedHalfWidths6 = bird.halfWidth() + pipeTop3.halfWidth();
    var combinedHalfHeights6 = bird.halfHeight() + pipeTop3.halfHeight();


    if (Math.abs(vx6) < combinedHalfWidths6) {
        if (Math.abs(vy6) < combinedHalfHeights6) {
            gameOver = true;
            startGame = false;
        }
    }


}