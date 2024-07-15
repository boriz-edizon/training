const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scroller = document.querySelector("#scroller");

var width =80
var height = 30

var rows = 30;
var column = 40;
let cells = []; 
var selected = []
var columnWidth = []
// let x = 1

// cell structure
class cellStruct {
    constructor(xVal, yVal,width, height,text, isClicked,isSelected){
        this.xVal = xVal
        this.yVal = yVal;
        this.width = width
        this.height = height
        this.isClicked = isClicked;
        this.isSelected = isSelected;
        this.text = text;
    }

    createCell() {
        ctx.strokeRect(this.xVal, this.yVal, width, height);
    }
    resizeCell(){
        ctx.strokeRect(this.xVal, this.yVal, width, height);
    }
    updateCell() {
        if(this.isClicked){
            ctx.font = "20px serif";
            ctx.fillText(this.text, this.xVal , this.yVal + this.height/1.5,this.width);
        }
    }
    selectCell() {
        if (this.isSelected) {
            ctx.fillStyle = 'rgba(0, 100, 255, 0.3)';
            ctx.fillRect(this.xVal, this.yVal, width, height);
          } else {
            ctx.clearRect(this.xVal, this.yVal,width,height);
            ctx.strokeRect(this.xVal, this.yVal, width, height);
        }
    }
}

// create canvas
function createGrid() {
    for(let i = 0; i < rows; i++) {

        cells[i] = []
          for(let j = 0; j<column ; j++){
              if(i==0){
                  columnWidth.push(width)
              }
             cell = new cellStruct(0+j*(width-1), 0+i*(height-1),width,height,' ', false,0)
             cell.createCell()
             cells[i].push(cell)
          }
      }
}

// on load create canvas
window.addEventListener("load", createGrid);

// canvas.addEventListener("mousedown", function(e) { 
//     var xInd = findX(0, cells[0].length - 1,e.offsetX)
//     var yInd = findY(0, cells.length - 1,e.offsetY)
//     mouseMove(xInd, yInd)
// });

// canvas.addEventListener("click", (e) => {
//     editText(findX(0, cells[0].length - 1,e.offsetX),findY(0, cells.length - 1,e.offsetY))
// })
// edit text
// function editText(xInd, yInd) {
//     clickedCell = cells[yInd][xInd]
//     clickedCell.isClicked = true
//     var cellInput = document.querySelector(".text");
//     cellInput.value = clickedCell.text
//     cellInput.style.display = "block";
//     cellInput.style.top = clickedCell.yVal + canvas.offsetTop;
//     cellInput.style.left = clickedCell.xVal + canvas.offsetLeft;
//     cellInput.style.height = clickedCell.height  ;
//     cellInput.style.width = clickedCell.width  ;
//     cellInput.focus();
//     cellInput.onblur = () => {
//         clickedCell.text = cellInput.value
//         clickedCell.updateCell()
//     }
// }

// selected cell
// const mouseMove = (xInd, yInd) => {
//     let newXind = -1;
//     let newYind = -1;

//     canvas.addEventListener("mousemove", move);
//     function move(e) {
         
//         var newXind1 = findX(0, cells[0].length - 1,e.offsetX)
//         var newYind1 = findY(0, cells.length - 1,e.offsetY)
//       if(newXind==newXind1 && newYind==newYind1){
//         return;
//       }
//       else{
//         newXind=newXind1;
//         newYind=newYind1;
//       }
//       for(let i=0;i<selected.length;i++){
//         selected[i].isSelected=false;
//         selected[i].selectCell();
//       }
//       selected=[];
//       for(let i=Math.min(yInd,newYind);i<=Math.max(yInd,newYind);i++){
//         for(let j=Math.min(xInd,newXind);j<=Math.max(xInd,newXind);j++){
//           cells[i][j].isSelected=true;
//           selected.push(cells[i][j]);
//           cells[i][j].selectCell();
//         }
//       }
//     }
//     canvas.addEventListener("mouseup", (e) => {
//         canvas.removeEventListener("mousemove", move);
//     });
//   };

