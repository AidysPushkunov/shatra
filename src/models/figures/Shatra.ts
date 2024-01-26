import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Direction } from "../Direction";
import { Figure, FigureNames } from "./Figure";

export class Shatra extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? "blackShatra" : "whiteShatra";
    this.name = FigureNames.SHATRA;
  }

  isFirstStep: boolean = true;

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
      ) {
        return true;
      }
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
    } else {
      if (
        this.cell.isFortressAbility(this.cell) &&
        this.cell.figure?.color === Colors.WHITE
          ? this.cell.y >= 10
          : this.cell.y <= 3
      ) {
        if (
          this.cell.figure?.color === Colors.WHITE
            ? this.cell.board.getCell(this.cell.x - 1, this.cell.y).isEmpty() &&
              this.cell.board
                .getCell(this.cell.x + 2, this.cell.y - 1)
                .isEmpty()
            : this.cell.board.getCell(this.cell.x + 1, this.cell.y).isEmpty() &&
              this.cell.board
                .getCell(this.cell.x - 2, this.cell.y + 1)
                .isEmpty()
        ) {
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
        }

        return false;
      } else {
        if (!this.cell.board.canEatAbilityWithBiy(this.cell)) {
          if (
            (target.y === this.cell.y + direction &&
              target.x === this.cell.x + 1) ||
            (target.y === this.cell.y + direction &&
              target.x === this.cell.x - 1) ||
            (target.y === this.cell.y && target.x === this.cell.x - 1) ||
            (target.y === this.cell.y && target.x === this.cell.x + 1) ||
            (target.y === this.cell.y + direction &&
              target.x === this.cell.x) ||
            (((target.y === this.cell.y - direction &&
              target.x === this.cell.x) ||
              (target.y === this.cell.y - direction &&
                target.x === this.cell.x - 1) ||
              (target.y === this.cell.y - direction &&
                target.x === this.cell.x + 1)) &&
              this.cell.isEnemy(target))
          ) {
            return true;
          }
        }
        if (this.cell.isFortressAbility(this.cell)) {
          if (this.cell.figure?.color === Colors.WHITE && this.cell.y <= 3) {
            for (let i = 4; i <= 6; i++) {
              for (let j = 0; j <= 6; j++) {
                if (target.x === j && target.y === i) return true;
              }
            }
          }

          if (this.cell.figure?.color === Colors.BLACK && this.cell.y >= 10) {
            for (let i = 7; i <= 9; i++) {
              for (let j = 0; j <= 6; j++) {
                if (target.x === j && target.y === i) return true;
              }
            }
          }

          return false;
        }
      }
    }
    return false;
  }
}
