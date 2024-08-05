export class dimensions{
    constructor(rows,columns,width,height){
        this.rows=rows;
        this.columns=columns;
        this.width=width;
        this.height=height;
        
        this.selectedMain = []
        this.selectedTop = []
        this.selectedSide = []

        this.cWidthPrefixSum=[0];
        this.rHeightPrefixSum=[0];

        this.shiftTop;
        this.shiftBottom;
        this.shiftLeft;
        this.shiftRight;

        this.topIndex;
        this.bottomIndex;
        this.leftIndex;
        this.rightIndex;
    }

    cellXIndex(num) {
        for (var i = 0; i < this.cWidthPrefixSum.length; i++) {
          if (num >= this.cWidthPrefixSum[i - 1] && num < this.cWidthPrefixSum[i]) return i;
        }
      }

    cellYIndex(num) {
        for (var i = 0; i < this.rHeightPrefixSum.length; i++) {
          if (num >= this.rHeightPrefixSum[i - 1] && num < this.rHeightPrefixSum[i]) return i;
        }
      }    
}