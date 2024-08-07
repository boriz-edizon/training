import { mainGrid } from "./imports/mainGrid.js"
import { topGrid } from "./imports/topGrid.js"
import { sideGrid } from "./imports/sideGrid.js"
import { dimension } from "./imports/dimension.js"
import { scroll } from "./imports/scroll.js"
import { gridOperations } from "./imports/gridOperations.js"

class excel {
    constructor (rows, columns, width, height) {
        this.dimension = new dimension ( rows, columns, width, height)
        this.mainGrid = new mainGrid (this.dimension)
        this.topGrid = new topGrid (this.dimension)
        this.sideGrid = new sideGrid (this.dimension)

        this.scroll = new scroll (this.dimension, this.mainGrid, this.sideGrid, this.topGrid)
        this.gridOperations = new gridOperations(this.dimension, this.mainGrid, this.sideGrid, this.topGrid)
    }
}

var sheet = new excel(100, 60, 60, 20)