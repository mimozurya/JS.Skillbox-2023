let a = 13.890123;
let b = 2.891564;
let n = 2;

aPart = Math.floor(a%1 * Math.pow(10, n));
bPart = Math.floor(b%1 * Math.pow(10, n));
console.log('Дробные части =', aPart, bPart);
console.log('Знак \'>\' -', aPart > bPart);
console.log('Знак \'<\' -', aPart < bPart);
console.log('Знак \'>=\' -', aPart >= bPart);
console.log('Знак \'<=\' -', aPart <= bPart);
console.log('Знак \'===\' -', aPart === bPart);
console.log('Знак \'!==\' -', aPart !== bPart);