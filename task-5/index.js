const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scroller = document.querySelector("#scroller");

var width = 80;
var height = 30;

var rows = 100;
var columns = 40;
let cells = [];
var selected = [];
var cWidthPrefixSum = [];
let rHeightPrefixSum = [];

function init() {

  // cell structure
  class cellStruct {
    constructor(xVal, yVal, width, height, text, isClicked, isSelected) {
      this.xVal = xVal;
      this.yVal = yVal;
      this.width = width;
      this.height = height;
      this.isClicked = isClicked;
      this.isSelected = isSelected;
      this.text = text;
    }

    createCell() {
      ctx.strokeRect(this.xVal, this.yVal, width, height);
    }
    resizeCell() {
      ctx.strokeRect(this.xVal, this.yVal, width, height);
    }
    updateCell() {
      if (this.isClicked) {
        ctx.font = "20px serif";
        ctx.fillText(
          this.text,
          this.xVal,
          this.yVal + this.height / 1.5,
          this.width
        );
      }
    }
    selectCell() {
      if (this.isSelected) {
        ctx.fillStyle = "rgba(0, 100, 255, 0.3)";
        ctx.fillRect(this.xVal, this.yVal, width, height);
      } else {
        ctx.clearRect(this.xVal, this.yVal, width, height);
        ctx.strokeRect(this.xVal, this.yVal, width, height);
      }
    }
  }

  // create canvas
  rHeightPrefixSum.push(0);
  cWidthPrefixSum.push(0);

  function createGrid() {
    for (let i = 0; i < rows; i++) {
      rHeightPrefixSum.push(rHeightPrefixSum[i] + height);
      cells[i] = [];
      for (let j = 0; j < columns; j++) {
        if (i == 0) {
          cWidthPrefixSum.push(cWidthPrefixSum[i] + width);
        }
        cell = new cellStruct(0 + j * (width ), 0 + i * (height ), width, height, `${i} ${j}`, false, 0);
        cell.createCell();
        cells[i].push(cell);
      }
    }
  }
  createGrid();
}

// on load create canvas
window.addEventListener("load", init);


canvas.addEventListener("mousedown", function(e) {
    var xInd = findX(0, cells[0].length - 1,e.offsetX)
    var yInd = findY(0, cells.length - 1,e.offsetY)
    mouseMove(xInd, yInd)
});

canvas.addEventListener("mouseup", (e) => {
  var xInd = findX(0, cells[0].length - 1,e.offsetX)
  var yInd = findY(0, cells.length - 1,e.offsetY)
    
  editText(xInd, yInd)
})

canvas.addEventListener("click", (e) => {
  var xInd = findX(0, cells[0].length - 1,e.offsetX)
  var yInd = findY(0, cells.length - 1,e.offsetY)
  for(let i=0;i<selected.length;i++){
    selected[i].isSelected=false;
    selected[i].selectCell();
  }
  editText(xInd, yInd)
})


// edit text
function editText(xInd, yInd) {
    clickedCell = cells[yInd][xInd]
    clickedCell.isClicked = true
    var cellInput = document.querySelector(".text");
    cellInput.value = clickedCell.text
    cellInput.style.display = "block";
    cellInput.style.top = clickedCell.yVal + canvas.offsetTop;
    cellInput.style.left = clickedCell.xVal + canvas.offsetLeft;
    cellInput.style.height = clickedCell.height  ;
    cellInput.style.width = clickedCell.width  ;
    cellInput.focus();
    cellInput.onblur = () => {
        clickedCell.text = cellInput.value
        clickedCell.updateCell()
    }
}

// selected cell
const mouseMove = (xInd, yInd) => {
    let newXind = -1;
    let newYind = -1;

    canvas.addEventListener("mousemove", move);
    function move(e) {

        var newXind1 = findX(0, cells[0].length - 1,e.offsetX)
        var newYind1 = findY(0, cells.length - 1,e.offsetY)
        if(newXind==newXind1 && newYind==newYind1){
          return;
        }
        else{
          newXind=newXind1;
          newYind=newYind1;
        }
        for(let i=0;i<selected.length;i++){
          selected[i].isSelected=false;
          selected[i].selectCell();
        }
        selected=[];
        for(let i=Math.min(yInd,newYind);i<=Math.max(yInd,newYind);i++){
          for(let j=Math.min(xInd,newXind);j<=Math.max(xInd,newXind);j++){
            cells[i][j].isSelected=true;
            selected.push(cells[i][j]);
            cells[i][j].selectCell();
          }
        }
    }
    canvas.addEventListener("mouseup", (e) => {
        canvas.removeEventListener("mousemove", move);
    });
  };

// x index
function findX(frontCell, lastCell, mouseX) {
  var midindex = Math.floor((frontCell + lastCell) / 2);
  if (
    cells[0][midindex].xVal <= mouseX &&
    cells[0][midindex].xVal + cells[0][midindex].width >= mouseX
  ) {
    return midindex;
  } else if (cells[0][midindex].xVal > mouseX) {
    return findX(frontCell, midindex - 1, mouseX);
  } else {
    return findX(midindex + 1, lastCell, mouseX);
  }
}

// y index
function findY(frontCell, lastCell, mouseY) {
  var midindex = Math.floor((frontCell + lastCell) / 2);
  if (
    cells[midindex][0].yVal <= mouseY &&
    cells[midindex][0].yVal + cells[midindex][0].height >= mouseY
  ) {
    return midindex;
  } else if (cells[midindex][0].yVal > mouseY) {
    return findY(frontCell, midindex - 1, mouseY);
  } else {
    return findY(midindex + 1, lastCell, mouseY);
  }
}
