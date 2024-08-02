// edit text
function editValue(xInd, yInd) {
    clickedCell = cells[yInd][xInd]
    clickedCell.isClicked = true

    sideCells[yInd].isSelected = true
    selectedSide.push(sideCells[yInd])
    sideCells[yInd].highlightCell()

    topCells[xInd].isSelected = true
    selectedTop.push(topCells[xInd])
    topCells[xInd].highlightCell() 

    var cellInput = document.querySelector(".text");
    cellInput.value = clickedCell.value
    cellInput.style.display = "block";
    cellInput.style.top = clickedCell.yVal + canvas.offsetTop;
    cellInput.style.left = clickedCell.xVal + canvas.offsetLeft;
    cellInput.style.height = clickedCell.height  ;
    cellInput.style.width = clickedCell.width  ;

    cellInput.focus();
    cellInput.onblur = () => {
        clickedCell.value = cellInput.value
        clickedCell.updateCell()
    }
}