function arrSort (array) { // [2,5,1,3,4]
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            let temp = 0;
            if (array[j] > array[j+1]) {
                temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    return array;
};

let newArray = [12,33,3,44,100];
console.log(arrSort(newArray), '- через функцию');
console.log(newArray.sort((a,b) => a - b), '- через sort');