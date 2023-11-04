export class Tile {

    x = 0;
    y = 0;
    value = 0;
    tileElement = null;

    constructor(gridElement) {
        this.tileElement = document.createElement('div');
        this.tileElement.classList.add('tile');
        this.setValue(Math.random() > 0.5 ? 2 : 4);
        gridElement.appendChild(this.tileElement);
    }

    setXY (x,y) {
        this.x = x;
        this.y = y;
        this.tileElement.style.setProperty('--x', x);
        this.tileElement.style.setProperty('--y', y);
    }

    setValue(value) {
        this.value = value;
        this.tileElement.textContent = value;
        const bgLightness = 100 - Math.log2(value) * 9;
        this.tileElement.style.setProperty('--bgLightness', `${bgLightness}%`);
        this.tileElement.style.setProperty('--textLightness', `${bgLightness > 50 ? 10 : 90}%`)
    }
}