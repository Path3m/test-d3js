/* import * as fs from "fs"; */
import * as util from "./utilitaire.js";
import { Streamgraph } from "./Streamgraph.js";
import { ImportanceHeatMap } from "./heatmap.js";
import * as jeu from "./data.js";

var site = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";
var othersite = "http://localhost:8000/package-func-test/datatest.csv"

//-----------------------------------------------------------
//Testing steamgraph class

console.log("Testing");

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

var graphDayMusique = new Streamgraph("#streamgraph1", jeu.dayMusique);
var graphUsaNames = new Streamgraph("#streamgraph2", jeu.usaNames);

graphDayMusique.draw(colors);
graphUsaNames.draw(colors);

console.log(graphUsaNames.computeImportanceMatrix(""));

var heatMapMusic = new ImportanceHeatMap(graphDayMusique, "Matrice Importance Musique", "heatmap1");
heatMapMusic.draw();

var heatMapNames = new ImportanceHeatMap(graphUsaNames, "Matrice Importance Noms", "heatmap2");
heatMapNames.draw();

console.log("fin de programme");