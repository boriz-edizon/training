import { cellStruct } from "./cell.js";

export class mainGrid{
 
    constructor(dimension){
        this.dimension = dimension;

        this.mainCanvas;
        this.mainCtx;
        this.mainCells = [];

        this.init();
    }
    
    init() {
        this.mainCanvas = document.getElementById("main-canvas")
        this.mainCanvas.height = screen.height - 30;
        this.mainCanvas.width = screen.width;
        this.mainCtx = this.mainCanvas.getContext("2d")

        this.dimension.shiftTopY = 0;
        this.dimension.shiftBottomY = this.mainCanvas.height
        this.dimension.shiftLeftX = 0;
        this.dimension.shiftRightX = this.mainCanvas.width;

        this.dimension.topIndex = this.dimension.cellYIndex(this.dimension.shiftTopY)
        this.dimension.bottomIndex = this.dimension.cellYIndex(this.dimension.shiftBottomY)
        this.dimension.leftIndex = this.dimension.cellYIndex(this.dimension.shiftLeftX)
        this.dimension.rightIndex = this.dimension.cellYIndex(this.dimension.shiftRightX)

        this.getCells()
    }

    getCells(){
        for (let i = 0; i < this.dimension.rows; i++) {
            this.dimension.rHeightPrefixSum.push(this.dimension.rHeightPrefixSum[i] + this.dimension.height);
            this.mainCells[i] = [];
            for (let j = 0; j < this.dimension.columns; j++) {
                if (i == 0) {
                    this.dimension.cWidthPrefixSum.push(this.dimension.cWidthPrefixSum[j] + this.width);
                }
                var cell = new cellStruct(1 + j * this.dimension.width + 0.5, 1 + i * this.dimension.height + 0.5, this.dimension.width, this.dimension.height, `${i} ${j}`, false, 0, this.mainCtx);
                cell.drawCell();
                this.mainCells[i].push(cell);
            }
        }
    }

    render() {
        mainCtx.reset(0, 0, mainCanvas.width, mainCanvas.height);

        for (let i = this.dimension.topIndex - 1; i < this.dimension.bottomIndex; i++) {
          for (let j = this.dimension.leftIndex - 1; j < this.dimension.rightIndex; j++) {
            this.dimension.cells[i][j].yVal = this.dimension.rHeightPrefixSum[i] - this.dimension.shiftTopY + 0.5;
            this.dimension.cells[i][j].xVal = this.dimension.cWidthPrefixSum[j] - this.dimension.shiftLeftX + 0.5;
            this.dimension.cells[i][j].drawCell();
          }
        }    
    }
}