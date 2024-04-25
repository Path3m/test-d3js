import {Streamgraph} from "./Streamgraph.js";

export class ImportanceHeatMap{
    
    /**
     * Constructor
     * @param {*} graph the data vizualisation from which we get the importance matrix
     * @param {*} title 
     * @param {*} container an html container to display on the page
     */
    constructor(graph, title, container){
        this.data = graph.heatMapData();

        this.heatmap = anychart.heatMap(this.data);
        this.heatmap.container(container);
        this.heatmap.title(title);

        console.log(this.data);
    }

    /**
     * Compute the range of values of the data heat
     * @returns the min and max values for the heatmap
     */
    getRangeValue(){
        var max = this.data[0].heat, 
            min = this.data[0].heat;

        this.data.forEach( current => { 
            max = (current.heat > max) ? current.heat : max;
            min = (current.heat < min) ? current.heat : min;
        });

        return {min: min, max: max};
    }

    /**
     * @param {*} colors the range of color of the heatmap
     */
    setColorScale(colors){
        var range = this.getRangeValue();

        var colorScale = anychart.scales.linearColor();
        colorScale.colors(colors);
        colorScale.minimum(range.min);
        colorScale.maximum(range.max);

        this.heatmap.colorScale(colorScale);
    }

    /**
     * Draw the heatmap
     */
    draw(){
        let colors = [
            "rgb(250, 250, 250)", //white
            "rgb(0, 255, 255)",   //cyan
            "rgb(255, 255, 0)",   //yellow
            "rgb(255, 165, 250)", //orange
            "rgb(255, 0, 0)"      //red
        ];

        this.setColorScale(colors);
        this.heatmap.draw();
    }
}