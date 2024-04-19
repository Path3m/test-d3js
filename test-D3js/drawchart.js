// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#steamgraph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

/**
 * Initialize an svg
 */
function initSVG(divID) {

  //TODO : implement a function that uses a css container to init the svg object

  return null;
}

var site = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";
var fileName = "http://localhost:8000/CSV-data-file/datatest.csv";

/**
 * 
 * @param {*} data 
 * @param {*} scaleX 
 * @returns 
 */
function createAxeX(data, scaleX){
  return d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d[scaleX]; }))
    .range([ 0, width ]);
}

/**
 * 
 * @param {*} data 
 * @param {*} categorieKey 
 * @returns 
 */
function createAxeY(data, categorieKey){
  let Ywidth = d3.extent(data, function(d) {
    let sum = 0;
    categorieKey.forEach(function(current){ sum += parseInt(d[current]); });
    return sum; 
  });
  
  let maxWidth = Math.max(...Ywidth);
  let rangeY = [-(maxWidth/2), (maxWidth/2)];

  return d3.scaleLinear()
    .domain(rangeY)
    .range([ height, 0 ]);
}

/**
 * 
 * @param {*} colors 
 * @param {*} data 
 */
function addDataToGraph(colors, data) {

  // List of groups = header of the csv files
  var keys = data.columns.slice(1);
  var Xscale = (data.columns)[0]; //scale of the x axe

  // Add X axis
  var x = createAxeX(data, Xscale);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  // Add Y axis
  var y = createAxeY(data, keys);
  svg.append("g")
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

/**
 * 
 * @param {*} csvLink 
 * @returns 
 */
function drawgraph(csvLink){

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

  return d3.csv(csvLink, function(data){ addDataToGraph(colors, data); });
}

var mygraph = drawgraph(site);

d3.csv(fileName, function(d){console.log(d);});