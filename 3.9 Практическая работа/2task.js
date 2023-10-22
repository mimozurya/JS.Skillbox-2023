let userName = 'игНаТ';
let userSurname = 'боРодуЛЬка';

let newUserName = userName.substring(0,1).toUpperCase() + userName.substring(1).toLowerCase();
let newUserSurname = userSurname.substring(0,1).toUpperCase() + userSurname.substring(1).toLowerCase();

console.log (newUserName, newUserSurname);

console.log(userName === newUserName || userSurname === newUserSurname ? 'Имя осталось без изменений' : 'Имя было преобразовано');