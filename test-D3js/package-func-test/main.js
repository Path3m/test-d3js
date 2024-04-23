/* import * as fs from "fs"; */
import {maxLineSum, getKeys, rangeKeyValue} from "./test-sum-object.js";
import { Steamgraph } from "./Streamgraph.js";
import * as jeu from "./data.js";

var site = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";
var othersite = "http://localhost:8000/package-func-test/datatest.csv"

//-----------------------------------------------------------
//Testing steamgraph class

console.log("Testing Streamgraph class");

var dataMusic = d3.csvParse(jeu.dayMusique);
var dataUSName = d3.csvParse(jeu.usaNames);

var dayMusique = new Steamgraph("#streamgraph1", dataMusic);
var usaNames = new Steamgraph("#streamgraph2", dataUSName);

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

dayMusique.draw(colors);
usaNames.draw(colors);

/* var importance = new Array(10);
for(let i = 0; i < importance.length; i++){ importance[i] = new Array(10); }

importance[0][0] = 1;
console.log(importance); */ 

var importance = dayMusique.computeImportanceMatrix();
console.log(importance);

/* importance = usaNames.computeImportanceMatrix();
console.log(importance); */


//mygraph.drawgraph("CSV-data-test/datatest.csv");

console.log("fin de programme");