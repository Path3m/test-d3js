import {Streamgraph} from "./Streamgraph.js";

export class ImportanceHeatMap{
    
    constructor(title, graph){
        this.title = title;
        this.data = graph.heatMapData();

        console.log(this.data);
    }

    draw(container){
        var heatmap = anychart.heatMap(this.data);
        heatmap.container(container);
        heatmap.title(this.title);

        let colorScale = anychart.scales.ordinalColor();
        colorScale.ranges([
          { less: 500, color: "#B0D8A4" },
          { from: 500, to: 900, color: "#FEE191" },
          { from: 900, to: 1300, color: "#FD8060" },
          { greater: 1300, color: "#CC333F" }
        ]);
        heatmap.colorScale(colorScale);

        heatmap.hovered().fill(function () {
            return anychart.color.darken(this.sourceColor, 0.25);
        });

        heatmap.draw();
    }
}