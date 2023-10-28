(function () {

    function createAppTitle(title) { // заголовок: "мои дела", "дела папы", "дела мамы"
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() { // форма
        let form = document.createElement('form'); // оболочка всего
        let input = document.createElement('input'); // поле для ввода
        let buttonWrapper = document.createElement('div'); // контейнер кнопки
        let button = document.createElement('button'); // кнопка

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.setAttribute('disabled', 'disabled');

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList () { // создание листа задач
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem (todoElement, todoArray, keyLocalStorage) { // создание блока задачи
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = todoElement.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        if (todoElement.done) { // если true у done
            item.classList.add('list-group-item-success');
        }

        doneButton.addEventListener('click', function() {
            item.classList.toggle('list-group-item-success')
            if (item.classList.contains('list-group-item-success')) {
                todoElement.done = true;
            } else {
                todoElement.done = false;
            }
            saveDataToLocalStorage(keyLocalStorage, todoArray);
        });

        deleteButton.addEventListener('click', function () {
            if (confirm('Вы уверены?')) {
                let index = todoArray.findIndex((elem) => elem.id === todoElement.id);
                todoArray.splice(index, 1);
                item.remove();
                saveDataToLocalStorage(keyLocalStorage, todoArray)
            }
        });

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    function createTodoApp (container, title = 'Список дел', listName) {
        let todoArray = getDataFromLocalStorage(listName) || [];
        let todoAppTitle = createAppTitle(title); // заголовок
        let todoItemForm = createTodoItemForm(); // форма заполнения
        let todoList = createTodoList(); // создание листа задач
        createTodoApp.todoArray = todoArray;

        if (todoArray.length > 0) { // добавление элементов из LocalStorage
            todoArray.forEach((item) => {
                let todoItem = createTodoItem(item, todoArray, listName);
                todoList.append(todoItem.item);
            });
        }

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        function idForElement () { // генератор id
            if (todoArray.length === 0) return 1;
            else return todoArray[todoArray.length - 1].id + 1;
        };

        todoItemForm.form.addEventListener("input", function() { // манипуляции с кнопкой
            if (!todoItemForm.input.value) {
                todoItemForm.button.setAttribute('disabled', 'disabled');
            } else {
                todoItemForm.button.removeAttribute('disabled');
            };
        });

        todoItemForm.form.addEventListener('submit', function(e) { // обработчик события
            e.preventDefault();

            if (!todoItemForm.input.value) { // если ничего не написал
                return;
            }

            let todoElement = {
                id: idForElement(),
                name: todoItemForm.input.value,
                done: false,
            };

            todoArray.push(todoElement);
            let todoItem = createTodoItem(todoElement, todoArray, listName); // создание li
            saveDataToLocalStorage(listName, todoArray);

            todoList.append(todoItem.item); // добавление li в общий список
            todoItemForm.input.value = ''; // изменение в изначальное положение
            todoItemForm.button.setAttribute('disabled', 'disabled'); // изменение кнопки в изначальное положение
        }) 
    }

    function dataToJson(data) { // вернет входящиее данные в виде строки
        return JSON.stringify(data);
    };

    function jsonToData(data) { // вернет входящую строку в виде данных
        return JSON.parse(data);
    };

    function getData (listName) { // вернет данные из LocalStorage
        return localStorage.getItem(listName);
    };

    function setData (listName, data) { // запишет данные в LocalStorage
        return localStorage.setItem(listName, data);
    };

    function saveDataToLocalStorage (key, data) {
        const jsonData = dataToJson(data);
        setData(key, jsonData);
    }

    function getDataFromLocalStorage(key) {
        function getCartData () {
            let cartData = localStorage.getItem(key);
            return cartData;
        }
        let result = getCartData();
        return jsonToData(result);
    }

    window.createTodoApp = createTodoApp; // ???
})();