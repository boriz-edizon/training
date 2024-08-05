import { cellStruct } from "./cell.js";

export class sideGrid {
    constructor(dimension) {
        this.rows = dimension.rows;
        this.height = dimension.height;
        this.width = dimension.width;

        this.rHeightPrefixSum = dimension.rHeightPrefixSum;

        this.selectedSide = dimension.selectedSide;

        this.sideCells = [];
        this.sideCtx = this.getCanvas();
        this.getCells();
    }

    getCanvas(){
        let canvas = document.getElementById("side-canvas");
        canvas.height = screen.height - 30;
        canvas.width = 60
        return canvas.getContext("2d");
    }
    getCells() {
        for (let i = 0; i < this.rows; i++) {
            var cell = new cellStruct(1, 1 + i * this.height + 0.5, this.width, this.height, `${i}`, false, 0, this.sideCtx);
            cell.drawCell();
            this.sideCells.push(cell);
          }
    }
}