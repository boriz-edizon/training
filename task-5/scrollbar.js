var slider = document.getElementById("slider"),track = document.getElementById("track");
var sliderPercentage = null;

slider.onmousedown = function (e) {
    slider.mouseDownYOffset = e.pageY - getAtInt(track, "top") - getAtInt(slider, "top");
    document.onmousemove = slider.mouseFunction;
};
  
document.onmouseup = function () {
    document.onmousemove = function () {};
};
  
var getAtInt = function getAtInt(obj, attrib) {
    return parseInt(getComputedStyle(obj, null)[attrib], 10);
};
slider.mouseFunction = function (e) {
    slider.proposedNewPosY = e.pageY - getAtInt(track, "top") - slider.mouseDownYOffset;
    if (slider.proposedNewPosY < 0) {
        slider.style.top = 0;
    } else if (slider.proposedNewPosY > getAtInt(track, "height") - getAtInt(slider, "height")) {
        slider.style.top = getAtInt(track, "height") - getAtInt(slider, "height") + "px";
    } else {
        slider.style.top = slider.proposedNewPosY + "px";
    }
    sliderPercentage = getAtInt(slider, "top") / (getAtInt(track, "height") - getAtInt(slider, "height")) * 100;
}

var btn = document.getElementById("button")
btn.addEventListener("click", function(e) {
    ctx.clearRect(0, 0, 1000, 500)
    var deltaX = 10
    var deltaY = 10
    var shiftX = deltaX;
    var shiftY = deltaY
    var tillY = shiftY + (canvasHeight / columnHeight);
    var tillX = shiftX + (canvasWidth / columnWidth);

});

redrawCell(i,j)