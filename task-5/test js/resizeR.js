// handleMouseDown(e) {
//     const { offsetX, offsetY } = e;
//     this.isSelected = true;
//     this.isDragging = true;
//     this.isResizing = true;
//     let x = 0;
//     let y = 0;
//     let col = 0;
//     let row = 0;
//     for (let i = 0; i < this.numCols; i++) {
//       x += this.colWidth[i];
//       if (x > offsetX) {
//         // console.log(i);
//         col = i;
//         break;
//       }
//     }
//     // console.log(offsetY);
//     for (let j = 0; j < this.numRows; j++) {
//       y += this.rowHeight[j];
//       if (y > offsetY) {
//         // console.log(j);
//         row = j;
//         break;
//       }
//     }
//     if (offsetX > x - 10 && offsetX < x + 10) {
//       console.log("called");
//       this.isResizing = true;
//       this.resizeColIndex = col;
//       this.startX = offsetX;
//       this.canvas.style.cursor = "col-resize";
//     }
//   }
 
//   handleMouseMove(e) {
//     const { offsetX, offsetY } = e;
 
//     if (this.isResizing) {
//       const delta = offsetX - this.startX;
//       this.posX[this.resizeColIndex] += delta;
//       this.colWidth[this.resizeColIndex] += delta;
//       this.startX = offsetX;
//       // this.gMain.drawMainGrid();
//       this.drawRowGrid();
//     } else {
//       let x = 0;
//       for (let i = 0; i < this.numCols; i++) {
//         x += this.colWidth[i];
//         if (offsetX > x - 5 && offsetX < x + 5) {
//           this.canvas.style.cursor = "col-resize";
//           return;
//         }
//       }
//       this.canvas.style.cursor = "default";
//     }
//   }