import { cellStruct } from "./cell.js";

export class topGrid {
    constructor(dimension) {
        this.columns = dimension.columns;
        this.height = dimension.height;
        this.width = dimension.width;

        this.cWidthPrefixSum = dimension.cWidthPrefixSum;

        this.selectedTop = dimension.selectedTop;

        this.topCells = [];
        this.topCtx = this.getCanvas();
        this.getCells();
    }

    getCanvas() {
        let canvas = document.getElementById("top-canvas");
        canvas.height = 20;
        canvas.width = screen.width;
        return canvas.getContext("2d");
    }
    getCells(){
        for (let j = 0; j < this.columns; j++) {
            var cell = new cellStruct(1 + j * this.width + 0.5, 1, this.width, this.height, `${this.getColumnName(j + 1)}`, false, 0, this.topCtx);
            cell.drawCell();
            this.topCells.push(cell);
        }
    }
    getColumnName(num) {
        var s = "",
          t;
        while (num > 0) {
          t = (num - 1) % 26;
          s = String.fromCharCode(65 + t) + s;
          num = ((num - t) / 26) | 0;
        }
        return s || undefined;
      }

}
