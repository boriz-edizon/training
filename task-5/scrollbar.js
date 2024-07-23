function init() {
    var containerHeight = rHeightPrefixSum[rHeightPrefixSum.length-1]
    var containerWidth = cWidthPrefixSum[cWidthPrefixSum.length-1]   
    var slider = document.getElementById("slider-y"),track = document.getElementById("track-y");
    var sliderPercentage = null;

    var getAtInt = function getAtInt(obj, attrib) {
        return parseInt(getComputedStyle(obj, null)[attrib], 10);
    };

    var startMouseY , endMouseY

    slider.addEventListener("mousedown", function(e) {
        slider.mouseDownYOffset = e.pageY - getAtInt(track, "top") - getAtInt(slider, "top");
        startMouseY = e.pageY
        document.addEventListener("mousemove", xScroll)

    })

    document.addEventListener("mouseup", function(e) {
        document.removeEventListener("mousemove", xScroll)
        }
    )
    
    function xScroll(e){
        endMouseY = e.pageY
        slider.proposedNewPosY = e.pageY - getAtInt(track, "top") - slider.mouseDownYOffset;
        if (slider.proposedNewPosY < 0) {
            slider.style.top = 0;
        } else if (slider.proposedNewPosY > getAtInt(track, "height") - getAtInt(slider, "height")) {
            slider.style.top = getAtInt(track, "height") - getAtInt(slider, "height") + "px";

        } else {
            slider.style.top = slider.proposedNewPosY + "px";
            sliderPercentage = (Math.max(startMouseY,endMouseY) - Math.min(startMouseY,endMouseY)) / (getAtInt(track, "height") - getAtInt(slider, "height")) * 100;
            
            shiftTopY = sliderPercentage * containerHeight / 100;
            shiftBottomY = shiftTopY + 500;
            redraw(sliderPercentage,shiftTopY,shiftBottomY)
        }
    }

    function redraw(sliderPercentage,shiftTopY, shiftBottomY){
        ctx.reset
        (0,0,1000,500)
        topIndex = cellIndex(shiftTopY)
        bottomIndex = cellIndex(shiftBottomY)
        console.log(topIndex,bottomIndex)
        gapY = 0
        for (let i = topIndex-1; i < bottomIndex; i++) {
            gapX = 0
            for (let j = 0; j < 20; j++) {
            cells[i][j].yVal = - shiftTopY + gapY
            cells[i][j].xVal = 0
            cells[i][j].xVal += gapX
            cells[i][j].createCell()
            gapX += 80
            }
            gapY += 30
        }
        }
    }

    function cellIndex(num){
        for(var i = 0; i < rHeightPrefixSum.length; i++){
            if(num >= rHeightPrefixSum[i-1] && num < rHeightPrefixSum[i])
                return i
        }
    }

    function addMoreCells(){
        for(let i = 0; i < 20; i++) {
            rowHeight.push(height)
            cells[i] = []
            for(let j = 0; j<40 ; j++){
                if(i==0){
                    columnWidth.push(width)
                }
                cell = new cellStruct(null, null,width,height,' ', false,0)
                cells[i].push(cell)
            }
        }
}

window.addEventListener("load", init)