const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scroller = document.querySelector("#scroller");

var width =80
var height = 30

var rows = 300;
var column = 40;
let cells = []; 
var selected = []
var columnWidth = []
var x = 1

if(window.scrollY > height*20){

    fetch("data.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let keys = Object.keys(data[0])
            for(var i=0 ;i < keys.length ; i++){
                cells[0][i].text = keys[i]
                cells[0][i].updateCell()
            }
            data.map((d) => {
                // console.log(Object.values(data))
                for(let i = 0; i<keys.length ; i++){
                    cells[x][i].text = d[keys[i]]
                    cells[x][i].updateCell()
                }
                x++
            })
        })
        .catch((error) => {
            console.log("Error fetching JSON data: ", error);
        })
    }

function infiniteScroll() {
    if (window.scrollY > height*(rows-40)) {
        rows += 30
        canvas.height += 800
        createGrid()
    }

}

window.addEventListener("scroll", infiniteScroll);


// cell structure
// class cellStruct {
//     constructor(xVal, yVal,width, height,text, isClicked,isSelected){
//         this.xVal = xVal
//         this.yVal = yVal;
//         this.width = width
//         this.height = height
//         this.isClicked = isClicked;
//         this.isSelected = isSelected;
//         this.text = text;
//     }

//     createCell(text) {
//         ctx.strokeRect(this.xVal, this.yVal, width, height);
//         // ctx.lineWidth   = 5;
//     }
//     resizeCell(){
//         ctx.strokeRect(this.xVal, this.yVal, width, height);
//     }
//     updateCell() {
//         // if(this.isClicked){
//         //     ctx.font = "16px serif";
//         //     ctx.fillText(this.text, this.xVal , this.yVal + this.height/1.5, 140);
//         // }
//         if(!(this.text == " ")){
//             ctx.font = "16px serif";
//             ctx.fillText(this.text, this.xVal , this.yVal + this.height/1.5, 140);
            
//         }
        
//     }
//     selectCell() {
//         // if(this.isClicked){
//         //     ctx.rect(this.xVal, this.yVal, width, height);
//         //     ctx.fillStyle = "black";
//         //     ctx.fill();
//         // }
//         if(this.isSelected){
//             ctx.fillStyle = "black";
//             ctx.rect(this.xVal, this.yVal, width, height);
//             ctx.fill();
//         }
//         else {
//             // ctx.clearRect(this.xVal, this.yVal, width, height);
//             ctx.fillStyle = "white";
//             ctx.rect(this.xVal, this.yVal, width, height);
//             ctx.fill();
//         }
//     }
// }



// create canvas
// function createGrid() {
//     for(let i = 0; i < rows; i++) {

//         cells[i] = []
//           for(let j = 0; j<column ; j++){
//               if(i==0){
//                   columnWidth.push(width)
//               }
//              cell = new cellStruct(0+j*(width-1), 0+i*(height-1),width,height,' ', false,0)
//              cell.createCell()
//              cells[i].push(cell)
//           }
//       }
// }

// window.addEventListener("load", createGrid);
