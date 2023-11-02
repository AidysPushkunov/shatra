import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Biy } from "./figures/Biy";
import { Baatyr } from "./figures/Baatyr";

export class Board {
  cells: Cell[][] = [];

  public initCells() {
    for (let i = 0; i < 14; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 7; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public addFigures() {
    new Biy(Colors.WHITE, this.getCell(3, 3));
  }
}
