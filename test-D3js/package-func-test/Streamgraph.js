import { getKeys } from "./test-sum-object.js";

export class Steamgraph {

    constructor(divID, data){
        // set the dimensions and margins of the graph
        this.margin = {top: 20, right: 30, bottom: 30, left: 60};
        this.width = 1200 - this.margin.left - this.margin.right;
        this.height = 700 - this.margin.top - this.margin.bottom;

        this.data = data;

        this.svg = this.initSVG(divID);
        this.divID = divID;
    }

    //-------------------------------------------------------------------
    /**
     * Initialize the string containing an svg object informations
     * @param {*} divID the div in the html page
     */
    initSVG(divID) {
        //TODO : implement a function that uses a css container to init the svg object ?    
    
        // append the svg object to the body of the page
        return d3.select(divID)
        .append("svg")
          .attr("width", this.width + this.margin.left + this.margin.right)
          .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
          .attr("transform",
              "translate(" + this.margin.left + "," + this.margin.top + ")");
    }

    //-------------------------------------------------------------------
    /**
     * Create the x axis to append to an svg object 
     * @param {*} scaleX 
     * @returns 
     */
    createAxeX(scaleX){
        return d3.scaleLinear()
          .domain(d3.extent(this.data, function(d) { return d[scaleX]; }))
          .range([ 0, this.width ]);
    }

    //-------------------------------------------------------------------
    /**
     * Create the y axis to append to the svg object
     * @param {*} categorieKey 
     * @returns 
     */
    createAxeY(categorieKey){
        let Ywidth = d3.extent(this.data, function(d) {
          let sum = 0;
          categorieKey.forEach(function(current){ sum += parseInt(d[current]); });
          return sum; 
        });
        
        let maxWidth = Math.max(...Ywidth);
        let rangeY = [-(maxWidth/2), (maxWidth/2)];
      
        return d3.scaleLinear()
          .domain(rangeY)
          .range([ this.height, 0 ]);
    }

    //-------------------------------------------------------------------
    /**
     * Draw the graph according to its data and a given set of color
     * @param {*} colors
     */
    draw(colors) {

      // List of groups = header of the csv files
      var keys = this.data.columns.slice(1);
      var Xscale = (this.data.columns)[0]; //scale of the x axe
    
      // Add X axis
      var x = this.createAxeX(Xscale);
      this.svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x).ticks(5));
    
      // Add Y axis
      var y = this.createAxeY(keys);
      this.svg.append("g")
        .call(d3.axisLeft(y));
    
      // color palette
      var color = d3.scaleOrdinal()
        .domain(keys)
        .range(colors);
    
      //stack the data?
      var stackedData = d3.stack()
        .offset(d3.stackOffsetSilhouette)
        .keys(keys)
        (this.data);
    
      // Show the areas
      this.svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
          .style("fill", function(d) { return color(d.key); })
          .attr("d", d3.area()
            .x(function(d, i) { return x(d.data[Xscale]); })
            .y0(function(d) { return y(d[0]); })
            .y1(function(d) { return y(d[1]); })
          );
    }

    //---------------------------------------------------------------
    computeImportanceMatrix(){
      var keys = getKeys(this.data[0]).slice(1);
      var H = this.data;

      var importance = new Array(keys.length);
      for(let i = 0; i < importance.length; i++){ importance[i] = new Array(keys.length); }

      for(let t = 0; t < H.length; t++){ //parcours de l'echelle de temps

        var idxCategorie = 0;
        var idxVoisin    = 1;

        while (idxCategorie < importance.length && idxVoisin < importance.length){

          if(idxCategorie == idxVoisin){ //importance symétrique, on ne la calcule que pour un couple categorie, voisin

            importance[idxCategorie][idxVoisin] = 0;
            idxVoisin++; 

          }else if(H[t][keys[idxCategorie]] == 0){ //la catégorie est à zéro, pas de besoin de contraste

            importance[idxCategorie][idxVoisin] = 0;
            idxCategorie++;

          }else if(H[t][keys[idxVoisin]] == 0){ //le voisin est à zero, on cherche le voisin suivant

            importance[idxCategorie][idxVoisin] = 0;
            idxVoisin++;
          
          }else{ //sinon, il y a besoin de contraste entre les catégories

            var importancePrecedente = (isNaN(importance[idxCategorie][idxVoisin])) ? -1 : importance[idxCategorie][idxVoisin];
            var hauteurCategorie = H[t][keys[idxCategorie]];
            var hauteurVoisin    = H[t][keys[idxVoisin]];

            importance[idxCategorie][idxVoisin] = Math.max(importancePrecedente, 1/hauteurCategorie, 1/hauteurVoisin);
            idxCategorie++; idxVoisin++;
          }
          
        }
      }

      //matrice symétrique
      for(var ligne = 0; ligne < importance.length; ligne++){
        for(var colonne = 0; colonne <= ligne; colonne++){
          if(ligne == colonne){
            importance[ligne][colonne] = 0;
          }else{
            importance[ligne][colonne] = importance[colonne][ligne];
          }
        }
      }

      return importance;
    }
}