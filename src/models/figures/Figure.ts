import { Colors } from "../Colors";
import { Cell } from "../Cell";
import { Board } from "../Board";

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
    | "fortress"
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

  canMove(target: Cell): boolean {
    if (target.figure) {
      return false;
    }

    if (target.color === Colors.FORTRESS) {
      return false;
    }

    // let x: Boolean | Cell = target.canEat(target);


    // x.figure ? false : true;

    return true;
  }

  moveFigure(target: Cell) {}
}
