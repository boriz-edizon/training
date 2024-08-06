function init() {
  var containerHeight = rHeightPrefixSum[rHeightPrefixSum.length - 1];
  var containerWidth = cWidthPrefixSum[cWidthPrefixSum.length - 1];

  var sliderY = document.getElementById("slider-y");
  var trackY = document.getElementById("track-y");
  var sliderPercentageY = null;
  var yTravelled = 0;

  var sliderX = document.getElementById("slider-x");
  var trackX = document.getElementById("track-x");
  var sliderPercentageX = null;
  var xTravelled = 0;
  var horizontalScroll = false;

  // get value of attribute
  var getAtInt = function getAtInt(obj, attrib) {
    return parseInt(getComputedStyle(obj, null)[attrib], 10);
  };


  
  // vertical scroll
  sliderY.addEventListener("mousedown", function (e) {
    // distance between slider top and mousedown
    mouseDownYOffset =
      e.pageY - getAtInt(trackY, "top") - getAtInt(sliderY, "top");
    document.addEventListener("mousemove", yScrollbar);
  });
  // scrollbar y axis
  function yScrollbar(e) {
    // distance between slider top and track top
    yTravelled = e.pageY - getAtInt(trackY, "top") - mouseDownYOffset;
    yScroll();
  }
  // y scroll
  function yScroll() {
    if (yTravelled < 0) {
      sliderY.style.top = 0;
      shiftTopY = 0;
      shiftBottomY = canvas.height;
      yTravelled = 0;
      sliderY.style.height = 0.6 * getAtInt(trackY, "height");
      redraw(1);
    } else if (
      yTravelled >
      0.8 * (getAtInt(trackY, "height") - getAtInt(sliderY, "height"))
    ) {
      if (getAtInt(sliderY, "height") > 40) {
        sliderY.style.height =
        (canvas.height * canvas.height) / containerHeight + "px";
      }
      addRows();
      containerHeight = rHeightPrefixSum[rHeightPrefixSum.length - 1];
      sliderY.style.top =
      0.5 * (getAtInt(trackY, "height") - getAtInt(sliderY, "height"));
      yTravelled =
      0.5 * (getAtInt(trackY, "height") - getAtInt(sliderY, "height"));
    } else {
      sliderY.style.top = yTravelled + "px";
      sliderPercentageY =
      (yTravelled /
        (getAtInt(trackY, "height") - getAtInt(sliderY, "height"))) *
        100;
        shiftTopY = (sliderPercentageY * (containerHeight - canvas.height)) / 100;
        shiftBottomY = shiftTopY + canvas.height;
        redraw(1);
      }
    }
    // wheel y axis
    canvas.addEventListener("wheel", function (e) {
      if (!horizontalScroll) {
        yTravelled +=
          (e.deltaY / 1000) *
          (getAtInt(trackY, "height") - getAtInt(sliderY, "height"));
        yScroll();
      }
    });
    
    // horizontal scroll
  sliderX.addEventListener("mousedown", function (e) {
    // distance between slider left and mousedown
    mouseDownXOffset =
      e.pageX - getAtInt(trackX, "left") - getAtInt(sliderX, "left");
    document.addEventListener("mousemove", xScrollbar);
  });
  // scrollbar x axis
  function xScrollbar(e) {
    // distance between slider left and track left
    xTravelled = e.pageX - getAtInt(trackX, "left") - mouseDownXOffset;
    xScroll();
  }
  // wheel x axis
  window.addEventListener("keydown", function (e) {
    if (e.key == "Shift") horizontalScroll = true;
    if (horizontalScroll) {
      canvas.addEventListener("wheel", xTravel);
    }
  });
  function xTravel(e) {
    xTravelled +=
      (e.deltaY / 1000) *
      (getAtInt(trackX, "width") - getAtInt(sliderX, "width"));
    xScroll();
  }
  window.addEventListener("keyup", function (e) {
    if (e.key == "Shift") horizontalScroll = false;
    canvas.removeEventListener("wheel", xTravel);
  });
  function xScroll() {
    if (xTravelled < 0) {
      sliderX.style.left = 0;
      shiftLeftX = 0;
      shiftRightX = canvas.width;
      xTravelled = 0;
      sliderX.style.width = 0.4 * getAtInt(trackX, "width");
      redraw();
    } else if (
      xTravelled >
      0.8 * (getAtInt(trackX, "width") - getAtInt(sliderX, "width"))
    ) {
      if (getAtInt(sliderX, "width") > 40) {
        sliderX.style.width =
          (canvas.width * canvas.width) / containerWidth + "px";
      }
      addColumns();
      containerWidth = cWidthPrefixSum[cWidthPrefixSum.length - 1];
      sliderX.style.left =
        0.5 * (getAtInt(trackX, "width") - getAtInt(sliderX, "width"));
      xTravelled =
        0.5 * (getAtInt(trackX, "width") - getAtInt(sliderX, "width"));
    } else {
      sliderX.style.left = xTravelled + "px";
      sliderPercentageX =
        (xTravelled /
          (getAtInt(trackX, "width") - getAtInt(sliderX, "width"))) *
        100;
      shiftLeftX = (sliderPercentageX * (containerWidth - canvas.width)) / 100;
      shiftRightX = shiftLeftX + canvas.width;
      redraw(0);
    }
  }

  // mouse up
  document.addEventListener("mouseup", function (e) {
    document.removeEventListener("mousemove", yScrollbar);
    document.removeEventListener("mousemove", xScrollbar);
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

  function addRows() {
    currentRowLength = rHeightPrefixSum.length;
    currentColumnLength = cWidthPrefixSum.length;
    for (let i = 0; i < 20; i++) {
      rHeightPrefixSum.push(
        rHeightPrefixSum[currentRowLength + i - 1] + height
      );
      cells[currentRowLength + i - 1] = [];

      for (let j = 0; j < currentColumnLength - 1; j++) {
        // main cells
        cell = new cellStruct(
          1,
          1,
          width,
          height,
          `${currentRowLength + i - 1} ${j}`,
          false,
          0,
          mainCtx
        );
        cells[currentRowLength + i - 1].push(cell);
      }

      // side cells
      cell = new cellStruct(
        1,
        1,
        width,
        height,
        `${currentRowLength + i - 1}`,
        false,
        0,
        sideCtx
      );
      sideCells.push(cell);
    }
  }

  function addColumns() {
    currentRowLength = rHeightPrefixSum.length;
    currentColumnLength = cWidthPrefixSum.length;
    for (let i = 0; i < currentRowLength - 1; i++) {
      for (let j = 0; j < 10; j++) {
        if (i == 0) {
          cWidthPrefixSum.push(
            cWidthPrefixSum[currentColumnLength + j - 1] + width
          );

          // top cells
          cell = new cellStruct(
            1,
            1,
            width,
            height,
            `${getColumnName(currentColumnLength + j)}`,
            false,
            0,
            topCtx
          );
          topCells.push(cell);
        }

        // main cells
        cell = new cellStruct(
          1,
          1,
          width,
          height,
          `${i} ${currentColumnLength + j}`,
          false,
          0,
          mainCtx
        );
        cells[i].push(cell);
      }
    }
  }

  function getColumnName(num) {
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

window.addEventListener("load", init);
