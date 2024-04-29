/* import * as fs from "fs"; */
/* import * as d3 from "d3"; */

import * as util from "./utilitaire.js";
import * as jeu from "./data.js";

import { Streamgraph } from "./Streamgraph.js";
import { ImportanceHeatMap } from "./ImportanceHeatMap.js";
import { ColorPalette } from "./ColorPalette.js";


var site = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";
var othersite = "http://localhost:8000/package-func-test/datatest.csv"

//-----------------------------------------------------------
//Testing steamgraph class

console.log("Testing");

function maxInverse(x,y,z){ return Math.max(x, 1/y, 1/z); }
function sumInverse(x,y,z){ return x + 1/y + 1/z; }

let palette = new ColorPalette(d3.interpolateSpectral);
palette.draw("color-palette", palette.palette, []);

let cm = palette.colorRange(4);
let cn = palette.colorRange(8);

// MUSIC DRAW ------------------------------------------------------------
var graphDayMusique = new Streamgraph("#streamgraph1", jeu.dayMusique);
palette.draw("color-music", cm, graphDayMusique.data.columns.slice(1));
graphDayMusique.draw(cm);

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
palette.draw("color-names", cn, graphUsaNames.data.columns.slice(1));
graphUsaNames.draw(cn);

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
console.log(graphDayMusique.computeGlobalImportance(Math.max));
console.log(graphDayMusique.computeImportanceMatrix(Math.max));

console.log(graphUsaNames.computeGlobalImportance(Math.max));
console.log(graphUsaNames.computeImportanceMatrix(Math.max));

console.log("fin de programme");