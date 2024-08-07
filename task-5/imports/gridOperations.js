export class gridOperations {
    constructor(dimension, mainGrid, sideGrid, topGrid) {
        this.dimension = dimension;
        this.mainGrid = mainGrid;
        this.sideGrid = sideGrid;
        this.topGrid = topGrid;

        this.cellInput = document.querySelector(".text");

        this.selectIndexX
        this.selectIndexY
        this.selectedCell

        this.currentIndexX
        this.currentIndexY
        this.previousIndexX = -1
        this.previousIndexY = -1

        this.isSelecting

        this.eventListeners()
    }

    eventListeners(){
        this.mainGrid.mainCanvas.addEventListener("mousedown", this.handleMouseDown.bind(this))
        this.mainGrid.mainCanvas.addEventListener("mousemove", this.handleMouseMove.bind(this))
        window.addEventListener("mouseup", this.handleMouseUp.bind(this))
    }

    handleMouseDown (e) {
        this.isSelecting = true
        this.selectIndexX = this.dimension.cellXIndex(this.dimension.shiftLeftX + e.offsetX);
        this.selectIndexY = this.dimension.cellYIndex(this.dimension.shiftTopY + e.offsetY);
      

        this.removeElements(this.dimension.selectedMain);
        this.removeElements(this.dimension.selectedTop);
        this.removeElements(this.dimension.selectedSide);
      
        // select a particular cell for input
        this.selectCell = this.mainGrid.mainCells[this.selectIndexY][this.selectIndexX];
        this.selectCell.isClicked = true;
      
        this.sideGrid.sideCells[this.selectIndexY].isSelected = true;
        this.dimension.selectedSide.push(this.sideGrid.sideCells[this.selectIndexY]);
        this.sideGrid.sideCells[this.selectIndexY].highlightCell();
      
        this.topGrid.topCells[this.selectIndexX].isSelected = true;
        this.dimension.selectedTop.push(this.topGrid.topCells[this.selectIndexX]);
        this.topGrid.topCells[this.selectIndexX].highlightCell();
      
        this.cellInput.value = this.selectCell.value;
        this.cellInput.style.display = "block";
        this.cellInput.style.top = this.selectCell.yVal + this.mainGrid.mainCanvas.offsetTop;
        this.cellInput.style.left = this.selectCell.xVal + this.mainGrid.mainCanvas.offsetLeft;
        this.cellInput.style.height = this.selectCell.height;
        this.cellInput.style.width = this.selectCell.width;
      
        this.cellInput.focus();
        
        this.cellInput.onblur = () => {
          this.selectCell.value = this.cellInput.value;
          console.log(this.cellInput.value)
          this.selectCell.drawCell();
        }
    }
      
      handleMouseMove (e) {
        if(this.isSelecting) {
            this.currentIndexX = this.dimension.cellXIndex(this.dimension.shiftLeftX + e.offsetX);
            this.currentIndexY = this.dimension.cellYIndex(this.dimension.shiftTopY + e.offsetY);
    
            if (this.previousIndexX == this.currentIndexX && this.previousIndexY == this.currentIndexY) {
              return;
            } else {
              this.previousIndexX = this.currentIndexX;
              this.previousIndexY = this.currentIndexY;
            }
        
            this.removeElements(this.dimension.selectedMain);
            this.removeElements(this.dimension.selectedSide);
            this.removeElements(this.dimension.selectedTop);
        
            this.dimension.selectedMain = [];
            this.dimension.selectedSide = [];
            this.dimension.selectedTop = [];
        
            for (let i = Math.min(this.currentIndexY, this.selectIndexY); i <= Math.max(this.currentIndexY, this.selectIndexY); i++) {
              this.sideGrid.sideCells[i].isSelected = true;
              this.dimension.selectedSide.push(this.sideGrid.sideCells[i]);
              this.sideGrid.sideCells[i].highlightCell();
    
              for (let j = Math.min(this.currentIndexX, this.selectIndexX); j <= Math.max(this.currentIndexX, this.selectIndexX); j++) {
                if (i === Math.min(this.currentIndexY, this.previousIndexY)) {
                  this.topGrid.topCells[j].isSelected = true;
                  this.dimension.selectedTop.push(this.topGrid.topCells[j]);
                  this.topGrid.topCells[j].highlightCell();
                }
    
                this.mainGrid.mainCells[i][j].isSelected = true;
                this.dimension.selectedMain.push(this.mainGrid.mainCells[i][j]);
                this.mainGrid.mainCells[i][j].selectCell();
              }
            }

        }
      }

      handleMouseUp() {
        this.isSelecting = false;
      }

    removeElements(arr) {
        for (let i = 0; i < arr.length; i++){
            arr[i].isSelected = false;
            arr[i].selectCell();
        }
    } 
}