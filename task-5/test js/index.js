const div = document.getElementById("main-area");

// top canvas
const topCanvas = document.getElementById("horizontal");
const topCtx = topCanvas.getContext("2d");
topCanvas.height = 20;
topCanvas.width = div.clientWidth - 60;

// side canvas
const sideCanvas = document.getElementById("vertrical");
const sideCtx = sideCanvas.getContext("2d");
sideCanvas.height = div.clientHeight - 20;
sideCanvas.width = 60;

// main canvas
const canvas = document.getElementById("canvas");
const mainCtx = canvas.getContext("2d");
canvas.height = div.clientHeight - 35;
canvas.width = div.clientWidth - 60;

const scroller = document.querySelector("#scroller");

var width = 60;
var height = 20;

var rows = 100;
var columns = 60;
let cells = [];
let topCells = [];
let sideCells = [];
var selectedMain = [];
var selectedTop = [];
var selectedSide = [];
var cWidthPrefixSum = [];
let rHeightPrefixSum = [];

var shiftTopY = 0;
var shiftBottomY = canvas.height;
var shiftLeftX = 0;
var shiftRightX = canvas.width;

class cellStruct {

  createCell() {
    this.ctx.strokeStyle = "#E0E0E0";
    this.ctx.strokeRect(this.xVal, this.yVal, width, height);
    this.ctx.font = "14px serif";
    (this.ctx.fillStyle = "#000"),
      this.ctx.fillText(
        this.value,
        this.xVal + 12,
        this.yVal + this.height / 1.2,
        this.width
      );
    if (this.isSelected) {
      this.selectCell();
    }
  }
  updateCell() {
    if (this.isClicked) {
      this.ctx.clearRect(this.xVal, this.yVal, width, height);
      this.createCell();
    }
  }
  selectCell() {
    if (this.isSelected) {
      this.ctx.fillStyle = "rgba(19, 126, 67, 0.1)";
      this.ctx.fillRect(this.xVal, this.yVal, width, height);
    } else {
      this.ctx.clearRect(this.xVal, this.yVal, width, height);
      this.createCell();
    }
  }
  highlightCell() {
    if (this.isSelected) {
      this.ctx.fillStyle = "rgba(19, 126, 67, 0.2)";
      this.ctx.fillRect(this.xVal, this.yVal, width, height);
    } else {
      this.ctx.clearRect(this.xVal, this.yVal, width, height);
      this.createCell();
    }
  }
}

function init() {
  rHeightPrefixSum.push(0);
  cWidthPrefixSum.push(0);

  function createGrid() {
    // Top Canvas
    for (let j = 0; j < columns; j++) {
      cell = new cellStruct(
        1 + j * width + 0.5,
        1,
        width,
        height,
        `${getColumnName(j + 1)}`,
        false,
        0,
        topCtx
      );
      cell.createCell();
      topCells.push(cell);
    }

    // Side Canvas
    for (let i = 0; i < rows; i++) {
      cell = new cellStruct(
        1,
        1 + i * height + 0.5,
        width,
        height,
        `${i}`,
        false,
        0,
        sideCtx
      );
      cell.createCell();
      sideCells.push(cell);
    }
    // Main Canvas
    for (let i = 0; i < rows; i++) {
      rHeightPrefixSum.push(rHeightPrefixSum[i] + height);
      cells[i] = [];
      for (let j = 0; j < columns; j++) {
        if (i == 0) {
          cWidthPrefixSum.push(cWidthPrefixSum[j] + width);
        }
        cell = new cellStruct(
          1 + j * width + 0.5,
          1 + i * height + 0.5,
          width,
          height,
          `${i} ${j}`,
          false,
          0,
          mainCtx
        );
        cell.createCell();
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

  createGrid();
}

// on load create canvas
window.addEventListener("load", init);
