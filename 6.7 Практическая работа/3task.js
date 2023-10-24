function filter (objects, keys, value) {
    let newObjects = [];
    for (let i = 0; i < objects.length; i++) {
        for (let j = 0; j < Object.keys(objects).length; j++) {
            if ((Object.keys(objects[i])[j] === keys) && (Object.values(objects[i])[j] === value)) {
                newObjects.push(objects[i]);
            }
        }
    }
    return newObjects;
}

let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
];

let result = filter(objects, 'name', 'Иван');
console.log(result);

// [
//     { name: 'Иван', surname: 'Иванов' }
// ]