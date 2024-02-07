import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Direction } from "../Direction";
import { Figure, FigureNames } from "./Figure";

export class Shatra extends Figure {
  biyRules: boolean;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? "blackShatra" : "whiteShatra";
    this.name = FigureNames.SHATRA;
    this.biyRules = false;
  }

  setBiyRules(active: boolean): void {
    this.biyRules = active;
  }

  isFirstStep: boolean = true;

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

    if (
      (this.cell.x === 3 && this.cell.y === 3) ||
      (this.cell.x === 3 && this.cell.y === 10)
    ) {
      this.setBiyRules(true);
    } else {
      this.setBiyRules(false);
    }

    if (this.biyRules) {
      if (this.cell.board.canEatAbility(this.cell)) {
        if (
          this.cell.canEat(this.cell, Direction.TOP_LEFT)?.x === target.x &&
          this.cell.canEat(this.cell, Direction.TOP_LEFT)?.y === target.y
        )
          return true;

        if (
          this.cell.canEat(this.cell, Direction.TOP)?.x === target.x &&
          this.cell.canEat(this.cell, Direction.TOP)?.y === target.y
        )
          return true;

        if (
          this.cell.canEat(this.cell, Direction.TOP_RIGHT)?.x === target.x &&
          this.cell.canEat(this.cell, Direction.TOP_RIGHT)?.y === target.y
        )
          return true;

        if (
          this.cell.canEat(this.cell, Direction.LEFT)?.x === target.x &&
          this.cell.canEat(this.cell, Direction.LEFT)?.y === target.y
        )
          return true;

        if (
          this.cell.canEat(this.cell, Direction.RIGHT)?.x === target.x &&
          this.cell.canEat(this.cell, Direction.RIGHT)?.y === target.y
        )
          return true;

        if (
          this.cell.canEat(this.cell, Direction.BOTTOM_LEFT)?.x === target.x &&
          this.cell.canEat(this.cell, Direction.BOTTOM_LEFT)?.y === target.y
        )
          return true;

        if (
          this.cell.canEat(this.cell, Direction.BOTTOM)?.x === target.x &&
          this.cell.canEat(this.cell, Direction.BOTTOM)?.y === target.y
        )
          return true;

        if (
          this.cell.canEat(this.cell, Direction.BOTTOM_RIGHT)?.x === target.x &&
          this.cell.canEat(this.cell, Direction.BOTTOM_RIGHT)?.y === target.y
        )
          return true;

        if (
          (target.y === this.cell.y + direction &&
            target.x === this.cell.x + 1) ||
          (target.y === this.cell.y + direction &&
            target.x === this.cell.x - 1) ||
          (target.y === this.cell.y && target.x === this.cell.x - 1) ||
          (target.y === this.cell.y && target.x === this.cell.x + 1) ||
          (target.y === this.cell.y + direction && target.x === this.cell.x) ||
          (target.y === this.cell.y - direction && target.x === this.cell.x) ||
          (target.y === this.cell.y - direction &&
            target.x === this.cell.x - 1) ||
          (target.y === this.cell.y - direction && target.x === this.cell.x + 1)
        ) {
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
        return false;
      } else {
        if (
          (target.y === this.cell.y + direction &&
            target.x === this.cell.x + 1) ||
          (target.y === this.cell.y + direction &&
            target.x === this.cell.x - 1) ||
          (target.y === this.cell.y && target.x === this.cell.x - 1) ||
          (target.y === this.cell.y && target.x === this.cell.x + 1) ||
          (target.y === this.cell.y + direction && target.x === this.cell.x) ||
          (target.y === this.cell.y - direction && target.x === this.cell.x) ||
          (target.y === this.cell.y - direction &&
            target.x === this.cell.x - 1) ||
          (target.y === this.cell.y - direction && target.x === this.cell.x + 1)
        ) {
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
        return false;
      }
    } else {
      if (this.cell.board.canEatAbility(this.cell)) {
        const lastCanEatCell = findLastCanEatCell(this.cell, target);

        if (lastCanEatCell?.x === target.x && lastCanEatCell?.y === target.y) {
          return true;
        }
      } else {
        if (
          this.cell.isFortressAbility(this.cell) &&
          this.cell.figure?.color === Colors.WHITE
            ? this.cell.y >= 10
            : this.cell.y <= 3
        ) {
          if (
            this.cell.figure?.color === Colors.WHITE
              ? this.cell.board
                  .getCell(this.cell.x - 1, this.cell.y)
                  .isEmpty() &&
                this.cell.board
                  .getCell(this.cell.x + 2, this.cell.y - 1)
                  .isEmpty()
              : this.cell.board
                  .getCell(this.cell.x + 1, this.cell.y)
                  .isEmpty() &&
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
    }
    return false;
  }
}

function findLastCanEatCell(cell: Cell, target: Cell): Cell | null {
  if (!cell.board.canEatAbility(cell)) {
    return null;
  }

  let lastCanEatCell = null;

  for (const dir of [
    Direction.TOP_LEFT,
    Direction.TOP,
    Direction.TOP_RIGHT,
    Direction.LEFT,
    Direction.RIGHT,
    Direction.BOTTOM_LEFT,
    Direction.BOTTOM,
    Direction.BOTTOM_RIGHT,
  ]) {
    const targetCell = cell.canEat(cell, dir);

    if (targetCell?.x === target.x && targetCell?.y === target.y) {
      lastCanEatCell = targetCell;
    }

    const recursiveResult: Cell | null = targetCell
      ? findLastCanEatCell(targetCell, target)
      : null;

    if (recursiveResult) {
      lastCanEatCell = recursiveResult;
    }
  }

  return lastCanEatCell;
}
