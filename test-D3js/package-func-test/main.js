/* import * as fs from "fs"; */
import {maxLineSum, getKeys, rangeKeyValue} from "./test-sum-object.js";
import { Steamgraph } from "./Steamgraph.js";
import * as jeu from "./data.js";

var site = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";
var othersite = "http://localhost:8000/package-func-test/datatest.csv"
//-----------------------------------------------------------
//TESTING Test-sum-object function

//let matrix = [
//    [1,1,1],
//    [1,2,3],
//    [1,2,1],
//];
//
//let objArray = [
//    {truc:"3", machin:"3", chose:"4"},
//    {truc:"3", machin:"1", chose:"1"},
//    {truc:"5", machin:"2", chose:"2"},
//    {truc:"3", machin:"2", chose:"2"},
//    {truc:"4", machin:"2", chose:"2"}
//];
//
//console.log(maxLineSum(matrix));
//console.log(rangeKeyValue(objArray, parseInt, 1));


//------------------------------------------------------------------------------
//TESTING THE d3.extent() function

//var site = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";
//
//function logger(data){
//    console.log(data);
//}
//
////let data = await d3.csv(site, logger);
////console.log(data);
//
//let width = d3.extent(objArray, function(o){return o.truc; });
//let maxWidth = Math.max(...width);
//
//console.log(width);
//console.log(maxWidth);

//-----------------------------------------------------------
//READING FROM A LOCAL CSV FILE

//const csv = fs.readFileSync(csv, "utf8");
//const data = d3.csvParse(csv);
//console.log(data);
//
//var keys = getKeys(data);
//keys.forEach( current => {
//    console.log(data[current]);
//});


//-----------------------------------------------------------
//Testing steamgraph class

console.log("Testing Steamgraph class");
var dayMusique = new Steamgraph("#steamgraph1");
var usaNames = new Steamgraph("#steamgraph2");

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

dayMusique.drawgraph(colors, jeu.dayMusique);
usaNames.drawgraph(colors, jeu.usaNames);


//mygraph.drawgraph("CSV-data-test/datatest.csv");

console.log("fin de programme");