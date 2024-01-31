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
      const lastCanEatCell = findLastCanEatCell(this.cell, target);

      console.log("lastCanEatCell: ", lastCanEatCell);

      if (lastCanEatCell?.x === target.x && lastCanEatCell?.y === target.y) {
        return true;
      }

      // for (const dir of [
      //   Direction.TOP_LEFT,
      //   Direction.TOP,
      //   Direction.TOP_RIGHT,
      //   Direction.LEFT,
      //   Direction.RIGHT,
      //   Direction.BOTTOM_LEFT,
      //   Direction.BOTTOM,
      //   Direction.BOTTOM_RIGHT,
      // ]) {
      //   const targetCell = this.cell.canEat(this.cell, dir);

      //   if (targetCell?.x === target.x && targetCell?.y === target.y) {
      //     return true;
      //   }
      // }
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

// переместить проверку на вражескую фигуру сюда убрать из canEat...

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
      // Если найдена ячейка target, обновляем lastCanEatCell
      lastCanEatCell = targetCell;
    }

    // Рекурсивный вызов для проверки следующей ячейки
    const recursiveResult: Cell | null = targetCell
      ? findLastCanEatCell(targetCell, target)
      : null;

    if (recursiveResult) {
      // Если в рекурсивном вызове была найдена ячейка, обновляем lastCanEatCell
      lastCanEatCell = recursiveResult;
    }
  }

  return lastCanEatCell;
}
