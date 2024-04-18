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