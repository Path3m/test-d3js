import * as d3 from "d3";
import * as fs from "fs";
import {maxLineSum, getKeys, rangeKeyValue} from "./test-sum-object.js";

//-----------------------------------------------------------
let matrix = [
    [1,1,1],
    [1,2,3],
    [1,2,1],
];

let objArray = [
    {truc:"3", machin:"3", chose:"4"},
    {truc:"3", machin:"1", chose:"1"},
    {truc:"5", machin:"2", chose:"2"},
    {truc:"3", machin:"2", chose:"2"},
    {truc:"4", machin:"2", chose:"2"}
];

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
const csv = fs.readFileSync("CSV-data-file/datatest.csv", "utf8");
const data = d3.csvParse(csv);
console.log(data);

var keys = getKeys(data);
keys.forEach( current => {
    console.log(data[current]);
});

console.log("fin de programme");