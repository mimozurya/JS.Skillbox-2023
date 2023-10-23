function getAge(year) {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    return currentYear-year;
}

console.log(getAge(1998));
console.log(getAge(1991));
console.log(getAge(2007));