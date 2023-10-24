function getOlderUserArray (allUsers) {
    let indexAge = -1; // с ним сравнивать
    let indexName = ''; // сюда будем записывать имя
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].age > indexAge) {
            indexAge = allUsers[i].age;
            indexName = allUsers[i].name;
        }
    }
    return indexName;
};

let allUsers=[
    {name: 'Валя', age: 11},
    { name: 'Таня',age: 24},
    {name: 'Рома',age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
]

console.log(getOlderUserArray(allUsers))