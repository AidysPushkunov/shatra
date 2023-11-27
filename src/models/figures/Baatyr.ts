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

    if (this.cell.board.canEatAbility(this.cell)) {
      if (
        this.cell.canEat(target, Direction.TOP_LEFT)?.x === target.x &&
        this.cell.canEat(target, Direction.TOP_LEFT)?.y === target.y
      )
        return true;

      if (
        this.cell.canEat(target, Direction.TOP)?.x === target.x &&
        this.cell.canEat(target, Direction.TOP)?.y === target.y
      )
        return true;

      if (
        this.cell.canEat(target, Direction.TOP_RIGHT)?.x === target.x &&
        this.cell.canEat(target, Direction.TOP_RIGHT)?.y === target.y
      )
        return true;

      if (
        this.cell.canEat(target, Direction.LEFT)?.x === target.x &&
        this.cell.canEat(target, Direction.LEFT)?.y === target.y
      )
        return true;

      if (
        this.cell.canEat(target, Direction.RIGHT)?.x === target.x &&
        this.cell.canEat(target, Direction.RIGHT)?.y === target.y
      )
        return true;

      if (
        this.cell.canEat(target, Direction.BOTTOM_LEFT)?.x === target.x &&
        this.cell.canEat(target, Direction.BOTTOM_LEFT)?.y === target.y
      )
        return true;

      if (
        this.cell.canEat(target, Direction.BOTTOM)?.x === target.x &&
        this.cell.canEat(target, Direction.BOTTOM)?.y === target.y
      )
        return true;

      if (
        this.cell.canEat(target, Direction.BOTTOM_RIGHT)?.x === target.x &&
        this.cell.canEat(target, Direction.BOTTOM_RIGHT)?.y === target.y
      )
        return true;

      // if (
      //   target.y === this.cell.y + direction &&
      //   target.x === this.cell.x &&
      //   this.cell.board.getCell(target.x, target.y).isEmpty()
      // ) {
      //   return true;
      // }
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

      if (this.cell.isFortressAbility(target)) {
        return true;
      }
    }

    return false;
  }
}
