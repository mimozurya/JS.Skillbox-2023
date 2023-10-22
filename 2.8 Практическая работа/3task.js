let n = -3;
let m = -10;

range = Math.abs(n-m);
randomNumber1 = Math.round(Math.random() * range) + Math.min(n,m);
randomNumber2 = Math.round(Math.random() * range) + Math.min(n,m);

console.log('Рандомные числа -', randomNumber1, randomNumber2)
console.log('Знак \'>\' -', randomNumber1 > randomNumber2);
console.log('Знак \'<\' -', randomNumber1 < randomNumber2);
console.log('Знак \'>=\' -', randomNumber1 >= randomNumber2);
console.log('Знак \'<=\' -', randomNumber1 <= randomNumber2);
console.log('Знак \'===\' -', randomNumber1 === randomNumber2);
console.log('Знак \'!==\' -', randomNumber1 !== randomNumber2);