import { Grid } from "./grid.js";
import { Tile } from "./tile.js";

const gameBoard = document.querySelector('.game-board');

const grid = new Grid(gameBoard);

grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));

document.addEventListener('keydown', handleInput);

function handleInput(event) {
    switch(event.key) {
        case 'ArrowUp':
            if (!canMove(grid.groupedCellsByColumn)) return;
            moveUp();
            break;
        case 'ArrowDown':
            if (!canMove(grid.groupedCellsByReversedColumn)) return;
            moveDown();
            break;
        case 'ArrowLeft':
            if (!canMove(grid.groupedCellsByRow)) return;
            moveLeft();
            break;
        case 'ArrowRight':
            if (!canMove(grid.groupedCellsByReversedRow)) return;
            moveRight();
            break;
        default:
            return;
    }

    const newTile = new Tile(gameBoard);
    grid.getRandomEmptyCell().linkTile(newTile);

    if (grid.cells.some(cell => !cell.isEmpty() && cell.linkedTile.value === 2048)) {
        alert('Победа');
        document.removeEventListener('keydown', handleInput);
        return;
    }

    if (!(canMove(grid.groupedCellsByRow) ||
        canMove(grid.groupedCellsByReversedColumn) ||
        canMove(grid.groupedCellsByRow) ||
        canMove(grid.groupedCellsByReversedRow))) {
            alert('Поражение');
            document.removeEventListener('keydown', handleInput);
            return;
        }
}

function moveUp() {
    slideTiles(grid.groupedCellsByColumn);
}


function moveDown() {
    slideTiles(grid.groupedCellsByReversedColumn);
}

function moveLeft() {
    slideTiles(grid.groupedCellsByRow);
}

function moveRight() {
    slideTiles(grid.groupedCellsByReversedRow);
}

function slideTiles (groupedCells) {
    groupedCells.forEach(group => slideTilesInGroup(group));
    grid.cells.forEach(cell => cell.linkedTileForMerge && cell.mergeTiles());
}

function slideTilesInGroup (group) {
    for (let i = 1; i < group.length; i++) {
        if (group[i].isEmpty()) {
            continue;
        }

        const cellWithTile = group[i];
        let targetCell;
        let j = i-1;

        while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
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

function canMove (groupedCells) {
    return groupedCells.some(group => canMoveInGroup(group));
}

function canMoveInGroup(group) {
    return group.some((cell, index) => {
        if (!index) return false;
        if (cell.isEmpty()) return false;
        const targetCell = group[index-1];
        return targetCell.canAccept(cell.linkedTile);
    });
}