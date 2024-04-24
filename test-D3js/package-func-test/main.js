/* import * as fs from "fs"; */
import * as util from "./utilitaire.js";
import { Streamgraph } from "./Streamgraph.js";
import { ImportanceHeatMap } from "./heatmap.js";
import * as jeu from "./data.js";

var site = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";
var othersite = "http://localhost:8000/package-func-test/datatest.csv"

//-----------------------------------------------------------
//Testing steamgraph class

console.log("Testing Streamgraph class");

var dataMusic = d3.csvParse(jeu.dayMusique);
var dataUSName = d3.csvParse(jeu.usaNames);

var graphDayMusique = new Streamgraph("#streamgraph1", dataMusic);
var graphUsaNames = new Streamgraph("#streamgraph2", dataUSName);

console.log(graphUsaNames.computeImportanceMatrix(""));

var colors = [
    'rgb(255,0,0)',
    'rgb(255,0,255)',
    'rgb(255,255,0)',
    'rgb(100,100,100)',
    'rgb(0,0,255)',
    'rgb(0,255,0)',
    'rgb(0,255,255)',
    'rgb(200,200,200)'
];

//dayMusique.draw(colors);
//usaNames.draw(colors);

var heatMapMusic = new ImportanceHeatMap("Matrice Importance Musique", graphDayMusique);
var heatMapNames = anychart.heatMap(graphUsaNames.heatMapData());
heatMapNames.container("heatmap2").draw();


heatMapMusic.draw("heatmap1");
/* heatMapNames.draw("heatmap2"); */

console.log("fin de programme");