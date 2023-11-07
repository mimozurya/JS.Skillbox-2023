// добавление нового элемента, остальные методы (get, put, patch, delete) работаю по такой же логике

// fetch("http://localhost:3000/todos", {
//   method: "post",
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   //make sure to serialize your JSON body
//   body: JSON.stringify({
//     id: '5',
//     text: 'do',
//     completed: true,
//     meta: {
//         author: 'dssad',
//         createdAt: 'today'
//     }
//   })
// })

// поиск сравнивает, чтобы хоть какое-то поле равнялось значению q
// fetch("http://localhost:3000/todos?q=do").then(res => res.json()).then(console.log)


// поиск по конкретному полю
//  fetch("http://localhost:3000/todos?text=Sleep").then(res => res.json()).then(console.log)

// сортировка по конкретному полю конкретным порядокм
// fetch("http://localhost:3000/todos?_sort=id&_order=desc").then(res => res.json()).then(console.log)

// поиск по id
// fetch("http://localhost:3000/todos/2").then(res => res.json()).then(console.log)
