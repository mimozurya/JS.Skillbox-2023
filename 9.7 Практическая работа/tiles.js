(function () {
    function createNumbersArray(count) {
        array = [];
        for (let i = 1; i < count + 1; i++) {
            for (let j = 0; j < 2; j++) {
                array.push(i);
            }
        }
        return array;
    }

    function shuffle(arr) {
        arr.sort(() => Math.random() - 0.5);
        return arr;
    }

    function startGame(container, count) {
        let tilesArray = createNumbersArray(count);
        tilesArray = shuffle(tilesArray);
        for (let i = 0; i < tilesArray.length; i++) {
            let tile = document.createElement('div');
            tile.innerHTML = tilesArray[i];
            tile.classList.add('tile', 'close');
            container.append(tile);
        }
        Game(count);
    }

    function Game(count) {
        let tiles = document.querySelectorAll('.tile');
        let index = 0;
        let tempVariable = 0;
        let counter = 0;

        tiles.forEach((tile) => {
            tile.addEventListener('click', function () {
                if (!index) {
                    tile.classList.remove('close');
                    tempVariable = tile;
                    index++;
                } else {
                    if (index > 0 && tile !== tempVariable) {
                        tile.classList.remove('close');
                        if (tile.innerHTML === tempVariable.innerHTML) {
                            index = 0;
                            tile.classList.add('open');
                            tempVariable.classList.add('open');
                            counter += 2;
                            if (counter === count * 2) {
                                repeatGame();
                            }
                        } else {
                            index = -1; // чтобы не кликали на другие кнопки пока можно посмотреть на две выбранные
                            tile.classList.remove('close');
                            tempVariable.classList.remove('close');
                            setTimeout(() => {
                                tile.classList.add('close'),
                                    tempVariable.classList.add('close');
                                index = 0;
                            },
                                500
                            );
                        }
                    }
                }
            });
        })
    }

    function repeatGame() {
        let button = document.createElement('button');
        button.textContent = 'Сыграть еще раз';
        button.classList.add('btn');
        document.body.append(button);
        let input = document.querySelector('.input');
        input.value = 'Успел!';

        button.onclick = function () {
            window.location.reload();
        }
    }

    function createNumbers() {
        let form = document.querySelector('.form');
        let input = document.createElement('input');
        let text = document.querySelector('.text');
        input.classList.add('input');
        form.append(input);

        input.onchange = function () {
            const value = input.value;
            if (+(value) > 1 && +(value) < 11 && +(value) % 2 === 0) {
                startGame(document.getElementById('signs'), +(value));

                text.textContent = 'Осталось времени:';
                input.value = 60;
                var counter = setInterval(timer, 1000);
                function timer() {
                    if (!isNaN(value))
                        input.value--;
                    if (input.value <= 0 && input.value !== 'Успел!') {
                        clearInterval(counter);
                        input.value = 'Вы не успели!';
                        setTimeout(() => {
                            window.location.reload();
                        },
                            3000
                        );
                    }
                }

            } else if (+(value) % 2 !== 0) {
                value = '';
                input.placeholder = 'Чётное!';
            } else {
                value = '';
                input.placeholder = 'Значение от 2 до 10!';
            }
        };
    }

    window.startGame = startGame;
    window.createNumbers = createNumbers;
})();