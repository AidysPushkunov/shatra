import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

export class Shatra extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? "blackShatra" : "whiteShatra";
    this.name = FigureNames.SHATRA;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    if (this.cell.isFortressAbility(this.cell)) {
      return true;
    }

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

    if (
      target.y === this.cell.y + direction &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    if (
      (target.y === this.cell.y + direction && target.x === this.cell.x + 1) ||
      (target.y === this.cell.y + direction && target.x === this.cell.x - 1) ||
      (target.y === this.cell.y && target.x === this.cell.x - 1) ||
      (target.y === this.cell.y && target.x === this.cell.x + 1) ||
      (target.y === this.cell.y + direction && target.x === this.cell.x) ||
      (((target.y === this.cell.y - direction && target.x === this.cell.x) ||
        (target.y === this.cell.y - direction &&
          target.x === this.cell.x - 1) ||
        (target.y === this.cell.y - direction &&
          target.x === this.cell.x + 1)) &&
        this.cell.isEnemy(target))
    ) {
      return true;
    }

    return false;
  }

  /*
    isFirstStep: boolean = true

    moveFigure(target: Cell) {
      super.moveFigure(target);
      this.isFirstStep = false
    }
  */
}
