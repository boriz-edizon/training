const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const w1 =80
const h1 = 30

const rows = 10;
const column = 10;
  

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
        ctx.strokeRect(this.xVal, this.yVal, w1, h1);
        
    }

    // updateCell() {
    //     if(this.isClicked){
    //         console.log("timeseires")
    //         // ctx.fillRect(this.xVal, this.yVal, w1, h1);
    //         // ctx.fillStyle = "black";
    //         // ctx.fillText(this.text, this.xVal, );
    //         ctx.font = "16px serif";
    //         ctx.fillText(this.text, this.xVal , this.yVal + this.height/1.5, 140);
    //     }
    // }
    selectCell() {
        // if(this.isClicked){
        //     ctx.rect(this.xVal, this.yVal, w1, h1);
        //     ctx.fillStyle = "black";
        //     ctx.fill();
        // }
        if(this.isSelected){
            console.log("black")
            ctx.fillStyle = "black";
            ctx.rect(this.xVal, this.yVal, w1, h1);
            ctx.fill();
        }
        else {
            // ctx.clearRect(this.xVal, this.yVal, w1, h1);
            console.log("white")
            ctx.fillStyle = "white";
            ctx.rect(this.xVal, this.yVal, w1, h1);
            ctx.fill();
        }
    }
}

let cells = []; 
var selected = []

for(let i = 0; i < rows; i++) {
  cells[i] = []
    for(let j = 0; j<column ; j++){
       cell = new cellStruct(0+j*(w1), 0+i*(h1),w1,h1,' ', false,false)
       cell.createCell()
       cells[i].push(cell)
    }
}

canvas.addEventListener("click", function(e) { 
    var cRect = canvas.getBoundingClientRect();        
    var mouseX = Math.round(e.offsetX - cRect.x +8);
    var mouseY = Math.round(e.offsetY - cRect.top +8);
    onCell(mouseX, mouseY)
});

// function onCell(mouseX, mouseY) {
//     var xIndex = findX(0, cells[0].length - 1,mouseX)
//     var yIndex = findY(0, cells.length - 1,mouseY)
//     clickedCell = cells[yIndex][xIndex]
//     clickedCell.isClicked = true

//     var cellInput=document.querySelector(".content");
//     cellInput.value = clickedCell.text
//     cellInput.style.display = "block";
//     cellInput.style.top = clickedCell.yVal + 8;
//     cellInput.style.left = clickedCell.xVal + 8;
//     cellInput.style.height = clickedCell.height  ;
//     cellInput.style.width = clickedCell.width  ;
    

//     console.log(cellInput.value)
//     cellInput.onblur = () => {
//         console.log(cellInput.value)
//         clickedCell.text = cellInput.value
//         clickedCell.updateCell()
//         console.log(cells)
//     }
// }

canvas.addEventListener("mousedown", function(e) {
    var cRect = canvas.getBoundingClientRect();        
    var mouseX = Math.round(e.offsetX - cRect.x +8);
    var mouseY = Math.round(e.offsetY - cRect.top +8);
    selectCell = selectCells(mouseX, mouseY)
    selectCell.isSelected = true
    selectCell.selectCell()
    selected.push(selectCell)


    var startX = findX(0, cells[0].length - 1,mouseX)
    var startY = findY(0, cells.length - 1,mouseY)
    mouseMove(startX, startY,selectCell);
})

// canvas.addEventListener("mouseup", function(e) {
//     (selected).forEach(cell => {
//         cell.isClicked = false;
//         cell.selectCell()
//     });
//     selected = []
// })

const mouseMove = (startX, startY,selectCell) => {
    canvas.addEventListener("mousemove", function(e) {
    
        var cRect = canvas.getBoundingClientRect();        
        var mouseX = Math.round(e.offsetX - cRect.x +8);
        var mouseY = Math.round(e.offsetY - cRect.top +8);
        // console.log(mouseX,mouseY)
        var xIndex = findX(0, cells[0].length - 1,mouseX)
        var yIndex = findY(0, cells.length - 1,mouseY)
        // console.log(xIndex,yIndex)
        for(let i = 0; i<selected.length ; i++){
            console.log("This is from outer for loop")
            console.log(selected[i].isSelected)
           
            selected[i].isSelected = false;
            console.log(selected[i].isSelected)
            console.log(selected[i]);
            selected[i].selectCell();
        }
       selected = []
        for(var i=startY; i<=yIndex; i++){
            for(var j=startX; j<=xIndex; j++){
                console.log(i,j,yIndex,xIndex)
                if(!(cells[i][j].isSelected)){
                    selected.push(cells[i][j])
                    console.log("This is from inner for loop")
                    console.log(cells[i][j])
                    console.log(cells[i][j].isSelected)
                    cells[i][j].isSelected = true;
                    console.log(cells[i][j].isSelected)

                    cells[i][j].selectCell();
                }
            }
        }
    })

}

function selectCells(mouseX,mouseY) {
    var xIndex = findX(0, cells[0].length - 1,mouseX)
    var yIndex = findY(0, cells.length - 1,mouseY)
    return cells[yIndex][xIndex]
}

function findX(frontCell, lastCell,mouseX) {
    var midindex = Math.floor((frontCell+lastCell)/2);
    if(cells[0][midindex].xVal < mouseX && (cells[0][midindex].xVal + cells[0][midindex].width) > mouseX){
        return midindex
    }
    else if (cells[0][midindex].xVal >mouseX){
        return findX(frontCell, midindex-1,mouseX)     
    }
    else {
        return findX(midindex + 1, lastCell,mouseX)     
    }
}

function findY(frontCell, lastCell,mouseY) {
    var midindex = Math.floor((frontCell+lastCell)/2);
    if(cells[midindex][0].yVal < mouseY && (cells[midindex][0].yVal + cells[midindex][0].height) > mouseY){
        return midindex
    }
    else if (cells[midindex][0].yVal >mouseY){
        return findY(frontCell, midindex-1,mouseY)     
    }
    else {
        return findY(midindex + 1, lastCell,mouseY)     
    }
}