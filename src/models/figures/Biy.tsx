import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

export class Biy extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? "blackBiy" : "whiteBiy";
    this.name = FigureNames.BIY;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

    if (
      (target.y === this.cell.y + direction && target.x === this.cell.x + 1) ||
      (target.y === this.cell.y + direction && target.x === this.cell.x - 1) ||
      (target.y === this.cell.y && target.x === this.cell.x - 1) ||
      (target.y === this.cell.y && target.x === this.cell.x + 1) ||
      (target.y === this.cell.y + direction && target.x === this.cell.x) ||
      (target.y === this.cell.y - direction && target.x === this.cell.x) ||
      (target.y === this.cell.y - direction && target.x === this.cell.x - 1) ||
      (target.y === this.cell.y - direction && target.x === this.cell.x + 1)
    ) {
      return true;
    }

    if (this.cell.isFortressAbility(this.cell)) {
      return true;
    }

    return false;
  }
}
