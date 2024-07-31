canvas.addEventListener("mousedown", function(e) {
    var xInd = findX(0, cells[0].length - 1,e.offsetX)
    var yInd = findY(0, cells.length - 1,e.offsetY)
    editValue(xInd, yInd)
    mouseMove(xInd, yInd)
});

// canvas.addEventListener("mouseup", (e) => {
//   var xInd = findX(0, cells[0].length - 1,e.offsetX)
//   var yInd = findY(0, cells.length - 1,e.offsetY)
//     })

canvas.addEventListener("dblclick", (e) => {
  var xInd = findX(0, cells[0].length - 1,e.offsetX)
  var yInd = findY(0, cells.length - 1,e.offsetY)
  for(let i=0;i<selectedMain.length;i++){
    selectedMain[i].isSelected=false;
    selectedMain[i].selectCell();
  }
})

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
        removeElements(selectedMain)
        removeElements(selectedSide)
        removeElements(selectedTop)

        selectedMain=[];
        selectedSide=[]
        selectedTop= []

        for(let i=Math.min(yInd,newYind);i<=Math.max(yInd,newYind);i++){
          sideCells[i].isSelected = true
          selectedSide.push(sideCells[i])
          sideCells[i].selectCell()
          for(let j=Math.min(xInd,newXind);j<=Math.max(xInd,newXind);j++){
            if(i===Math.min(yInd,newYind)){
              topCells[j].isSelected=true;
              selectedTop.push(topCells[j]);
              topCells[j].selectCell();
            }
            cells[i][j].isSelected=true;
            selectedMain.push(cells[i][j]);
            cells[i][j].selectCell();
          }
        }

        mainCtx.beginPath();
        mainCtx.moveTo(cells[Math.min(xInd,newXind)][Math.min(yInd,newYind)].xVal, cells[Math.min(xInd,newXind)][Math.min(yInd,newYind)].yVal);
        mainCtx.lineTo(cells[Math.min(xInd,newXind)][Math.min(yInd,newYind)].xVal + cells[Math.min(xInd,newXind)][Math.min(yInd,newYind)].width, cells[Math.min(xInd,newXind)][Math.max(yInd,newYind)].yVal);
        mainCtx.stroke();
    }

    function removeElements(arr){
      for(let i = 0; i<arr.length; i++){
        arr[i].isSelected=false;
        arr[i].selectCell();
      }
    }
    window.addEventListener("mouseup", (e) => {
        canvas.removeEventListener("mousemove", move);
    });
  };