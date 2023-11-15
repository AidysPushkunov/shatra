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

    if (this.cell.canEat(target)) {
      let eatFieldForward = this.cell.figure?.color === Colors.WHITE ? 2 : -2;

      if (
        this.cell.x - eatFieldForward === target.x &&
        this.cell.y - eatFieldForward === target.y
      )
        return true;

      if (
        this.cell.x + eatFieldForward === target.x &&
        this.cell.y + eatFieldForward === target.y
      )
        return true;

      if (
        this.cell.x + eatFieldForward === target.x &&
        this.cell.y - eatFieldForward === target.y
      )
        return true;

      if (
        this.cell.x - eatFieldForward === target.x &&
        this.cell.y + eatFieldForward === target.y
      )
        return true;

      if (
        this.cell.x === target.x &&
        this.cell.y + eatFieldForward === target.y
      )
        return true;

      if (
        this.cell.x + eatFieldForward === target.x &&
        this.cell.y === target.y
      )
        return true;

      if (
        this.cell.x - eatFieldForward === target.x &&
        this.cell.y === target.y
      )
        return true;

      if (
        this.cell.x === target.x &&
        this.cell.y - eatFieldForward === target.y
      )
        return true;

      return false;
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

    if (this.cell.isFortressAbility(this.cell)) {
      if (this.cell.y >= 10) {
        for (let i = 7; i <= 9; i++) {
          for (let j = 0; j <= 6; j++) {
            if (target.x === j && target.y === i) return true;
          }
        }
      } else {
        for (let i = 4; i <= 6; i++) {
          for (let j = 0; j <= 6; j++) {
            if (target.x === j && target.y === i) return true;
          }
        }
      }

      return false;
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
