canvas.addEventListener("mousedown", function (e) {
  var xInd = cellXIndex(shiftLeftX + e.offsetX) - 1;
  var yInd = cellYIndex(shiftTopY + e.offsetY) - 1;

  removeElements(selectedMain);
  removeElements(selectedTop);
  removeElements(selectedSide);

  editValue(xInd, yInd);
  mouseMove(xInd, yInd);
});

function removeElements(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].isSelected = false;
    arr[i].selectCell();
  }
}

// selected cells
const mouseMove = (xInd, yInd) => {
  let newXind = -1;
  let newYind = -1;
  let startXInd = xInd;
  let startYInd = yInd;

  canvas.addEventListener("mousemove", move);
  function move(e) {
    var newXind1 = cellXIndex(shiftLeftX + e.offsetX) - 1;
    var newYind1 = cellYIndex(shiftTopY + e.offsetY) - 1;
    if (newXind == newXind1 && newYind == newYind1) {
      return;
    } else {
      newXind = newXind1;
      newYind = newYind1;
    }

    removeElements(selectedMain);
    removeElements(selectedSide);
    removeElements(selectedTop);

    selectedMain = [];
    selectedSide = [];
    selectedTop = [];

    for (let i = Math.min(yInd, newYind); i <= Math.max(yInd, newYind); i++) {
      sideCells[i].isSelected = true;
      selectedSide.push(sideCells[i]);
      sideCells[i].highlightCell();
      for (let j = Math.min(xInd, newXind); j <= Math.max(xInd, newXind); j++) {
        if (i === Math.min(yInd, newYind)) {
          topCells[j].isSelected = true;
          selectedTop.push(topCells[j]);
          topCells[j].highlightCell();
        }
        cells[i][j].isSelected = true;
        selectedMain.push(cells[i][j]);
        cells[i][j].selectCell();
      }
    }
  }

  window.addEventListener("mouseup", (e) => {
    canvas.removeEventListener("mousemove", move);
  });
};
