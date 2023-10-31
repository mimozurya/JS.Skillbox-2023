(() => {
    const studentsList = [
        {name: 'Сергей', surname: 'Сергеев', middleName: 'Сергеевич', date: '25-04-2004', yearStudy: '2021', faculty: 'Радиофак'},
        {name: 'Иван', surname: 'Иванов', middleName: 'Иванович', date: '24-04-2004', yearStudy: '2022', faculty: 'Химфак'},
        {name: 'Никита', surname: 'Никитов', middleName: 'Никитович', date: '23-04-2004', yearStudy: '2023', faculty: 'Матфак'},
        {name: 'Олег', surname: 'Олегов', middleName: 'Олегович', date: '22-04-2004', yearStudy: '2021', faculty: 'Медфак'},
        {name: 'Артем', surname: 'Артемов', middleName: 'Артемович', date: '21-04-2004', yearStudy: '2022', faculty: 'Культфак'},
        {name: 'Андрей', surname: 'Андреев', middleName: 'Андреевич', date: '20-04-2004', yearStudy: '2023', faculty: 'Стройфак'},
    ]

    function getStudentItem(studentObj) {
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
        thDate.textContent = studentObj.date;
        thYearStudy.textContent = studentObj.yearStudy;
        tr.append(thFullName, thFaculty, thDate, thYearStudy);

        return tr;
    }

    function renderStudentsTable(studentsArray) {
        let table = document.querySelector('.table');
        table.innerHTML = '';
        for (let student of studentsArray) {
            table.append(getStudentItem(student));
        }
        createFilterLine();
    }

    function createFilterLine () {
        let tr = document.createElement('tr');
        let headingFullName = document.createElement('th');
        let headingFaculty = document.createElement('th');
        let headingDate = document.createElement('th');
        let headingYearStudy = document.createElement('th');
        let table = document.querySelector('.table');

        headingFullName.textContent = 'ФИО';
        headingFaculty.textContent = 'Факультет';
        headingDate.textContent = 'Дата рождения и возраст';
        headingYearStudy.textContent = 'Годы обучения';

        tr.classList.add('sort-list');
        headingFullName.classList.add('sort-list-item');
        headingFaculty.classList.add('sort-list-item');
        headingDate.classList.add('sort-list-item');
        headingYearStudy.classList.add('sort-list-item');

        tr.append(headingFullName, headingFaculty, headingDate, headingYearStudy);
        table.prepend(tr);
    }

    function createSendingForm () {
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

    function sendingForm () {
        let newForm = createSendingForm();

        document.body.prepend(newForm.form);

        newForm.button.addEventListener('click', function (e) {
            e.preventDefault();

            if (
                newForm.inputName.value &&
                newForm.inputSurname.value &&
                newForm.inputMiddleName.value &&
                newForm.inputDate.valueAsDate &&
                newForm.inputYearStudy.value &&
                newForm.inputFaculty.value
            ) {
                let newStudent = {
                    name: newForm.inputName.value,
                    surname: newForm.inputSurname.value,
                    middleName: newForm.inputMiddleName.value,
                    date: formatDate(newForm.inputDate.valueAsDate),
                    yearStudy: newForm.inputYearStudy.value,
                    faculty: newForm.inputFaculty.value,
                };

                studentsList.push(newStudent);
                renderStudentsTable(studentsList);
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
                    case !!newForm.inputYearStudy.value:
                        alert ('Введите год начала обучения');
                        break;
                    case !!newForm.inputFaculty.value:
                        alert ('Введите факультет');
                        break;
                }
            };
        });
    }

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    window.renderStudentsTable = renderStudentsTable;
    window.studentsList = studentsList;
    window.sendingForm = sendingForm;
})();

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.