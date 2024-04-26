import {Streamgraph} from "./Streamgraph.js";

export class ImportanceHeatMap{
    
    /**
     * Constructor
     * @param {*} graph the data vizualisation from which we get the importance matrix
     * @param {function} func the function over which the importance will be computed
     * @param {*} title 
     * @param {*} container an html container to display on the page
     */
    constructor(graph, func, title, container){

        this.data = graph.heatMapData(func);

        this.heatmap = anychart.heatMap(this.data);
        this.heatmap.container(container);
        this.heatmap.title("Matrice d'Importance des besoins de contraste \n"+title);
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
        const colors = d3.schemeReds[9].slice();

        this.setColorScale(colors);
        this.heatmap.draw();
    }
}