const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const w1 =60
const h1 = 20
const w2 = 58
const h2 = 18  
const rows = 1000;
const column = 100;
var x = 25;
var y = 25;    

class cellStruct {
    constructor(xVal, yVal, isSelected, ctx){
        this.xVal = xVal
        this.yVal = yVal;
        this.Selected = isSelected
        this.ctx = ctx
    }

    createCell() {
        this.ctx.fillRect(this.xVal, this.yVal, w1, h1)
        console.log(this.xVal,this.yVal)
        this.ctx.clearRect(this.xVal +1, this.yVal +1, w2, h2)
    }
}


for(let i = 0; i < rows; i++) {
    for(let j = 0; j<column ; j++){
        new cellStruct(0+j*59, 0+i*19, false, ctx).createCell();
    }
}



let raf;
let running = false;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 1,
  radius: 25,
  color: "blue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};


function draw() {
  clear();
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius
  ) {
    ball.vy = -ball.vy;
  }
  if (
    ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius
  ) {
    ball.vx = -ball.vx;
  }

  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", (e) => {
  if (!running) {
    ball.x = e.clientX;
    ball.y = e.clientY;
    ball.draw();
  }
});

canvas.addEventListener("click", (e) => {
  if (!running) {
    raf = window.requestAnimationFrame(draw);
    running = true;
  }
});

canvas.addEventListener("mouseout", (e) => {
  window.cancelAnimationFrame(raf);
  running = false;
});

ball.draw();
