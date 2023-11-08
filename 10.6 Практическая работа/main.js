(() => {
    const studentsList = [
        { name: 'Сергей', surname: 'Сидоренко', middleName: 'Валерьевич', date: '03.08.1976', yearStudy: '1992', faculty: 'Технарь' },
        { name: 'Иван', surname: 'Болонкин', middleName: 'Ринатович', date: '24.04.2002', yearStudy: '2020', faculty: 'Химфак' },
        { name: 'Никита', surname: 'Алексеев', middleName: 'Русланович', date: '13.09.2004', yearStudy: '2021', faculty: 'Матфак' },
        { name: 'Роман', surname: 'Меслер', middleName: 'Александрович', date: '18.04.1997', yearStudy: '2022', faculty: 'Медфак' },
        { name: 'Андрей', surname: 'Волков', middleName: 'Анатольевич', date: '20.01.1980', yearStudy: '2016', faculty: 'Матмех' },
        { name: 'Анастасия', surname: 'Пинягина', middleName: 'Александровна', date: '01.05.2005', yearStudy: '2023', faculty: 'Физтех' },
        { name: 'Бубылда', surname: 'Обэмэ', middleName: 'Кунлус', date: '16.07.2001', yearStudy: '2017', faculty: 'Меж.отнош.' },
    ]

    function getStudentItem(studentObj) { // создание строки студента
        let tr = document.createElement('tr');
        let thFullName = document.createElement('th');
        let thFaculty = document.createElement('th');
        let thDate = document.createElement('th');
        let thYearStudy = document.createElement('th');

        tr.classList.add('list');
        thFullName.classList.add('list-item-fullname');
        thFaculty.classList.add('list-item-faculty');
        thDate.classList.add('list-item-date');
        thYearStudy.classList.add('list-item-yearStudy');

        thFullName.textContent = [studentObj.surname, studentObj.name, studentObj.middleName].join(' ');
        thFaculty.textContent = studentObj.faculty;
        thDate.textContent = studentObj.date + ' (' + (new Date().getFullYear() - parseInt(studentObj.date.split('.')[2])) + ')';
        if (new Date().getFullYear() - parseInt(studentObj.yearStudy) < 4) {
            thYearStudy.textContent = `${studentObj.yearStudy} (${new Date().getFullYear() - parseInt(studentObj.yearStudy) + 1} курс) `;
        } else {
            thYearStudy.textContent = 'закончил';
        }
        tr.append(thFullName, thFaculty, thDate, thYearStudy);

        return tr;
    }

    function renderStudentsTable(studentsArray) { // создание строк студентов
        let table = document.querySelector('.table');
        table.innerHTML = '';
        for (let student of studentsArray) {
            table.append(getStudentItem(student));
        }
        sortStudents();
        filterStudent();
    }

    function sortStudents() { // сортировка на кнопки
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

    function sortArrayByProp(array, prop, dir) { // метод сортировки
        let result = array.sort(function (a, b) {
            let dirIf = dir == false ? a[prop] < b[prop] : a[prop] > b[prop]
            if (dirIf == true) return -1;
        });
        return result;
    }

    function filter(array, prop, value) { // метод фильтра
        let result = [],
            copy = [...array];
        for (const item of copy) {
            if (String(item[prop]).includes(value) === true) result.push(item);
        }
        return result;
    }

    function renderStudents(array) { // рендер фильтра
        const table = document.querySelector('.table');
        table.innerHTML = '';

        const fioVal = document.getElementById('inp-fio').value,
            yearVal = document.getElementById('inp-year-study').value

        let newArray = [...array];
        if (fioVal !== '') newArray = filter(newArray, 'surname', fioVal);
        if (yearVal !== '') newArray = filter(newArray, 'yearStudy', yearVal);

        for (const user of newArray) {
            const tr = getStudentItem(user);
            table.append(tr);
        }
    }

    function filterStudent() { // фильтр
        let filterForm = document.getElementById('filter-form');
        filterForm.onsubmit = function (e) {
            e.preventDefault();
            renderStudents(studentsList);
        };
    }

    function createSendingForm() { // создание формы для заполнения информации о студенте
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

    function sendingForm() { // логика создания формы
        let newForm = createSendingForm();
        let currentYear = new Date().getFullYear();

        document.body.prepend(newForm.form);

        newForm.button.addEventListener('click', function (e) {
            e.preventDefault();

            const { form, button, ...other } = newForm;
            const dictionary = {
                inputName: { badValue: 'Введите имя', valid: (value) => String(value) && !!Number(value) },
                inputSurname: { badValue: 'Введите фамилию', valid: (value) => String(value) && !!Number(value) },
                inputMiddleName: { badValue: 'Введите отчество', valid: (value) => value && !!Number(value) },
                inputDate: { badValue: 'Введите дату рождения', valid: (value) => value && Number(value) },
                inputYearStudy: { badValue: 'Введите отчество', valid: (value) => Number(value) && !!String(value) },
                inputFaculty: { badValue: 'Введите факультет', valid: (value) => String(value) && !!Number(value) },
            };
            const badElem = Object.entries(other).find(el => dictionary[el[0]].valid(el[1].value));

            if (!badElem) {
                let newStudent = {
                    name: formatString(newForm.inputName.value.trim()),
                    surname: formatString(newForm.inputSurname.value.trim()),
                    middleName: formatString(newForm.inputMiddleName.value.trim()),
                    date: formatDate(newForm.inputDate.valueAsDate),
                    yearStudy: newForm.inputYearStudy.value.trim(),
                    faculty: formatString(newForm.inputFaculty.value.trim()),
                };
                studentsList.push(newStudent);
                renderStudentsTable(studentsList);

                for (const key in other) {
                    other[key] = '';
                }
                newForm = { ...newForm, ...other };
            } else alert(dictionary[badElem[0]].badValue);
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

    window.renderStudentsTable = renderStudentsTable;
    window.studentsList = studentsList;
    window.sendingForm = sendingForm;
})();