// x index
function findX(frontCell, lastCell,mouseX) {
    var midindex = Math.floor((frontCell+lastCell)/2);
    if(cells[0][midindex].xVal <= mouseX && (cells[0][midindex].xVal + cells[0][midindex].width) >= mouseX){
        return midindex
    }
    else if (cells[0][midindex].xVal >mouseX){
        return findX(frontCell, midindex-1,mouseX)     
    }
    else {
        return findX(midindex + 1, lastCell,mouseX)     
    }
}

// y index
function findY(frontCell, lastCell,mouseY) {
    var midindex = Math.floor((frontCell+lastCell)/2);
    if(cells[midindex][0].yVal <= mouseY && (cells[midindex][0].yVal + cells[midindex][0].height) >= mouseY){
        return midindex
    }
    else if (cells[midindex][0].yVal >mouseY){
        return findY(frontCell, midindex-1,mouseY)     
    }
    else {
        return findY(midindex + 1, lastCell,mouseY)     
    }
}

// scroll
// function infiniteScroll() {
//     if (window.scrollY > height*(rows-40)) {
//         rows += 30
//         canvas.height += 900
//         createGrid()
//     }
//     if (window.scrollX > width*(column-25)) {
//         column += 20
//         canvas.width += 2000
//         createGrid()
//     }

// }

// window.addEventListener("scroll", infiniteScroll);


// resizing
// canvas.addEventListener("mousemove", function(e) {
//     var cRect = canvas.getBoundingClientRect();        
//     var mouseX = Math.round(e.offsetX - cRect.x +8);
//     var mouseY = Math.round(e.offsetY - cRect.top +8);
//     // console.log(mouseX,mouseY)
//     if(((mouseX-8)%width==0)){
//         // console.log("hello")
//         resizeWidth()
//     }else if((mouseY-8)%height==0){
//         // console.log("hello ashish")
//     }
// })
// function resizeWidth(){
//     canvas.addEventListener("mousedown",function(e){
//         console.log("HEllo")
//         return
//     })
// }







// selection on mousedown

// canvas.addEventListener("mousedown", function(e) {
//     var cRect = canvas.getBoundingClientRect();        
//     var mouseX = Math.round(e.offsetX - cRect.x +8);
//     var mouseY = Math.round(e.offsetY - cRect.top +8);
//     selectCell = selectCells(mouseX, mouseY)
//     selectCell.isSelected = true
//     selectCell.selectCell()
//     selected.push(selectCell)


//     var startX = findX(0, cells[0].length - 1,mouseX)
//     var startY = findY(0, cells.length - 1,mouseY)
//     mouseMove(startX, startY,selectCell);
// })

// canvas.addEventListener("mouseup", function(e) {
//     (selected).forEach(cell => {
//         cell.isClicked = false;
//         cell.selectCell()
//     });
//     selected = []
// })

// const mouseMove = (startX, startY,selectCell) => {
//     canvas.addEventListener("mousemove", function(e) {
    
//         var cRect = canvas.getBoundingClientRect();        
//         var mouseX = Math.round(e.offsetX - cRect.x +8);
//         var mouseY = Math.round(e.offsetY - cRect.top +8);
//         // console.log(mouseX,mouseY)
//         var xIndex = findX(0, cells[0].length - 1,mouseX)
//         var yIndex = findY(0, cells.length - 1,mouseY)
//         // console.log(xIndex,yIndex)
//         for(let i = 0; i<selected.length ; i++){
//             console.log("This is from outer for loop")
//             console.log(selected[i].isSelected)
           
//             selected[i].isSelected = 0;
//             console.log(selected[i].isSelected)
//             console.log(selected[i]);
//             selected[i].selectCell();
//         }
//        selected = []
//         for(var i=startY; i<=yIndex; i++){
//             for(var j=startX; j<=xIndex; j++){
//                 console.log(i,j,yIndex,xIndex)
//                 if(!(cells[i][j].isSelected)){
//                     selected.push(cells[i][j])
//                     console.log("This is from inner for loop")
//                     console.log(cells[i][j].isSelected)
//                     console.log(cells[i][j])
//                     cells[i][j].isSelected = 1;
//                     console.log(cells[i][j].isSelected)
//                     console.log(cells[i][j])
//                     setTimeout((cells[i][j].selectCell()),200)
//                 }
//             }
//         }
//     })

// }