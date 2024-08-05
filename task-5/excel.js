import { mainGrid } from "./imports/mainGrid.js"
import { topGrid } from "./imports/topGrid.js"
import { sideGrid } from "./imports/sideGrid.js"
import { dimensions } from "./imports/dimension.js"

class excel {
    constructor (rows, columns, width, height) {
        this.dimensions = new dimensions ( rows, columns, width, height)
        // this.topGrid = new topGrid (this.dimensions)
        // this.sideGrid = new sideGrid (this.dimensions)
        this.mainGrid = new mainGrid (this.dimensions)
    }
}

var init = new excel(100, 60, 60, 20)