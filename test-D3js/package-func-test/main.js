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

let palette = ColorPalette.largeGraphPalette(d3.interpolateCool);
palette.draw("color-palette", []);

// MUSIC DRAW ------------------------------------------------------------
var graphDayMusique = new Streamgraph("#streamgraph1", jeu.dmFilterAlternative);
var cm = palette.paletteSample(graphDayMusique.getCategories().length);
util.inplaceShuffle(cm.colors);

cm.draw("color-music", graphDayMusique.getCategories());
graphDayMusique.draw(cm.colors);

let hmMusic1 = HeatMap.importanceHeatMap("heatmapMusic-1", graphDayMusique, method.impMaxInverse);
let hmMusic2 = HeatMap.importanceHeatMap("heatmapMusic-2", graphDayMusique, method.impAverage);
hmMusic1.draw();
hmMusic2.draw();

// US NAMES DRAW ---------------------------------------------------------
var graphUsaNames = new Streamgraph("#streamgraph2", jeu.usaNames);
var cn = palette.paletteSample(graphUsaNames.getCategories().length);
util.inplaceShuffle(cn.colors);

cn.draw("color-names", graphUsaNames.getCategories());
graphUsaNames.draw(cn.colors);

let hmNames1 = HeatMap.importanceHeatMap("heatmapNames-1", graphUsaNames, method.impMaxInverse);
let hmNames2 = HeatMap.importanceHeatMap("heatmapNames-2", graphUsaNames, method.impAverage);
hmNames1.draw();
hmNames2.draw();

//-----------------------------------------------------------------------
console.log("fin de programme");