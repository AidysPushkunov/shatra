import { Colors } from "../Colors";
import { Cell } from "../Cell";

import { FigureEntities } from "@/entities/figure";

export enum FigureNames {
  FIGURE = "figure",
  SHATRA = "shatra",
  BIY = "whiteBiy",
  BAATYR = "baatyr",
}

export class Figure {
  color: Colors;
  logo:
    | "whiteShatra"
    | "blackShatra"
    | "whiteBiy"
    | "blackBiy"
    | "whiteBaatyr"
    | "blackBaatyr"
    | undefined;
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = undefined;
    this.name = FigureNames.FIGURE;

    this.id = Math.random();
  }

  // figureOnFortress(cell: Cell): boolean {
  //   for (let i = 0; i < 14; i++) {
  //     for (let j = 0; j < 7; j++) {
  //       if (cell.y === 13 && cell.x >= 2 && cell.x <= 4) {
  //         return true;
  //       }

  //       if (cell.y === 12 && cell.x >= 2 && cell.x <= 4) {
  //         return true;
  //       }

  //       if (cell.y === 11 && cell.x >= 2 && cell.x <= 4) {
  //         return true;
  //       }

  //       if (cell.y === 10 && cell.x === 3) {
  //         return true;
  //       }

  //       if (cell.y === 0 && cell.x >= 2 && cell.x <= 4) {
  //         return true;
  //       }
  //       if (cell.y === 1 && cell.x >= 2 && cell.x <= 4) {
  //         return true;
  //       }
  //       if (cell.y === 2 && cell.x >= 2 && cell.x <= 4) {
  //         return true;
  //       }
  //       if (cell.y === 3 && cell.x === 3) {
  //         return true;
  //       }
  //     }
  //   }

  //   return false;
  // }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }

    return true;
  }

  moveFigure(target: Cell) {}
}
