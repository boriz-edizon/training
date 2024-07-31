function init() {
    var containerHeight = rHeightPrefixSum[rHeightPrefixSum.length-1]
    var containerWidth = cWidthPrefixSum[cWidthPrefixSum.length-1]   
    var sliderY = document.getElementById("slider-y")
    var trackY = document.getElementById("track-y");
    var sliderPercentageY = null;
    var shiftTopY = 0;
    var shiftBottomY = canvas.height;

    var sliderX = document.getElementById("slider-x")
    var trackX = document.getElementById("track-x");
    var sliderPercentageX = null;
    var shiftLeftX = 0;
    var shiftRightX = canvas.width
    
    var getAtInt = function getAtInt(obj, attrib) {
        return parseInt(getComputedStyle(obj, null)[attrib], 10);
    };

    sliderY.addEventListener("mousedown", function(e) {
        mouseDownYOffset = e.pageY - getAtInt(trackY, "top") - getAtInt(sliderY, "top");
        document.addEventListener("mousemove", yScroll)
    })

    sliderX.addEventListener("mousedown", function(e) {
        mouseDownXOffset = e.pageX - getAtInt(trackX, "left") - getAtInt(sliderX, "left");
        document.addEventListener("mousemove", xScroll)
    })

    document.addEventListener("mouseup", function(e) {
        document.removeEventListener("mousemove", yScroll)
        document.removeEventListener("mousemove", xScroll)
        }
    )
    
    function yScroll(e){
        e.preventDefault()
        sliderY.proposedNewPosY = e.pageY - getAtInt(trackY, "top") - mouseDownYOffset;
        if (sliderY.proposedNewPosY < 0) {
            sliderY.style.top = 0;
            redraw(0,canvas.height)
        } else if (sliderY.proposedNewPosY > 0.8 * (getAtInt(trackY, "height") - getAtInt(sliderY, "height")) ){
            if(getAtInt(sliderY,"height") > 40) {
                sliderY.style.height = ((canvas.height * canvas.height) / containerHeight) + "px";
            }
            addRows()
            containerHeight = rHeightPrefixSum[rHeightPrefixSum.length-1]
            sliderY.style.top = 0.5 * (getAtInt(trackY, "height") - getAtInt(sliderY, "height"))   
        } else {
            sliderY.style.top = sliderY.proposedNewPosY + "px";
            sliderPercentageY = (sliderY.proposedNewPosY/  (getAtInt(trackY, "height") - getAtInt(sliderY, "height"))*100)
            shiftTopY = (sliderPercentageY * (containerHeight - canvas.height)) / 100;
            shiftBottomY = shiftTopY + canvas.height;
            redraw(1) 
        }
    }

    function xScroll(e){
        e.preventDefault()
        sliderX.proposedNewPosX = e.pageX - getAtInt(trackX, "left") - mouseDownXOffset;
        if (sliderX.proposedNewPosX < 0) {
            sliderX.style.left = 0;
            redraw(0,canvas.height)
        } else if (sliderX.proposedNewPosX > 0.8 * (getAtInt(trackX, "width") - getAtInt(sliderX, "width")) ){
            if(getAtInt(sliderX,"width") > 40) {
                sliderX.style.width = ((canvas.width * canvas.width) / containerWidth) + "px";
            }
            addColumns()
            containerWidth = cWidthPrefixSum[cWidthPrefixSum.length-1]
            sliderX.style.left = 0.5 * (getAtInt(trackX, "width") - getAtInt(sliderX, "width"))   
        } else {
            sliderX.style.left = sliderX.proposedNewPosX + "px";
            sliderPercentageX = (sliderX.proposedNewPosX /  (getAtInt(trackX, "width") - getAtInt(sliderX, "width"))*100)
            shiftLeftX = (sliderPercentageX * (containerWidth-canvas.width)) / 100;
            shiftRightX = shiftLeftX + canvas.width;
            redraw(0) 
        }
    }

        function redraw(flag){
            topIndex = cellYIndex(shiftTopY)
            bottomIndex = cellYIndex(shiftBottomY)
            leftIndex = cellXIndex(shiftLeftX)
            rightIndex = cellXIndex(shiftRightX)

            // top cells
            if(!flag){
                topCtx.reset(0,0,topCanvas.width,topCanvas.height)
                for (let j = leftIndex-1; j < rightIndex; j++) {
                    topCells[j].xVal = cWidthPrefixSum[j] -shiftLeftX +0.5 ;
                    topCells[j].createCell();
                }
            }

            // side cells
            if(flag){
                sideCtx.reset(0,0,sideCanvas.width,sideCanvas.height)
                for (let i = topIndex-1; i < bottomIndex; i++) {
                    sideCells[i].yVal = rHeightPrefixSum[i] -shiftTopY +0.5 ;
                    sideCells[i].createCell();
                }
            }

            // main cells
            mainCtx.reset(0,0,canvas.width,canvas.height)
            for (let i = topIndex-1; i < bottomIndex; i++) {
                for (let j = leftIndex-1; j < rightIndex; j++) {
 
                       cells[i][j].yVal = rHeightPrefixSum[i] - shiftTopY +0.5 ;
                       cells[i][j].xVal = cWidthPrefixSum[j] - shiftLeftX +0.5;
                       cells[i][j].createCell();


                }
            }
        }

        function addRows() {
            // console.log(cells)
            // console.log(rHeightPrefixSum)

            // for (let i = ; i <   ; i++) {
            //     // rHeightPrefixSum.push(rHeightPrefixSum[rHeightPrefixSum.length -1 ] + height);
            //     // x = cells.length
            //     cells[x] = [];
            //     for (let j = 0; j < 28; j++) {
            //       if (i == 0) {
            //         // cWidthPrefixSum.push(cWidthPrefixSum[cWidthPrefixSum.length -1 ] + width);
            //       }
            //     //   cell = new cellStruct(1, 1, width, height, `${x} ${j}`, false, 0,mainCtx);
            //       cells[x].push(cell);
            //     }
            //     // cell = new cellStruct(1, 1, width, height, `${x}`, false, 0,sideCtx);
            //     // sideCells.push(cell)
            // }

            currentRowLength = rHeightPrefixSum.length
            currentColumnLength = cWidthPrefixSum.length 
            for(let i =0; i<20;i++){
                rHeightPrefixSum.push(rHeightPrefixSum[currentRowLength + i -1] + height)
                cells[currentRowLength+i-1] = []

                for(let j = 0 ; j < currentColumnLength-1; j++){
                    // main cells
                    cell = new cellStruct(1, 1, width, height, `${currentRowLength+i-1} ${j}`, false, 0,mainCtx);
                    cells[currentRowLength+i-1].push(cell)
                }

                // side cells
                cell = new cellStruct(1, 1, width, height, `${currentRowLength+i-1}`, false, 0,sideCtx);
                sideCells.push(cell)
            }

        }

        function addColumns() {
            currentRowLength = rHeightPrefixSum.length
            currentColumnLength = cWidthPrefixSum.length 
            for(let i = 0; i < currentRowLength-1; i++){
                for(let j =  0; j < 10; j++){
                    if(i==0){
                        cWidthPrefixSum.push(cWidthPrefixSum[currentColumnLength + j -1] + width)

                        // top cells
                        cell = new cellStruct(1, 1, width, height, `${getColumnName(currentColumnLength + j)}`, false, 0,topCtx);
                        topCells.push(cell)
                    }

                    // main cells
                    cell = new cellStruct(1, 1, width, height, `${i} ${currentColumnLength + j}`, false, 0,mainCtx);
                    cells[i].push(cell)
                }
            }
        }

        function getColumnName(num){
            var s = '', t;
          
            while (num > 0) {
              t = (num - 1) % 26;
              s = String.fromCharCode(65 + t) + s;
              num = (num - t)/26 | 0;
            }
            return s || undefined;
          }
}

function cellXIndex(num){
    for(var i = 0; i < cWidthPrefixSum.length; i++){
        if(num >= cWidthPrefixSum[i-1] && num < cWidthPrefixSum[i]) return i
    }
}

function cellYIndex(num){
    for(var i = 0; i < rHeightPrefixSum.length; i++){
        if(num >= rHeightPrefixSum[i-1] && num < rHeightPrefixSum[i]) return i
    }
}


window.addEventListener("load", init)