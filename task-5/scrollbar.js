function init() {
    var containerHeight = rHeightPrefixSum[rHeightPrefixSum.length-1]
    var containerWidth = cWidthPrefixSum[cWidthPrefixSum.length-1]   
    var slider = document.getElementById("slider-y"),track = document.getElementById("track-y");
    var sliderPercentage = null;
    var getAtInt = function getAtInt(obj, attrib) {
        return parseInt(getComputedStyle(obj, null)[attrib], 10);
    };

    slider.addEventListener("mousedown", function(e) {
        slider.mouseDownYOffset = e.pageY - getAtInt(track, "top") - getAtInt(slider, "top");
        document.addEventListener("mousemove", yScroll)
    })

    document.addEventListener("mouseup", function(e) {
        document.removeEventListener("mousemove", yScroll)
        }
    )
    
    function yScroll(e){
        e.preventDefault()
        slider.proposedNewPosY = e.pageY - getAtInt(track, "top") - slider.mouseDownYOffset;
        if (slider.proposedNewPosY < 0) {
            slider.style.top = 0;
            redraw(0,500)
        } else if (slider.proposedNewPosY > 0.8 * (getAtInt(track, "height") - getAtInt(slider, "height")) ){
            if(getAtInt(slider,"height") > 40) {
                slider.style.height = ((500 * 500) / containerHeight) + "px";
            }
            addRows()
            containerHeight = rHeightPrefixSum[rHeightPrefixSum.length-1]
            // slider.style.top
        } else {
            slider.style.top = slider.proposedNewPosY + "px";
            sliderPercentage = (slider.proposedNewPosY/  (getAtInt(track, "height") - getAtInt(slider, "height"))*100)
            shiftTopY = (sliderPercentage * (containerHeight-500)) / 100;
            shiftBottomY = shiftTopY + 500;
            redraw(shiftTopY,shiftBottomY) 
        }
    }

    function redraw(shiftTopY, shiftBottomY){
        ctx.reset(0,0,1000,500)
        topIndex = cellIndex(shiftTopY)
        bottomIndex = cellIndex(shiftBottomY)

        for (let i = topIndex-1; i < bottomIndex; i++) {
            for (let j = 0; j < 20; j++) {
                   cells[i][j].yVal = rHeightPrefixSum[i] -shiftTopY +0.5 ;
                   cells[i][j].xVal = cWidthPrefixSum[j] +0.5;
                   cells[i][j].width = 20;
                   cells[i][j].createCell();
                }
        }
        }

        function addRows() {
            for (let i = 0; i < 25  ; i++) {
                rHeightPrefixSum.push(rHeightPrefixSum[rHeightPrefixSum.length -1 ] + height);
                x = cells.length
                cells[x] = [];
                for (let j = 0; j < 20; j++) {
                  if (i == 0) {
                    cWidthPrefixSum.push(cWidthPrefixSum[cWidthPrefixSum.length -1 ] + width);
                  }
                  cell = new cellStruct(1, 1, width, height, `${x} ${j}`, false, 0);
                  cells[x].push(cell);
                }
              }
        }

    }

function cellIndex(num){
    for(var i = 0; i < rHeightPrefixSum.length; i++){
        if(num >= rHeightPrefixSum[i-1] && num < rHeightPrefixSum[i]) return i
    }
}

window.addEventListener("load", init)