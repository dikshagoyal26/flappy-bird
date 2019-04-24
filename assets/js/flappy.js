var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var flag = 0, // for begining game
  flag2 = 0; //for end game
//images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "assets/images/bird.png";
bg.src = "assets/images/bg.png";
fg.src = "assets/images/fg.png";
pipeNorth.src = "assets/images/pipeNorth.png";
pipeSouth.src = "assets/images/pipeSouth.png";

// some variables
var gap = 160;
var constant;
var bX = 100;
var bY = 150;
var gravity = 1.5;
var score = 0,
  i;

// audio files
var fly = new Audio();
var scor = new Audio();
var die = new Audio();
fly.src = "assets/sounds/fly.mp3";
scor.src = "assets/sounds/score.mp3";
die.src = "assets/sounds/die.ogg";
var pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
};
window.addEventListener("load", draw);
document.addEventListener("keydown", moveUp);
var restart = document.getElementById("restart");
restart.style.display = "none";

function draw() {
  ctx.drawImage(bg, 0, 0, 481, 643);
  ctx.drawImage(bird, bX, bY);
  if (flag == 0) {
    gravity = 0;
  }
  if (flag == 1) {
    gravity = 1.5;
    for (i = 0; i < pipe.length; i++) {
      constant = pipeNorth.height + gap;
      ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
      ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

      pipe[i].x--;

      if (pipe[i].x == 125) {
        pipe.push({
          x: cvs.width,
          y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
        });
      }

      // detect collision
      if (
        (bX + bird.width >= pipe[i].x &&
          bX <= pipe[i].x + pipeNorth.width &&
          (bY <= pipe[i].y + pipeNorth.height ||
            bY + bird.height >= pipe[i].y + constant)) ||
        bY + bird.height >= cvs.height - fg.height
      ) {
        endGame();
        break;
        //flag = 0;
        //location.reload(); // reload the page
      }

      if (pipe[i].x == 5) {
        score++;
        scor.play();
      }
    }
  }
  if (flag2 == 1) {
    gravity = 0;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
    //break;
  }
  bY += gravity;
  ctx.drawImage(fg, 0, cvs.height - fg.height, 482, 312);

  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}
function moveUp() {
  if (flag2 == 0) {
    bY -= 25;
    fly.play();
    flag = 1;
    //draw();
  }
}
function endGame() {
  die.play();
  flag2 = 1;
  flag = 0;
  alert("OOPS! Game Over..");
  var restart = document.querySelector(".controls");

  restart.style.display = "inline";
}
restart.addEventListener("click", () => {
  location.reload();
});
