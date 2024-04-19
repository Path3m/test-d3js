import * as d3 from "d3";

export class Steamgraph {

    constructor(divID){
        this.svg = "noSVG";
        this.divID = divID;

        // set the dimensions and margins of the graph
        this.margin = {top: 20, right: 30, bottom: 30, left: 60};
        this.width = 1200 - this.margin.left - this.margin.right;
        this.height = 700 - this.margin.top - this.margin.bottom;
    }

    //-------------------------------------------------------------------
    /**
     * Initialize an svg
     * @param {*} divID the div in the html page
     * @returns an svg object
     */
    initSVG(divID) {
        //TODO : implement a function that uses a css container to init the svg object ?    
    
        // append the svg object to the body of the page
        this.svg = d3.select("#"+divID)
        .append("svg")
          .attr("width", this.width + this.margin.left + this.margin.right)
          .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
          .attr("transform",
              "translate(" + this.margin.left + "," + this.margin.top + ")");
    }

    //-------------------------------------------------------------------
    /**
     * 
     * @param {*} data 
     * @param {*} scaleX 
     * @returns 
     */
    createAxeX(data, scaleX){
        return d3.scaleLinear()
          .domain(d3.extent(data, function(d) { return d[scaleX]; }))
          .range([ 0, this.width ]);
    }

    //-------------------------------------------------------------------
    /**
     * 
     * @param {*} data 
     * @param {*} categorieKey 
     * @returns 
     */
    createAxeY(data, categorieKey){
        let Ywidth = d3.extent(data, function(d) {
          let sum = 0;
          categorieKey.forEach(function(current){ sum += parseInt(d[current]); });
          return sum; 
        });
        
        let maxWidth = Math.max(...Ywidth);
        let rangeY = [-(maxWidth/2), (maxWidth/2)];
      
        return d3.scaleLinear()
          .domain(rangeY)
          .range([ this.height, 0 ]);
    }

    //-------------------------------------------------------------------
    /**
     * 
     * @param {*} colors 
     * @param {*} data 
     */
    addDataToGraph(colors, data) {

        // List of groups = header of the csv files
        var keys = data.columns.slice(1);
        var Xscale = (data.columns)[0]; //scale of the x axe
      
        // Add X axis
        var x = createAxeX(data, Xscale);
        this.svg.append("g")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3.axisBottom(x).ticks(5));
      
        // Add Y axis
        var y = createAxeY(data, keys);
        this.svg.append("g")
          .call(d3.axisLeft(y));
      
        // color palette
        var color = d3.scaleOrdinal()
          .domain(keys)
          .range(colors)
      
        //stack the data?
        var stackedData = d3.stack()
          .offset(d3.stackOffsetSilhouette)
          .keys(keys)
          (data)
      
        // Show the areas
        svg
          .selectAll("mylayers")
          .data(stackedData)
          .enter()
          .append("path")
            .style("fill", function(d) { return color(d.key); })
            .attr("d", d3.area()
              .x(function(d, i) { return x(d.data[Xscale]); })
              .y0(function(d) { return y(d[0]); })
              .y1(function(d) { return y(d[1]); })
          )
      
    }

    //-------------------------------------------------------------------
    /**
     * 
     * @param {*} file
     */
    drawgraph(file){

        //TODO : here, we can read the csv file to determine the contrast need ?
  
        var colors = [
          'rgb(255,0,0)',
          'rgb(255,0,255)',
          'rgb(255,255,0)',
          'rgb(255,255,255)',
          'rgb(0,0,0)',
          'rgb(0,0,255)',
          'rgb(0,255,0)',
          'rgb(0,255,255)'
        ];
  
        var csv = fs.readFileSync(file);
        var data = d3.csvParse(csv);

        data.forEach(current => this.addDataToGraph(colors, current));
    }

}