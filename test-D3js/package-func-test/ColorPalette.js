import * as util from "./utilitaire.js";

//NB : to use in accordance with a factory class ?

export class ColorPalette{

    /**
     * 
     * @param {*} colorInterpolate 
     */
    constructor(colorInterpolate){
        this.paletteBuilder = colorInterpolate;

        this.palette = this.colorPalette(
            100, 
            {min: 0.1, max: 0.9},   
            this.paletteBuilder
        );
    }

    /**
     * 
     * @param {*} count 
     * @param {*} range 
     * @param {*} colorInterpol 
     * @returns an array of colors from an continuous color scale
     */
    colorPalette(count, range, colorInterpol){
        const colors = new Array(count);
        for(let i=0; i<count; i++) colors[i] = colorInterpol((i/count)*(range.max-range.min)+range.min);
        return colors;
    }

    /**
     * 
     * @param {*} count 
     * @returns an array of color got randomly from the palette
     */
    colorRange(count){
        if(count > this.palette.length) throw new Error("More color asked than there is on the palette.");

        let colors = new Array(count);
        let index = new Array(count);

        for(let i=0;i<count;i++) index[i] = i * Math.floor(this.palette.length / count);
        util.inplaceShuffle(index);

        for(let i = 0; i < count; i++){
            colors[i] = this.palette[index[i]];
        }

        return colors;
    }

    /**
     * Draw the color palette using anychart heatmaps features
     * @param {*} title 
     * @param {*} container 
     */
    draw(container, colors, categories){
        let size = util.closestProduct(colors.length);
        let line = size[0]; let column = size[1];

        let data = new Array(line * column);
        let colorRange = new Array(line * column);

        for(let i=0;i<line;i++){ 
            for(let j=0;j<column;j++){
                let k = i*column+j;
                let categorie = (categories[k] == undefined) ? k : categories[k];

                data[k] = { x:""+j, y:""+i, heat:""+k, custom_field:  categorie};
                colorRange[k] = { from: data[k].heat, to: data[k].heat};
            }
        }

        let heatmap = anychart.heatMap(data)
                .container(container)
                .title(container)
            .colorScale( anychart.scales.ordinalColor()
                .ranges(colorRange)
                .colors(colors)
            );

        heatmap.tooltip().format("{%custom_field}");
        heatmap.draw();
    }

    computeDistanceMatrix(rangeOfColor){
        let distance = util.nullMatrix(rangeOfColor.length, rangeOfColor.length, Float32Array);


    }
}