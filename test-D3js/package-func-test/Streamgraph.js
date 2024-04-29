import * as util from "./utilitaire.js";

export class Streamgraph {

    constructor(divID, data){
        // set the dimensions and margins of the graph
        this.margin = {top: 20, right: 30, bottom: 30, left: 60};
        this.width = 1200 - this.margin.left - this.margin.right;
        this.height = 700 - this.margin.top - this.margin.bottom;

        this.data = (data instanceof String || typeof data === 'string') ? 
          d3.csvParse(data) : 
          data;

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

    computeElementaryImportance(func){
      let keys = util.getKeys(this.data[0]).slice(1);
      let hauteur = this.data;

      /* soit |keys| le nombre de catégories on a donc : 
      |keys|*(|keys|-1) / 2 : nombre de tableaux d'importance élémentaire à remplir 
      chaque tableau est de taille 'f' avec 'f' le nombre total d'instant échantilloné dans le streamgraph*/
      let line = keys.length * (keys.length-1) / 2;
      let column = hauteur.length;

      let impElem = new Map();
      for(let i=0; i<keys.length; i++){
        for(let j=i+1; j<keys.length; j++){
            impElem.set(keys[i]+keys[j], new Float32Array(column).fill(0));
        }
      }

      console.log(impElem);

      for(let t=0; t<hauteur.length; t++){ //pour chaque instant des données
        var categ = 0;
        var voisin = 1;

        while (categ < keys.length && voisin < keys.length){
          //besoin de de contratste ssi la hauteur des deux catégories n'est pas nulle, et les catégories sont différentes
          if      (categ == voisin || hauteur[t][keys[voisin]] == 0){ voisin++;}
          else if (hauteur[t][keys[categ]] == 0)                    { categ++; }

          else{ //sinon, il y a besoin de contraste entre les catégories
            var hcateg  = hauteur[t][keys[categ]];
            var hvoisin = hauteur[t][keys[voisin]];

            console.log("Cat = ",keys[categ],"|vois = ",keys[voisin]);

            impElem.get(keys[categ]+keys[voisin])[t] = func(hcateg, hvoisin);
            categ++; voisin++;
          }

          console.log(impElem);
        }
      }

      return impElem;
    }

    computeGlobalImportance(func){
      let elementaire = this.computeElementaryImportance(func);

      let keys = util.getKeys(this.data[0]).slice(1);
      let importance = util.nullMatrix(keys.length, keys.length, Float32Array);

      for(let categorie=0; categorie<keys.length; categorie++){
        for(let voisin=categorie+1; voisin<keys.length; voisin++){
          importance[categorie][voisin] = Math.max(...elementaire.get(keys[categorie]+keys[voisin]));
          importance[voisin][categorie] = importance[categorie][voisin];
        }
      }
      return importance;
    }

    //---------------------------------------------------------------
    /**
     * GIVEN THE D3 REPRESNETATION OF A STEAMGRAPH
     *  - compute the importance matrix of the streamgraph
     * @returns the importance matrix of a streamgraph
     */
    computeImportanceMatrix(func){

      //TODO : use library to determine which representation is in used and compute the matrix accordingly

      var keys = util.getKeys(this.data[0]).slice(1);
      var hauteur = this.data;
      var importance = util.nullMatrix(keys.length, keys.length, Float32Array);

      for(let t = 0; t < hauteur.length; t++){ //parcours de l'echelle de temps

        var categorie = 0;
        var voisin    = 1;

        while (categorie < importance.length && voisin < importance.length){
          //besoin de de contratste ssi la hauteur des deux catégories n'est pas nulle, et les catégories sont différentes

          if      (categorie == voisin || hauteur[t][keys[voisin]] == 0){ voisin++;    }
          else if (hauteur[t][keys[categorie]] == 0)                    { categorie++; }

          else{ //sinon, il y a besoin de contraste entre les catégories
            var importancePrecedente = importance[categorie][voisin];
            var hauteurCategorie     = hauteur[t][keys[categorie]];
            var hauteurVoisin        = hauteur[t][keys[voisin]];

            importance[categorie][voisin] = func(importancePrecedente, hauteurCategorie, hauteurVoisin);
            
            //matrice symmétrique
            importance[voisin][categorie] = importance[categorie][voisin];
            categorie++; voisin++;
          }
        }
      }

      return importance;
    }

    //---------------------------------------------------------------------
    /**
     * @return the data needed to print the importance matrix as a HeatMap
     */
    heatMapData(func){
      var importance = this.computeImportanceMatrix(func);
      var categories = util.getKeys(this.data[0]).slice(1);

      var dataHeatMap = new Array(importance.length**2);

      for(let i=0; i < importance.length; i++){
        for(let j=0; j < importance.length; j++){
          dataHeatMap[i * importance.length + j] = { 
            x: categories[i], 
            y: categories[j], 
            heat: importance[i][j]
          };
        }
      }

      return dataHeatMap;
    }
}