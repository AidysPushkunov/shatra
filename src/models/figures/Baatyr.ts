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
    const canEatBaatyrEffectTop = this.cell.canEatBaatyr(target, Direction.TOP);
    const canEatBaatyrEffectBottom = this.cell.canEatBaatyr(
      target,
      Direction.BOTTOM
    );

    console.log("Perfect you are billioner", canEatBaatyrEffectBottom);

    if (true) {
      const canEatBaatyrTop = this.cell.canEatBaatyr(target, Direction.TOP);
      const canEatBaatyrBottom = this.cell.canEatBaatyr(
        target,
        Direction.BOTTOM
      );
      const canEatBaatyrLeft = this.cell.canEatBaatyr(target, Direction.LEFT);
      const canEatBaatyrRight = this.cell.canEatBaatyr(target, Direction.RIGHT);

      if (canEatBaatyrTop) {
        for (let i = canEatBaatyrTop.y; i >= 0; i--) {
          if (canEatBaatyrTop.x === target.x && i === target.y) return true;
        }
      }

      if (canEatBaatyrLeft) {
        for (let i = canEatBaatyrLeft.x; i >= 0; i--) {
          if (i === target.x && canEatBaatyrLeft.y === target.y) return true;
        }
      }

      if (canEatBaatyrRight) {
        for (let i = canEatBaatyrRight.x; i <= 6; i++) {
          if (i === target.x && canEatBaatyrRight.y === target.y) return true;
        }
      }

      if (canEatBaatyrBottom) {
        for (let i = canEatBaatyrBottom.y; i <= 13; i++) {
          console.log("Can eat baatyr bottom: ", canEatBaatyrBottom);
          if (canEatBaatyrBottom.x === target.x && i === target.y) return true;
        }
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
