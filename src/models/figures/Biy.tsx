import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Direction } from "../Direction";
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

    if (!this.cell.board.canEatAbility(this.cell)) {
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
      ) {
        return true;
      }

      const directionTopRight =
        target.y === this.cell.y + direction && target.x === this.cell.x + 1;
      const directionTopLeft =
        target.y === this.cell.y + direction && target.x === this.cell.x - 1;
      const directionTop =
        target.y === this.cell.y + direction && target.x === this.cell.x;
      const directionBottom =
        target.y === this.cell.y - direction && target.x === this.cell.x;
      const directionLeft =
        target.y === this.cell.y && target.x === this.cell.x - 1;
      const directionRight =
        target.y === this.cell.y && target.x === this.cell.x + 1;
      const directionBottomLeft =
        target.y === this.cell.y - direction && target.x === this.cell.x - 1;
      const directionBottomRight =
        target.y === this.cell.y - direction && target.x === this.cell.x + 1;

      if (
        (this.cell.x === 3 && this.cell.y === 10) ||
        (this.cell.x === 3 && this.cell.y === 3)
      ) {
        if (this.cell.figure?.logo === "whiteBiy") {
          if (this.cell.board.checkFortressEmpty(Colors.WHITE)) {
            if (
              directionBottomRight ||
              directionBottomLeft ||
              directionLeft ||
              directionRight ||
              directionBottom ||
              directionTop ||
              directionTopLeft ||
              directionTopRight
            ) {
              return true;
            }
          } else {
            if (
              directionLeft ||
              directionRight ||
              directionTop ||
              directionTopLeft ||
              directionTopRight
            ) {
              return true;
            }
          }
        }

        if (this.cell.figure?.logo === "blackBiy") {
          if (this.cell.board.checkFortressEmpty(Colors.BLACK)) {
            if (
              directionBottomRight ||
              directionBottomLeft ||
              directionLeft ||
              directionRight ||
              directionBottom ||
              directionTop ||
              directionTopLeft ||
              directionTopRight
            ) {
              return true;
            }
          } else {
            if (
              directionLeft ||
              directionRight ||
              directionTop ||
              directionTopLeft ||
              directionTopRight
            ) {
              return true;
            }
          }
        }
      } else {
        if (
          directionBottomRight ||
          directionBottomLeft ||
          directionLeft ||
          directionRight ||
          directionBottom ||
          directionTop ||
          directionTopLeft ||
          directionTopRight
        ) {
          return true;
        }
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
    } else {
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
      ) {
        return true;
      }
    }
    return false;
  }
}
