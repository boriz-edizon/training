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

// class cellStruct {
//     constructor(xVal, yVal, isSelected, ctx){
//         this.xVal = xVal
//         this.yVal = yVal;
//         this.Selected = isSelected
//         this.ctx = ctx
//     }

//     createCell() {
//         this.ctx.fillRect(this.xVal, this.yVal, w1, h1)
//         console.log(this.xVal,this.yVal)
//         this.ctx.clearRect(this.xVal +1, this.yVal +1, w2, h2)
//     }
// }

var cells = []; 


function Box() {
  this.x = 0;
  this.y = 0;
  this.w = 60; // default width and height?
  this.h = 20;
  this.fill = '#444444';
}

function addRect(x, y, w, h, fill) {
  var rect = new Box;
  rect.x = x;
  rect.y = y;
  rect.w = w
  rect.h = h;
  rect.fill = fill;
  invalidate();
  return rect
}

var box = addRect(0,0, 60, 20, '#FFC02B')
drawshape(ctx, box, box.fill)

for(let i = 0; i < rows; i++) {
  cells[i] = []
    for(let j = 0; j<column ; j++){
      
       cell[i][j] = addRect(0+j*59, 0+i*19, 60, 20, '#FFC02B')
    }
}


// for(let i = 0; i < rows; i++) {
//   cells[i] = []
//     for(let j = 0; j<column ; j++){
      
//        cell = new cellStruct(0+j*59, 0+i*19, false, ctx).createCell();
//     }
// }



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

// canvas.addEventListener("mousemove", (e) => {
//   if (!running) {
//     ball.x = e.clientX;
//     ball.y = e.clientY;
//     ball.draw();
//   }
// });

// canvas.addEventListener("click", (e) => {
//   if (!running) {
//     raf = window.requestAnimationFrame(draw);
//     running = true;
//   }
// });

// canvas.addEventListener("mouseout", (e) => {
//   window.cancelAnimationFrame(raf);
//   running = false;
// });

// ball.draw();






 rect = {},
    drag = false,
    mouseX, 
    mouseY,
    closeEnough = 10,
    dragTL=dragBL=dragTR=dragBR=false;

function init() {
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false);
}
init();
function mouseDown(e) {
  mouseX = e.pageX - this.offsetLeft;
  mouseY = e.pageY - this.offsetTop;

  // if there isn't a rect yet
  if(rect.w === undefined){
    rect.startX = mouseY;
    rect.startY = mouseX;
    dragBR = true;
  }

  // if there is, check which corner
  //   (if any) was clicked
  //
  // 4 cases:
  // 1. top left
  else if( checkCloseEnough(mouseX, rect.startX) && checkCloseEnough(mouseY, rect.startY) ){
    dragTL = true;
  }
  // 2. top right
  else if( checkCloseEnough(mouseX, rect.startX+rect.w) && checkCloseEnough(mouseY, rect.startY) ){
    dragTR = true;

  }
  // 3. bottom left
  else if( checkCloseEnough(mouseX, rect.startX) && checkCloseEnough(mouseY, rect.startY+rect.h) ){
    dragBL = true;

  }
  // 4. bottom right
  else if( checkCloseEnough(mouseX, rect.startX+rect.w) && checkCloseEnough(mouseY, rect.startY+rect.h) ){
    dragBR = true;

  }
  // (5.) none of them
  else {
    // handle not resizing
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);
  draw();

}

function checkCloseEnough(p1, p2){
  return Math.abs(p1-p2)<closeEnough;
}
function mouseUp() {
  dragTL = dragTR = dragBL = dragBR = false;
}

function mouseMove(e) {
  mouseX = e.pageX - this.offsetLeft;
  mouseY = e.pageY - this.offsetTop;
  if(dragTL){
    rect.w += rect.startX-mouseX;
    rect.h += rect.startY-mouseY;
    rect.startX = mouseX;
    rect.startY = mouseY;
  } else if(dragTR) {
    rect.w = Math.abs(rect.startX-mouseX);
    rect.h += rect.startY-mouseY;
    rect.startY = mouseY;
  } else if(dragBL) {
    rect.w += rect.startX-mouseX;
    rect.h = Math.abs(rect.startY-mouseY);
    rect.startX = mouseX;  
  } else if(dragBR) {
    rect.w = Math.abs(rect.startX-mouseX);
    rect.h = Math.abs(rect.startY-mouseY);
  }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
}

function draw() {
  ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
}

