import { Grid } from "./grid.js";
import { Tile } from "./tile.js";

const gameBoard = document.querySelector('.game-board');

const grid = new Grid(gameBoard);

grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));

document.addEventListener('keydown', handleInput);

function handleInput(event) {
    switch(event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            break;
        case 'ArrowLeft':
            break;
        case 'ArrowRight':
            break;
        default:
            return;
    }
}

function moveUp() {
    slideTiles(grid.groupedCellsByColumn);
}

function slideTiles (groupedCells) {
    groupedCells.forEach(group => slideTilesInGroup(group));
}

function slideTilesInGroup (group) {
    for (let i = 1; i < group.length; i++) {
        if (group[i].isEmpty()) {
            continue;
        }

        const cellWithTile = group[i];
        let targetCell;
        let j = i-1;

        while (j >= 0 && group[j].cunAccept(cellWithTile.linkedTile)) {
            targetCell = group[j];
            j--;
        }

        if (!targetCell) {
            continue;
        }

        if (targetCell.isEmpty()) {
            targetCell.linkTile(cellWithTile.linkedTile);
        } else {
            targetCell.linkTileForMerge(cellWithTile.linkedTile);
        }

        cellWithTile.unlinkTile();
    }
}