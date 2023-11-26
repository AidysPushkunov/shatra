import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Biy } from "./figures/Biy";
import { Baatyr } from "./figures/Baatyr";
import { Shatra } from "./figures/Shatra";
import { Figure } from "./figures/Figure";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for (let i = 0; i < 14; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 7; j++) {
        if ((i + j) % 2 !== 0) {
          if (
            (i === 0 && j === 1) ||
            (i === 0 && j === 5) ||
            (i === 1 && j === 6) ||
            (i === 1 && j === 0) ||
            (i === 2 && j === 1) ||
            (i === 2 && j === 5) ||
            (i === 3 && j === 0) ||
            (i === 3 && j === 2) ||
            (i === 3 && j === 4) ||
            (i === 3 && j === 6) ||
            (i === 10 && j === 1) ||
            (i === 10 && j === 5) ||
            (i === 11 && j === 0) ||
            (i === 11 && j === 6) ||
            (i === 12 && j === 1) ||
            (i === 12 && j === 5) ||
            (i === 13 && j === 6) ||
            (i === 13 && j === 0)
          ) {
            row.push(new Cell(this, j, i, Colors.FORTRESS, false, null));
          } else {
            if (
              (i === 0 && j >= 2 && j <= 4) ||
              (i === 1 && j >= 2 && j <= 4) ||
              (i === 2 && j >= 2 && j <= 4) ||
              (i === 3 && j === 3) ||
              (i === 13 && j >= 2 && j <= 4) ||
              (i === 12 && j >= 2 && j <= 4) ||
              (i === 11 && j >= 2 && j <= 4) ||
              (i === 10 && j === 3)
            ) {
              row.push(new Cell(this, j, i, Colors.WHITE, true, null));
            } else {
              row.push(new Cell(this, j, i, Colors.WHITE, false, null));
            }
          }
        } else {
          if (
            (i === 0 && j === 0) ||
            (i === 0 && j === 6) ||
            (i === 1 && j === 5) ||
            (i === 1 && j === 1) ||
            (i === 2 && j === 6) ||
            (i === 2 && j === 0) ||
            (i === 3 && j === 1) ||
            (i === 3 && j === 5) ||
            (i === 10 && j === 0) ||
            (i === 10 && j === 2) ||
            (i === 10 && j === 4) ||
            (i === 10 && j === 6) ||
            (i === 11 && j === 0) ||
            (i === 11 && j === 5) ||
            (i === 12 && j === 1) ||
            (i === 12 && j === 6) ||
            (i === 13 && j === 0) ||
            (i === 13 && j === 5) ||
            (i === 11 && j === 1) ||
            (i === 12 && j === 0) ||
            (i === 13 && j === 1)
          ) {
            row.push(new Cell(this, j, i, Colors.FORTRESS, false, null));
          } else {
            if (
              (i === 0 && j >= 2 && j <= 4) ||
              (i === 1 && j >= 2 && j <= 4) ||
              (i === 2 && j >= 2 && j <= 4) ||
              (i === 3 && j === 3) ||
              (i === 13 && j >= 2 && j <= 4) ||
              (i === 12 && j >= 2 && j <= 4) ||
              (i === 11 && j >= 2 && j <= 4) ||
              (i === 10 && j === 3)
            ) {
              row.push(new Cell(this, j, i, Colors.BLACK, true, null));
            } else {
              row.push(new Cell(this, j, i, Colors.BLACK, false, null));
            }
          }
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  // public getFortressAbility(cell: Cell) {
  //   console.log(cell.figure?.fortressAbility);
  // }

  // canEatAbility() {
  //   for (let x = 0; x <= 6; x++) {
  //     for (let j = 0; j <= 13; j++) {
  //       if (Boolean(this.getCell(x, j).canEat(this.getCell(x, j)))) {
  //         return true;
  //       }
  //     }
  //   }
  // }

  private addShatra() {
    for (let i = 2; i <= 4; i++) {
      new Shatra(Colors.BLACK, this.getCell(i, 0));
      new Shatra(Colors.BLACK, this.getCell(i, 1));
      new Shatra(Colors.BLACK, this.getCell(i, 2));

      new Shatra(Colors.WHITE, this.getCell(i, 11));
      new Shatra(Colors.WHITE, this.getCell(i, 12));
      new Shatra(Colors.WHITE, this.getCell(i, 13));
    }

    for (let i = 0; i < 7; i++) {
      new Shatra(Colors.BLACK, this.getCell(i, 4));
      new Shatra(Colors.BLACK, this.getCell(i, 5));

      new Shatra(Colors.WHITE, this.getCell(i, 8));
      new Shatra(Colors.WHITE, this.getCell(i, 9));
    }
  }

  private addBiy() {
    new Biy(Colors.BLACK, this.getCell(3, 3));
    new Biy(Colors.WHITE, this.getCell(3, 10));
  }

  private addBaatyr() {
    this.addBaatyr();
  }

  public addFigures() {
    this.addShatra();
    this.addBiy();

    // new Shatra(Colors.WHITE, this.getCell(3, 7));
    // new Shatra(Colors.BLACK, this.getCell(3, 6));
    // new Shatra(Colors.BLACK, this.getCell(3, 8));

    // new Shatra(Colors.BLACK, this.getCell(2, 6));
    // new Shatra(Colors.BLACK, this.getCell(2, 7));
    // new Shatra(Colors.BLACK, this.getCell(2, 8));

    // new Shatra(Colors.BLACK, this.getCell(4, 6));
    // new Shatra(Colors.BLACK, this.getCell(4, 7));
    // new Shatra(Colors.BLACK, this.getCell(4, 8));

    // new Shatra(Colors.BLACK, this.getCell(4, 4));
  }
}
