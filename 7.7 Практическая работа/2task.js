let body = document.querySelector('body');

function createStudentCard (student) {
    let div = document.createElement('div');
    body.append(div);

    let h2 = document.createElement('h2');
    h2.textContent = student.name;
    div.append(h2);

    let span = document.createElement('span');
    span.textContent = student.age;
    div.append(span);   
}

let studentObj={
    name: 'Игорь',
    age: 17
}
createStudentCard(studentObj)