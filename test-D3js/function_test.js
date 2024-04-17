import * as d3 from "d3";

/**
 * Take matrix of number, compute the max of the sum of each line.
 * @param {*} matrix 
 */ 
export function maxLineSum(matrix){
    let maxSum  = 0;

    let nbLine = matrix.length;

    for(let i = 0; i < nbLine; i++){
        let sum = matrix[i].reduce((acc, current) => acc + current, 0); 
        maxSum = (maxSum < sum) ? sum : maxSum;
    }

    return maxSum
}


export function getKeys(obj){
    let array = [];
    for(const key in obj){
        array.push(key);
    }
    return array;
}

export function rangeKeyValue(objArray, parser, keyToIgnore){
    let maxSum  = 0;

    let nbLine = objArray.length;
    let keys = getKeys(objArray[0]).slice(keyToIgnore);

    for(let i = 0; i < nbLine; i++){
        let sum = 0;
        keys.forEach(function(current) { sum += parser(objArray[i][current]); });
        maxSum = (maxSum < sum) ? sum : maxSum;
    }

    return maxSum
}

let matrix = [
    [1,1,1],
    [1,2,3],
    [1,2,1],
];

let objArray = [
    {truc:"3", machin:"3", chose:"4"},
    {truc:"3", machin:"1", chose:"1"},
    {truc:"5", machin:"2", chose:"2"},
    {truc:"3", machin:"2", chose:"2"},
    {truc:"4", machin:"2", chose:"2"}
];

console.log(maxLineSum(matrix));
console.log(rangeKeyValue(objArray, parseInt, 1));


/* export function maxLineSumObject(objArray){
    let maxSum = 0;

    for(let i = 0; i < objArray.length; i++){
        let sum = objArray[i].reduce((acc, current) => acc+current, 0);
        maxSum = (maxSum < sum) ? sum : maxSum;
    }
    return maxSum;
}
 */


//------------------------------------------------------------------------------

var site = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv";

function logger(data){
    console.log(data);
}

//let data = await d3.csv(site, logger);
//console.log(data);

let width = d3.extent(objArray, function(o){return o.truc; });
let maxWidth = Math.max(...width);

console.log(width);
console.log(maxWidth);


console.log("fin de programme");