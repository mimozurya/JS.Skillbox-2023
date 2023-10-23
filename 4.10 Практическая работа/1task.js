let n = 100;
let m = -5;
let count = 70;
let array = [];

while (count > 0) {
    let randomNumber = Math.round(Math.random() * Math.abs(n-m)) + Math.min(n,m);
    array.push(randomNumber);
    count--;
}

console.log(array);