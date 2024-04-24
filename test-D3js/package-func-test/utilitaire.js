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

/**
 * @param {*} obj 
 * @returns an array containing the keys of the object
 */
export function getKeys(obj){
    let array = [];
    for(const key in obj){
        array.push(key);
    }
    return array;
}

/**
 * Compute the max range of the sum of the key value if the 
 * key all have the same data type
 * @param {*} objArray 
 * @param {*} parser to convert key data to number 
 * @param {*} keyToIgnore 
 * @returns 
 */
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

/**
 * Print a mtrix line by line in the console
 * @param {*} matrix 
 */
export function matrixLog(matrix){
    for(let i = 0; i < matrix.length; i++){
        var str = "[";

        for(let j = 0; j < matrix.length; j++){
            str += matrix[i][j]+", ";
        }

        str = str.slice(0, -2) + "]"
        console.log(str);
    }
}

/**
 * From a given matrix, fill half of the matrix given 
 * an axis of symmetry.
 * @param {Array<Array<any>>} matrix 
 * @param {string} axe the vector indicating the half of the matrix that needs to be copied
 * @param {number} axeValue the value on the diagonal
 */
export function symetryMatrix(matrix, axe, axeValue){

    //TODO : use axe to determine which part of the matrix needs to be filled

    for(var ligne = 0; ligne < matrix.length; ligne++){
        for(var colonne = 0; colonne <= ligne; colonne++){
          matrix[ligne][colonne] = (ligne == colonne) ? 
            axeValue : 
            matrix[colonne][ligne];
        }
    }
    
    return matrix;
}

/**
 * Allocate a matrix of number of size (n x m)  filled with 0
 * @param {number} n 
 * @param {number} m 
 * @param {ArrayConstructor} ArrayNumber
 * @returns a matrix filled with 0
 */
export function nullMatrix(n, m, ArrayNumber){
    var matrix = new Array(n);
    for(let i=0; i < n; i++){ matrix[i] = (new ArrayNumber(m)).fill(0); }
    return matrix;
}