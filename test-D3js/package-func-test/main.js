/* import * as fs from "fs"; */
/* import * as d3 from "d3"; */

import * as util from "./utilitaire.js";
import * as method from "./computationMethod.js";
import * as jeu from "./data.js";

import { Streamgraph } from "./Streamgraph.js";
import { HeatMap } from "./HeatMap.js";
import { ColorPalette } from "./ColorPalette.js";


var site = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";
var othersite = "http://localhost:8000/package-func-test/datatest.csv"

//-----------------------------------------------------------
//Testing steamgraph class

console.log("Testing");

let palette = new ColorPalette(d3.interpolateMagma);
ColorPalette.draw("color-palette", palette.palette, []);

// MUSIC DRAW ------------------------------------------------------------
var graphDayMusique = new Streamgraph("#streamgraph1", jeu.dmFilterAlternative);
var cm = palette.colorRange(graphDayMusique.data.columns.length - 1);

ColorPalette.draw("color-music", cm, graphDayMusique.data.columns.slice(1));
graphDayMusique.draw(cm);

let hmMusic1 = HeatMap.importanceHeatMap("heatmapMusic-1", graphDayMusique, method.impMaxInverse);
let hmMusic2 = HeatMap.importanceHeatMap("heatmapMusic-2", graphDayMusique, method.impAverage);
hmMusic1.draw();
hmMusic2.draw();

// US NAMES DRAW ---------------------------------------------------------
var graphUsaNames = new Streamgraph("#streamgraph2", jeu.usaNames);
var cn = palette.colorRange(graphUsaNames.data.columns.length - 1);

ColorPalette.draw("color-names", cn, graphUsaNames.data.columns.slice(1));
graphUsaNames.draw(cn);

let hmNames1 = HeatMap.importanceHeatMap("heatmapNames-1", graphUsaNames, method.impMaxInverse);
let hmNames2 = HeatMap.importanceHeatMap("heatmapNames-2", graphUsaNames, method.impAverage);
hmNames1.draw();
hmNames2.draw();

//-----------------------------------------------------------------------
let hmColor = HeatMap.colorDistanceHeatMap("color-dist", cn);
hmColor.draw();

console.log("fin de programme");