// x index
function findX(frontCell, lastCell, mouseX) {
    var midindex = Math.floor((frontCell + lastCell) / 2);
    if (
      cells[0][midindex].xVal <= mouseX &&
      cells[0][midindex].xVal + cells[0][midindex].width >= mouseX
    ) {
      return midindex;
    } else if (cells[0][midindex].xVal > mouseX) {
      return findX(frontCell, midindex - 1, mouseX);
    } else {
      return findX(midindex + 1, lastCell, mouseX);
    }
  }
  
  // y index
  function findY(frontCell, lastCell, mouseY) {
    var midindex = Math.floor((frontCell + lastCell) / 2);
    if (
      cells[midindex][0].yVal <= mouseY &&
      cells[midindex][0].yVal + cells[midindex][0].height >= mouseY
    ) {
      return midindex;
    } else if (cells[midindex][0].yVal > mouseY) {
      return findY(frontCell, midindex - 1, mouseY);
    } else {
      return findY(midindex + 1, lastCell, mouseY);
    }
  }