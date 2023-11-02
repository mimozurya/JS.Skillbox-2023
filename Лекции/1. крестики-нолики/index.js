const game = document.querySelector('.game');
const res = document.querySelector('.res');
const btnGame = document.querySelector('.new-game');
const fields = document.querySelectorAll('.field');
let stepCross = true;
let count = 0;

const circle = `<svg class="circle">
<circle r="45" cx="58" cy="58" stroke="blue"
stroke-width="10" fill="none">
</svg>`;

const cross = `<svg class="cross"> 
<line class="first" 
x1="15" y1="15" x2="105" y2="105" 
stroke="red" stroke-width="10"
stroke-linecap="round"></line>
<line class="second" 
x1="105" y1="15" x2="15" y2="105" 
stroke="red" stroke-width="10"
stroke-linecap="round"></line>
</svg>`

function doStep(target) {
    target.innerHTML = stepCross ? cross: circle
    target.classList.add(stepCross ? 'x' : 'o');
}

function init (e) {
    doStep(e.target);
    stepCross = !stepCross;
    count++;
    // win();
};

function newGame () {
    res.innerHTML = '';
    stepCross = true;
    count = 0;
    Array.from(fields).forEach(el => {
        el.innerHTML = '';
        el.classList.remove('x', 'o');
        //
    });
}

function win () {
    let result = '';

    const comb = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < comb.length; i++) {
        const cur = comb[i];
        const curFields = [
            fields[cur[0]],
            fields[cur[1]],
            fields[cur[2]] // 1:07:18
        ];

        if (curFields.every(el => el.classList.contains('x'))) {
            result = 'Выиграли X';
        }
    }
}