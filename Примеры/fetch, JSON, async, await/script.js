fetch('https://gorest.co.in/public/v2/users');

fetch('https://gorest.co.in/public/v2/users', { // создание
    method: 'POST',
    body: JSON.stringify ({
        "email": "ilovegod@gmail.com",
        "gender": "male",
        "name": "Caesar",
        "status": "active",
    }),
    headers: {
        Authorization: "Bearer 7e60dac7c098b3c391ff073e174e71868552323485b0a5692c18313323bac913",
        'Content-Type': 'application/json'
    }
});


fetch('https://gorest.co.in/public/v2/users/5674477', { // поиск по id
    method: 'GET',
})


fetch('https://gorest.co.in/public/v2/users/5674477', { // изменение данных пользователя
    method: 'PATCH',
    body: JSON.stringify ({
        "email": "noname@piska.com",
    }),
    headers: {
        Authorization: "Bearer 7e60dac7c098b3c391ff073e174e71868552323485b0a5692c18313323bac913",
        'Content-Type': 'application/json'
    }
})


fetch('https://gorest.co.in/public/v2/users/5674480', { // удаление по id
    method: 'DELETE',
    headers: {
        Authorization: "Bearer 7e60dac7c098b3c391ff073e174e71868552323485b0a5692c18313323bac913",
        'Content-Type': 'application/json'
    }
})


async function loadUsers () { // добавление в массив
    const responce = await fetch ('https://gorest.co.in/public/v2/users');
    const data = await responce.json();
    console.log(data);
}
loadUsers();