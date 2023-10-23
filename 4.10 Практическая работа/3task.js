let count = 7;
let array = [];

for (let i = 0; i < count; ++i) {
    array.push(i+1)
}
console.log('Изначальный массив -', array);

for (let i = 0; i < array.length; i++) {
    let temp = 0;
    let randomPlace = Math.floor(Math.random() * array.length);
    temp = array[i];
    array[i] = array[randomPlace];
    array[randomPlace] = temp;
}
console.log('Перемешанный массив', array);

// новое задание

let n = 1;

for (let i = 0; i < array.length; i++) {
    if (array[i] === n) {
        console.log('индекс элемента =', i);
        break;
    } else continue;
}