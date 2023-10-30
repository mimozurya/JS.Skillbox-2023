(function () {
    function createNumbersArray(count) {
        array = [];
        for (let i = 1; i < count+1; i++) {
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

    function startGame (container, count) {
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

    function Game (count) {
        tiles = document.getElementsByClassName('tile');
        let index = 0;
        let tempVariable = 0;
        let restart = true;
        let counter = 0;
        
        while (restart) {
            for (let i = 0; i < tiles.length; i++) {
                tiles[i].addEventListener('click', function () {
                    if (index === 0) {
                        tiles[i].classList.remove('close');
                        tempVariable = tiles[i];
                        index++;
                    } else {
                        if (index !== 0 && index !== -1 && tiles[i] !== tempVariable) {
                            tiles[i].classList.remove('close');
                            if (tiles[i].innerHTML === tempVariable.innerHTML) {
                                index = 0;
                                tiles[i].classList.add('open');
                                tempVariable.classList.add('open');
                                counter += 2;
                                if (counter === count*2) {
                                    repeatGame();
                                }
                            } else {
                                index = -1; // чтобы не кликали на другие кнопки пока можно посмотреть на две выбранные
                                tiles[i].classList.remove('close');
                                tempVariable.classList.remove('close');
                                setTimeout (() => {
                                    tiles[i].classList.add('close'),
                                    tempVariable.classList.add('close');
                                    index = 0;
                                    },
                                    800
                                );
                            }
                        }
                    }
                });
            }
            
        restart = false;
        }
    }

    function repeatGame() {
        let button = document.createElement('button');
        button.textContent = 'Сыграть еще раз';
        button.classList.add('btn');
        document.body.append(button);

        button.onclick = function () {
            window.location.reload();
        }
    }

    window.startGame = startGame;
})();