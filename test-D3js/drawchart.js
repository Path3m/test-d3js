//import {maxLineSum} from "function_test";

// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#steamgraph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
var site = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";
var fileName = "./datatest.csv";

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

function parseData(colors, data) {

  // List of groups = header of the csv files
  var keys = data.columns.slice(1);
  var first = (data.columns)[0];

  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d[first]; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  // Add Y axis
  let Ywidth = d3.extent(data, function(d) {
      let sum = 0;
      keys.forEach(function(current){ sum += parseInt(d[current]); });
      return sum; 
  });
  let maxWidth = Math.max(...Ywidth);
  let rangeY = [-(maxWidth/2), (maxWidth/2)];

  var y = d3.scaleLinear()
    .domain(rangeY)
    .range([ height, 0 ]);
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
        .x(function(d, i) { return x(d.data[first]); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })
    )

}

//d3.csv(site, function(data){console.log(data);});
d3.csv(site, function(data){ parseData(colors, data); });

//TODO : vérifier que l'on peut bien récupérer toutes les données nécessaires
//en déduire l'étendue des axes x et y