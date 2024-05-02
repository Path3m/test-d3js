/**
 * Helper to compute the inverse of a number
 * @param {*} x 
 * @returns 0 if x = 0, else 1/x
 */
function inverse(x){ return (x === 0)? 0 : 1/x; }

/**
 * Compute the inverse of each number in the array and return the maximum
 * @param {*} array 
 * @returns the maximum of the array's inversed number
 */
function maxInverse(array) {
    return array.reduce((acc, current) => { 
        return Math.max(inverse(current), acc);
    }, inverse(array[0]));
}

//Helper function to compute local importance
function localMaxInverse(h1,h2){ return maxInverse([h1,h2]); }
function localAverage(h1,h2){ return (h1+h2)/2; }
function localAvgInverse(h1,h2){return (inverse(h1)+inverse(h2))/2; }

/**
 * Compute the importance by getting the maximum of the inverse
 */
export const impMaxInverse = [
    function(array){ return Math.max(...array);},
    localMaxInverse
];

/**
 * Compute the importance by getting the average value of the local importance
 * Local importance takes the max of the heights inverse
 */
export const impAverage = [
    function(array){
        return (array.reduce((acc,current) => { return acc + current; })) / array.length; 
    },
    localMaxInverse
];



export function accInverse(acc,y,z){ return Math.max(acc, 1/y, 1/z); }
export function sumInverse(acc,y,z){ return acc + 1/y + 1/z; }