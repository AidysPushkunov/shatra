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
  logo: typeof FigureEntities | null;
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    return true;
  }

  moveFigure(target: Cell) {}
}
