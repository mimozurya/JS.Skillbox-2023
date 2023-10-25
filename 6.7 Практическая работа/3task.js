function filter (objects, key, value) {
    let filterArray = [];
    for (let humanIndex in objects) {
        if (objects[humanIndex][key] === value) {
            filterArray.push(objects[humanIndex]);
        }
    }
    return filterArray;
}

let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
];

let result = filter(objects, 'name', 'Иван')
console.log(filter(result));


// [
//     { name: 'Иван', surname: 'Иванов' }
// ]