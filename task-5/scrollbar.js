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
        document.addEventListener("mousemove", xScroll)

    })

    document.addEventListener("mouseup", function(e) {
        document.removeEventListener("mousemove", xScroll)
        }
    )
    
    function xScroll(e){
        e.preventDefault()
        endMouseY = e.pageY
        slider.proposedNewPosY = e.pageY - getAtInt(track, "top") - slider.mouseDownYOffset;
        
        if (slider.proposedNewPosY < 0) {
            slider.style.top = 0;
        } else if (slider.proposedNewPosY > getAtInt(track, "height") - getAtInt(slider, "height")) {
            slider.style.top = getAtInt(track, "height") - getAtInt(slider, "height") + "px";
        } else {
            slider.style.top = slider.proposedNewPosY + "px";
            sliderPercentage = (slider.proposedNewPosY/  (getAtInt(track, "height") - getAtInt(slider, "height"))*100)
            // sliderPercentage = (Math.max(startMouseY,endMouseY) - Math.min(startMouseY,endMouseY)) / (getAtInt(track, "height") - getAtInt(slider, "height")) * 100;
            shiftTopY = (sliderPercentage * (containerHeight-500)) / 100;
            shiftBottomY = shiftTopY + 500;
            redraw(shiftTopY,shiftBottomY) 
        }
    }

    function redraw(shiftTopY, shiftBottomY){
        ctx.reset(0,0,1000,500)
        topIndex = cellIndex(shiftTopY)
        bottomIndex = cellIndex(shiftBottomY)
        console.log(topIndex-1,bottomIndex)
        for (let i = topIndex-1; i < bottomIndex; i++) {
            gapX = 0
            for (let j = 0; j < 20; j++) {
                cells[i][j].yVal = rHeightPrefixSum[i] -shiftTopY ;
                cells[i][j].xVal = 0;
                cells[i][j].xVal += gapX -0.5;
                cells[i][j].width = 20;
                cells[i][j].createCell();
                gapX += 60;
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