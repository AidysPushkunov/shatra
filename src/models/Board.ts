import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Biy } from "./figures/Biy";
import { Baatyr } from "./figures/Baatyr";
import { Shatra } from "./figures/Shatra";

export class Board {
  cells: Cell[][] = [];

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
            row.push(new Cell(this, j, i, Colors.FORTRESS, null));
          } else {
            row.push(new Cell(this, j, i, Colors.WHITE, null));
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
            row.push(new Cell(this, j, i, Colors.FORTRESS, null));
          } else {
            row.push(new Cell(this, j, i, Colors.BLACK, null));
          }
        }
      }
      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

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

  private addBaatyr() {}

  public addFigures() {
    this.addShatra();
    this.addBiy();
    this.addBaatyr();
  }
}
