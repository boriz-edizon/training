canvas.addEventListener("mousedown", function(e) {
    var xInd = findX(0, cells[0].length - 1,e.offsetX)
    var yInd = findY(0, cells.length - 1,e.offsetY)
    mouseMove(xInd, yInd)
});

canvas.addEventListener("mouseup", (e) => {
  var xInd = findX(0, cells[0].length - 1,e.offsetX)
  var yInd = findY(0, cells.length - 1,e.offsetY)
    })

canvas.addEventListener("dblclick", (e) => {
  var xInd = findX(0, cells[0].length - 1,e.offsetX)
  var yInd = findY(0, cells.length - 1,e.offsetY)
  for(let i=0;i<selected.length;i++){
    selected[i].isSelected=false;
    selected[i].selectCell();
  }
  editValue(xInd, yInd)
})

// edit text
function editValue(xInd, yInd) {
    clickedCell = cells[yInd][xInd]
    clickedCell.isClicked = true
    var cellInput = document.querySelector(".text");
    cellInput.value = clickedCell.value
    cellInput.style.display = "block";
    cellInput.style.top = clickedCell.yVal + canvas.offsetTop;
    cellInput.style.left = clickedCell.xVal + canvas.offsetLeft;
    cellInput.style.height = clickedCell.height  ;
    cellInput.style.width = clickedCell.width  ;
    cellInput.focus();
    cellInput.onblur = () => {
        clickedCell.value = cellInput.value
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
    window.addEventListener("mouseup", (e) => {
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
