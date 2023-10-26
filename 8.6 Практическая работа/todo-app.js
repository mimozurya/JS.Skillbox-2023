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

    function createTodoItem (element) { // создание блока задачи
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = element.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    function createTodoApp (container, title = 'Список дел') {
        let todoAppTitle = createAppTitle(title); // заголовок
        let todoItemForm = createTodoItemForm(); // форма заполнения
        let todoList = createTodoList(); // создание листа задач
        let todoArray = []; 

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        createTodoApp.todoArray = todoArray;

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

            function idForElement () {
                if (todoArray.length === 0) {
                    return 1;
                }
                else {
                    return todoArray[todoArray.length - 1].id + 1;
                }
            };

            let todoElement = {
                id: idForElement(),
                name: todoItemForm.input.value,
                done: false,
            };
            let todoItem = createTodoItem(todoElement); // создание li
            todoArray.push(todoElement);

            todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
                if (todoItem.item.classList.contains('list-group-item-success')) {
                    todoElement.done = true;
                } else {
                    todoElement.done = false;
                }
            }); // по клику на "Готово" меняется класс

            todoItem.deleteButton.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    let index = todoArray.findIndex((elem) => elem.id === todoElement.id);
                    todoArray.splice(index, 1);
                    todoItem.item.remove();
                }
            }); // по клику спрашивают и удаляют

            todoList.append(todoItem.item); // добавление li в общий список
            todoItemForm.input.value = ''; // изменение в изначальное положение
            todoItemForm.button.setAttribute('disabled', 'disabled'); // изменение кнопки в изначальное положение
        }) 
    }

    window.createTodoApp = createTodoApp; // ???
})();