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

    function sleep (milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
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
        Game();
    }

    function Game () {
        tiles = document.getElementsByClassName('tile');
        let index = 0;
        let tempVariable = 0;
        let restart = true;
        
        while (restart) {
            for (let i = 0; i < tiles.length; i++) {
                tiles[i].addEventListener('click', function () {
                    if (index === 0) {
                        tiles[i].classList.remove('close');
                        tempVariable = tiles[i];
                        index++;
                        console.log('индекс +1');
                        return;
                    } else {
                        if (index !== 0) {
                            tiles[i].classList.remove('close');
                            if (tiles[i].innerHTML === tempVariable.innerHTML) {
                                tiles[i].classList.add('open');
                                tempVariable.classList.add('open');
                                index = 0;
                            } else {
                                index = 0
                                tiles[i].classList.remove('close');
                                sleep(1000);
                                tiles[i].classList.add('close');
                                tempVariable.classList.add('close');
                                tempVariable = 0;
                            }
                        }
                    }
                });
            }
        restart = false;
        console.log('конец');
        }
    }

    window.startGame = startGame;
})();