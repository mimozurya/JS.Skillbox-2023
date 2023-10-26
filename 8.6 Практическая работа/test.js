let array = [];

function idForElement () {
    return array[array.length - 1].id + 1;
}

let todoElement1 = {
    id: 1,
    name: 'ибрагим',
    done: false,
};

let todoElement2 = {
    id: 2,
    name: 'жека',
    done: false,
};

array.push(todoElement1, todoElement2);
console.log(array[1].id);

let todoElement3 = {
    id: idForElement (),
    name: 'еблан',
    done: false,
};
array.push(todoElement3);

console.log(array);


