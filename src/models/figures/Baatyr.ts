import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Direction } from "../Direction";
import { Figure, FigureNames } from "./Figure";

export class Baatyr extends Figure {
  biyRules: boolean;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? "blackBaatyr" : "whiteBaatyr";
    this.name = FigureNames.BAATYR;
    this.biyRules = false;
  }

  setBiyRules(active: boolean): void {
    this.biyRules = active;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    if (
      (this.cell.x === 3 && this.cell.y === 3) ||
      (this.cell.x === 3 && this.cell.y === 10)
    ) {
      this.setBiyRules(true);
    } else {
      this.setBiyRules(false);
    }


    function isFortress(cell: any) {
      return cell.figure === null && cell.color === "fortress";
    }

    function isTargetCell(cell: any, target: any) {
      return cell.x === target.x && cell.y === target.y;
    }

    if (this.cell.board.canEatAbilityBaatyr(this.cell)) {

      const directions: Direction[] = [
        Direction.TOP,
        Direction.TOP_LEFT,
        Direction.BOTTOM_LEFT,
        Direction.BOTTOM_RIGHT,
        Direction.TOP_RIGHT,
        Direction.LEFT,
        Direction.RIGHT,
        Direction.BOTTOM,
      ];

      for (const direction of directions) {
        const canEatBaatyr = this.cell.canEatBaatyr(target, direction);



        if (Boolean(canEatBaatyr) && canEatBaatyr) {
          let x = canEatBaatyr.x;
          let y = canEatBaatyr.y;
          let collisionFortress = false;

          while (x >= 0 && x <= 6 && y >= 0 && y <= 13 && !collisionFortress) {
            const cell = this.cell.board.getCell(x, y);

            if (isFortress(cell)) {
              collisionFortress = true;
            }

            if (!isFortress(cell) && isTargetCell(cell, target)) {
              return true;
            }

            x += direction === Direction.LEFT ? -1 : 1;
            y += direction === Direction.TOP ? -1 : 1;
          }
        }
      }
    } else {
      if (this.cell.isEmptyVertical(target)) {
        return true;
      }
      if (this.cell.isEmptyHorizontal(target)) {
        return true;
      }
      if (this.cell.isEmptyDiagonal(target)) {
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

