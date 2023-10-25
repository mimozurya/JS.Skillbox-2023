function getOlderUserArray (allUsers) {
    let sortedByAge = [];
    for (let i = 0; i < allUsers.length; i++) {
        sortedByAge.push(allUsers[i].age);
    }
    sortedByAge.sort((a,b) => b-a);
    let oldestUser = allUsers.find(user => user.age === sortedByAge[0]);
    return oldestUser.name;
};

let allUsers=[
    {name: 'Валя', age: 11},
    {name: 'Таня',age: 24},
    {name: 'Рома',age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
];

console.log(getOlderUserArray(allUsers));