var mosueX;
topCanvas.addEventListener("mousemove", function (e) {
  mouseX = e.offsetX + shiftLeftX;
  xIndex = cellXIndex(mouseX);

  if (
    cWidthPrefixSum[xIndex - 1] + 5 > mouseX ||
    cWidthPrefixSum[xIndex] - 5 < mouseX
  ) {
    topCanvas.style.cursor = "col-resize";
  } else {
    topCanvas.style.cursor = "default";
  }
});

topCanvas.addEventListener("mousedown", function (e) {
  startX = e.offsetX + shiftLeftX;
  xIndex = cellXIndex(mouseX);
  prevDiffX = 0;
  diffX = 0;
  if (
    cWidthPrefixSum[xIndex - 1] + 5 > mouseX ||
    cWidthPrefixSum[xIndex] - 5 < mouseX
  ) {
    topCanvas.addEventListener("mousemove", function (e) {
      currentX = e.offsetX + shiftLeftX;
      diffX = currentX - startX;
      startX = currentX;
      if (cWidthPrefixSum[xIndex - 1] + 5 > mouseX) {
        for (let i = xIndex - 2; i < cWidthPrefixSum.length; i++) {
          cWidthPrefixSum[i] += diffX;
        }
        console.log(diffX);
        redraw(0);
      } else {
        for (let i = xIndex; i < cWidthPrefixSum.length; i++) {
          cWidthPrefixSum[i] += diffX;
          redraw(0);
        }
      }
    });
  }
});

function redraw(flag) {
  topIndex = cellYIndex(shiftTopY);
  bottomIndex = cellYIndex(shiftBottomY);
  leftIndex = cellXIndex(shiftLeftX);
  rightIndex = cellXIndex(shiftRightX);

  // top cells
  if (!flag) {
    topCtx.reset(0, 0, topCanvas.width, topCanvas.height);
    for (let j = leftIndex - 1; j < rightIndex; j++) {
      topCells[j].xVal = cWidthPrefixSum[j] - shiftLeftX + 0.5;
      topCells[j].createCell();
    }
  }

  // side cells
  if (flag) {
    sideCtx.reset(0, 0, sideCanvas.width, sideCanvas.height);
    for (let i = topIndex - 1; i < bottomIndex; i++) {
      sideCells[i].yVal = rHeightPrefixSum[i] - shiftTopY + 0.5;
      sideCells[i].createCell();
    }
  }

  // main cells
  mainCtx.reset(0, 0, canvas.width, canvas.height);
  for (let i = topIndex - 1; i < bottomIndex; i++) {
    for (let j = leftIndex - 1; j < rightIndex; j++) {
      cells[i][j].yVal = rHeightPrefixSum[i] - shiftTopY + 0.5;
      cells[i][j].xVal = cWidthPrefixSum[j] - shiftLeftX + 0.5;
      cells[i][j].createCell();
    }
  }
}
