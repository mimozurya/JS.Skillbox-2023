function filter(whiteList, blackList) {
    return whiteList.filter(email => !blackList.includes(email));
}

let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
let blackList = ['jsfunc@mail.ru','goodday@day.ru'];

console.log(filter(whiteList, blackList));
