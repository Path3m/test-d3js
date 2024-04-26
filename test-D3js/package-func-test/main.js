/* import * as fs from "fs"; */
/* import * as d3 from "d3"; */

import * as util from "./utilitaire.js";
import * as jeu from "./data.js";

import { Streamgraph } from "./Streamgraph.js";
import { ImportanceHeatMap } from "./ImportanceHeatMap.js";


var site = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";
var othersite = "http://localhost:8000/package-func-test/datatest.csv"

//-----------------------------------------------------------
//Testing steamgraph class

console.log("Testing");

function maxInverse(x,y,z){ return Math.max(x, 1/y, 1/z); }
function sumInverse(x,y,z){ return x + 1/y + 1/z; }

function shuffle(array){
    let newarray = array.slice();
    return  Array.from(newarray.sort((a,b) => 0.5 - Math.random()));
}

function colorPalette(count, range, colorInterpol){
    const colors = new Array(count);
    for(let i=0; i<count; i++) colors[i] = colorInterpol((i/count)*(range.max-range.min)+range.min);
    return colors;
}

const colors = shuffle(colorPalette(10, {min:0.2, max:0.9}, d3.interpolateMagma));

// MUSIC DRAW ------------------------------------------------------------
var graphDayMusique = new Streamgraph("#streamgraph1", jeu.dayMusique);
graphDayMusique.draw(colors);

var hmMusicMaxInv = new ImportanceHeatMap(
    graphDayMusique, 
    maxInverse, 
    "Catégorie Musicale - fonction maxInverse", 
    "heatmapMusic-1");
hmMusicMaxInv.draw();

var hmMusicSumInv = new ImportanceHeatMap(
    graphDayMusique, 
    sumInverse,
    "Catégorie Musicale - fonction sumInverse",
    "heatmapMusic-2");
hmMusicSumInv.draw();

// US NAMES DRAW ---------------------------------------------------------
var graphUsaNames = new Streamgraph("#streamgraph2", jeu.usaNames);
graphUsaNames.draw(colors);

var hmNamesMaxInv = new ImportanceHeatMap(
    graphUsaNames, 
    maxInverse, 
    "Noms USA - fonction maxInverse", 
    "heatmapNames-1");
hmNamesMaxInv.draw();

var hmNamesSumInv = new ImportanceHeatMap(
    graphUsaNames, 
    sumInverse, 
    "Noms USA - fonction sumInverse", 
    "heatmapNames-2");
hmNamesSumInv.draw();

//-----------------------------------------------------------------------
console.log("fin de programme");