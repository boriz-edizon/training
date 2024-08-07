export class graph {
    constructor(dimension) {
      this.dimension = dimension

      this.graphCanvasElement = document.getElementById("myChart");
      this.graph = document.querySelector(".graph");
      this.barGraph = document.querySelector(".graph-bar-btn");
      this.lineGraph = document.querySelector(".graph-line-btn");
      this.pieGraph = document.querySelector(".graph-pie-btn");
      this.graphCloseBtn = document.querySelector(".graph-close")
      
      this.draw = false
      this.init()
    }
  
    init() {

        this.barGraph.addEventListener("click", () => {
            this.graph.style.display = "inline-block";
            this.drawBarGraph();
          });
      
          this.lineGraph.addEventListener("click", () => {
            this.graph.style.display = "inline-block";
            this.drawLineGraph();
          });
      
          this.pieGraph.addEventListener("click", () => {
            this.graph.style.display = "inline-block";
            this.drawPieGraph();
          });

          this.graphCloseBtn.addEventListener("click",() => {
            this.graph.style.display = "none";
          });
    }

    // destroy graph
    destroyGraph(){
      if(this.draw){
          this.draw.destroy()
          this.draw = false
      }
    }

    //  * Drawing Bar Graph
    drawBarGraph() {
      this.destroyGraph()
      this.draw = new Chart(this.graphCanvasElement, {
        type: "bar",
        data: {
          labels: this.dimension.sideValues,
          datasets: [
            {
              label: "",
              data: this.dimension.mainValues,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  
    //  * Drawing Line Graph
    drawLineGraph() {
      this.destroyGraph()
      this.draw = new Chart(this.graphCanvasElement, {
        type : 'line',
        data : {
          labels : this.dimension.sideValues,
          datasets : [
              {
                data : this.dimension.mainValues,
                label : "",
                borderColor : "#3cba9f",
                fill : false
              }]
        },
        options : {
          title : {
            display : true,
          }
        }
      });
    }
  
    //  * Drawing Pie Chart
    drawPieGraph(){
      this.destroyGraph()
      this.draw=new Chart(this.graphCanvasElement, {
        type : 'pie',
        data : {
          labels : this.dimension.sideValues,
          datasets : [ {
            data : this.dimension.mainValues,
          } ]
        },
        options : {
          title : {
            display : true,
          }
        }
      });
    }
  }