import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Direction } from "../Direction";
import { Figure, FigureNames } from "./Figure";

export class Baatyr extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? "blackBaatyr" : "whiteBaatyr";
    this.name = FigureNames.BAATYR;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

    if (this.cell.board.canEatAbilityBaatyr(this.cell)) {
      if (
        this.cell.canEatBaatyr(target, Direction.VERTICAL)?.x === target.x &&
        this.cell.canEatBaatyr(target, Direction.VERTICAL)?.y === target.y
      ) {
        return true;
      }

      if (
        this.cell.canEatBaatyr(target, Direction.HORIZONTAL)?.x === target.x &&
        this.cell.canEatBaatyr(target, Direction.HORIZONTAL)?.y === target.y
      ) {
        return true;
      }

      if (
        this.cell.canEatBaatyr(target, Direction.DIOGONAL)?.x === target.x &&
        this.cell.canEatBaatyr(target, Direction.DIOGONAL)?.y === target.y
      ) {
        return true;
      }
    } else {
      if (this.cell.isEmptyVertical(target)) {
        return true;
      }
      if (this.cell.isEmptyHorizontal(target)) {
        return true;
      }
      if (this.cell.isEmptyDiogonal(target)) {
        return true;
      }

      if (this.cell.isFortressAbility(this.cell)) {
        if (this.cell.y <= 3) {
          for (let i = 4; i <= 6; i++) {
            for (let j = 0; j <= 6; j++) {
              if (target.x === j && target.y === i) return true;
            }
          }
        }

        if (this.cell.y >= 10) {
          for (let i = 7; i <= 9; i++) {
            for (let j = 0; j <= 6; j++) {
              if (target.x === j && target.y === i) return true;
            }
          }
        }

        return false;
      }
    }

    return false;
  }
}
