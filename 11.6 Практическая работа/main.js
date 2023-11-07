(() => {
    const studentsList = [];

    async function getStudentsFromDB () { // получение студентов из бд
        const responce = await fetch ("http://localhost:3000/students");
        const studentsListDB = await responce.json();

        studentsListDB.forEach(student => {
            getStudentItem(student);
            studentsList.push(student);
        });
        renderStudentsTable(studentsList);
    }

    function getStudentItem(studentObj) { // создание строки студента
        let tr = document.createElement('tr');
        let thFullName = document.createElement('th');
        let thFaculty = document.createElement('th');
        let thDate = document.createElement('th');
        let thYearStudy = document.createElement('th');
        let thDeleteStudent = document.createElement('button');

        tr.classList.add('list');
        thFullName.classList.add('list-item-fullname');
        thFaculty.classList.add('list-item-faculty');
        thDate.classList.add('list-item-date');
        thYearStudy.classList.add('list-item-yearStudy');
        thDeleteStudent.classList.add('delete-student');

        thFullName.textContent = [studentObj.surname, studentObj.name, studentObj.middleName].join(' ');
        thFaculty.textContent = studentObj.faculty;
        thDate.textContent = studentObj.date + ' (' + (new Date().getFullYear() - parseInt(studentObj.date.split('.')[2])) + ')';
        if (new Date().getFullYear() - parseInt(studentObj.yearStudy) < 4) {
            thYearStudy.textContent = `${studentObj.yearStudy} (${new Date().getFullYear() - parseInt(studentObj.yearStudy) + 1} курс) `;
        } else {
            thYearStudy.textContent = 'закончил';
        }
        thDeleteStudent.textContent = 'Удалить';
        tr.append(thFullName, thFaculty, thDate, thYearStudy, thDeleteStudent);

        return tr;
    }

    function deleteStudent() { // удаление студента
        let deleteButtons = document.querySelectorAll(".delete-student");
        for (let deleteButton of deleteButtons) {
            deleteButton.addEventListener('click', function () {
                let studentItem = this.parentNode;
                let studentFullName = studentItem.querySelector('.list-item-fullname').textContent;
                let studentIndex = findStudentIndexInArray(studentFullName);
                if (studentIndex !== -1) {
                    deleteStudentFromDB(studentsList[studentIndex].id);
                    studentsList.splice(studentIndex, 1); // удаление студента из массива
                    studentItem.remove(); // удаление строки студента из таблицы
            }
            });
        }
    }

    function findStudentIndexInArray(fullName) { // поиск студента по индексу в массиве
        for (let i = 0; i < studentsList.length; i++) {
            let studentFullName = [studentsList[i].surname, studentsList[i].name, studentsList[i].middleName].join(' ');
            if (studentFullName === fullName) {
                return i;
            }
        }
        return -1;
    }

    function renderStudentsTable(studentsArray) {
        let table = document.querySelector('.table');
        table.innerHTML = '';
        for (let student of studentsArray) {
            table.append(getStudentItem(student));
        }
        sortStudents ();
        filterStudent ();
        deleteStudent ();
    }

    function sortStudents () { // сортировка на кнопки
        let sortByFullName = document.getElementById('sort-FullName');
        let sortByFaculty = document.getElementById('sort-Faculty');
        let sortByDate = document.getElementById('sort-Date');
        let sortByYearStudy = document.getElementById('sort-YearStudy');
        let direction = false;

        sortByFullName.addEventListener('click', function () {
            sortArrayByProp(studentsList, ['surname'], direction);
            renderStudentsTable(studentsList);
        });
        sortByFaculty.addEventListener('click', function () {
            sortArrayByProp(studentsList, ['faculty'], direction);
            renderStudentsTable(studentsList);
        });
        sortByDate.addEventListener('click', function () {
            sortArrayByProp(studentsList, ['date'], direction);
            renderStudentsTable(studentsList);
        });
        sortByYearStudy.addEventListener('click', function () {
            sortArrayByProp(studentsList, ['yearStudy'], true);
            renderStudentsTable(studentsList);
        });
    };

    function sortArrayByProp (array, prop, dir) { // метод сортировки
        let result = array.sort(function(a,b) {
            let dirIf = dir == false ? a[prop] < b[prop] : a[prop] > b[prop]
            if (dirIf == true) return -1;
        });
        return result;
    }

    function filter (array, prop, value) { // метод фильтра
        let result = [],
            copy = [...array];
        for (const item of copy) {
            if (String(item[prop]).includes(value) === true) result.push(item);
        }
        return result;
    }

    function renderStudents (array) { // рендер фильтра
        const table = document.querySelector('.table');
        table.innerHTML = '';

        const fioVal = document.getElementById('inp-fio').value,
            yearVal = document.getElementById('inp-year-study').value

        let newArray = [...array];
        if (fioVal !== '') newArray = filter (newArray, 'surname', fioVal);
        if (yearVal !== '') newArray = filter (newArray, 'yearStudy', yearVal);

        for (const user of newArray) {
            const tr = getStudentItem(user);
            table.append(tr);
        }
    }

    function filterStudent () { // фильтр
        let filterForm = document.getElementById('filter-form');
        filterForm.onsubmit = function (e) {
            e.preventDefault();
            renderStudents(studentsList);
        };
    }

    function createSendingForm () { // создание формы для заполнения информации о студенте
        let form = document.createElement('form');
        let inputName = document.createElement('input');
        let inputSurname = document.createElement('input');
        let inputMiddleName = document.createElement('input');
        let inputDate = document.createElement('input');
        let inputYearStudy = document.createElement('input');
        let inputFaculty = document.createElement('input');
        let button = document.createElement('button');

        inputName.placeholder = 'Имя';
        inputSurname.placeholder = 'Фамилия';
        inputMiddleName.placeholder = 'Отчество';
        inputDate.placeholder = 'Дата рождения';
        inputDate.type = 'date';
        inputYearStudy.placeholder = 'Год начала обучения';
        inputFaculty.placeholder = 'Факультет';
        button.textContent = 'Отправить';

        form.classList.add('form-sending');
        inputName.classList.add('form-sending-item');
        inputSurname.classList.add('form-sending-item');
        inputMiddleName.classList.add('form-sending-item');
        inputDate.classList.add('form-sending-item');
        inputYearStudy.classList.add('form-sending-item');
        inputFaculty.classList.add('form-sending-item');

        form.append(inputName, inputSurname, inputMiddleName, inputDate, inputYearStudy, inputFaculty, button);

        return {
            form,
            inputName,
            inputSurname,
            inputMiddleName,
            inputDate,
            inputYearStudy,
            inputFaculty,
            button,
        };
    }

    function sendingForm () { // логика создания формы
        let newForm = createSendingForm();
        let currentYear = new Date().getFullYear();

        document.body.prepend(newForm.form);

        newForm.button.addEventListener('click', function (e) {
            e.preventDefault();

            if (
                newForm.inputName.value && !Number(newForm.inputName.value) &&
                newForm.inputSurname.value && !Number(newForm.inputSurname.value) &&
                newForm.inputMiddleName.value && !Number(newForm.inputMiddleName.value) &&
                newForm.inputDate.valueAsDate &&
                newForm.inputYearStudy.value && Number(newForm.inputYearStudy.value) &&
                newForm.inputFaculty.value && !Number(newForm.inputFaculty.value)
            ) {
                let newStudent = {
                    id: idForElement(),
                    name: formatString(newForm.inputName.value.trim()),
                    surname: formatString(newForm.inputSurname.value.trim()),
                    middleName: formatString(newForm.inputMiddleName.value.trim()),
                    date: formatDate(newForm.inputDate.valueAsDate),
                    yearStudy: newForm.inputYearStudy.value.trim(),
                    faculty: formatString(newForm.inputFaculty.value.trim()),
                };

                studentsList.push(newStudent);
                addStudentToDB(newStudent);
                renderStudentsTable(studentsList);

                newForm.inputName.value = '';
                newForm.inputSurname.value = '';
                newForm.inputMiddleName.value = '';
                newForm.inputDate.value = '';
                newForm.inputYearStudy.value = '';
                newForm.inputFaculty.value = '';
            } else {
                switch (false) {
                    case !!newForm.inputName.value:
                        alert ('Введите имя');
                        break;
                    case !!newForm.inputSurname.value:
                        alert ('Введите фамилию');
                        break;
                    case !!newForm.inputMiddleName.value:
                        alert ('Введите отчество');
                        break;
                    case !!newForm.inputDate.valueAsDate:
                        alert ('Введите дату рождения');
                        break;
                    case !!newForm.inputYearStudy.value || Number(newForm.inputYearStudy.value):
                        alert ('Введите год начала обучения или проверьте значение');
                        break;
                    case !!newForm.inputFaculty.value:
                        alert ('Введите факультет');
                        break;
                }
            };
        });
    }

    async function addStudentToDB (studentObj) {
        const responce = await fetch ('http://localhost:3000/students', {
            method: 'POST',
            body: JSON.stringify ({
                "id": studentObj.id,
                "name": studentObj.name,
                "surname": studentObj.surname,
                "middleName": studentObj.middleName,
                "date": studentObj.date,
                "yearStudy": studentObj.yearStudy,
                "faculty": studentObj.faculty,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const student = await responce.json();
        return student;
    }

    async function deleteStudentFromDB (studentId) {
        const responce = await fetch (`http://localhost:3000/students/${studentId}`, {
            method: 'DELETE',
        });       
    }

    function formatString(string) { // приводит строку в нужный формат, даже если пользователь ошибся
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    function formatDate(date) { // приводит дату в нужный формат
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    function idForElement () { // генератор id
        if (studentsList.length === 0) return 1;
        else return studentsList[studentsList.length - 1].id + 1;
    };

    window.renderStudentsTable = renderStudentsTable;
    window.studentsList = studentsList;
    window.sendingForm = sendingForm;
    window.getStudentsFromDB = getStudentsFromDB;
})();
