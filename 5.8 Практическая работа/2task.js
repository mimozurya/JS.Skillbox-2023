function filter(whiteList, blackList) {
    let newList = [];
    for (let i = 0; i < whiteList.length; i++) {
        if (blackList.includes(whiteList[i])) continue;
        else newList.push(whiteList[i]);
    }
    return newList;
}

let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
let blackList = ['jsfunc@mail.ru','goodday@day.ru'];

// let whiteList = ['nikita', 'roma', 'egor', 'arthur', 'andrey', 'mat'];
// let blackList = ['egor', 'roma'];

console.log(filter(whiteList, blackList));
