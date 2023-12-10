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

    if (canEatBaatyrEffectBottom || canEatBaatyrEffectTop) {
      const canEatBaatyrTop = this.cell.canEatBaatyr(target, Direction.TOP);
      const canEatBaatyrBottom = this.cell.canEatBaatyr(
        target,
        Direction.BOTTOM
      );

      // console.log("canEatBaatyrTop", canEatBaatyrTop);
      // console.log("target", this.cell);

      if (canEatBaatyrTop) {
        const min = Math.min(target.y);
        // разобратся почему так происходит
        for (let i = canEatBaatyrTop.y; i >= 0; i--) {
          // console.log(
          //   "This is strange code: ",
          //   this.cell.board.getCell(this.cell.x, i).color !== Colors.FORTRESS
          // );

          // if (this.cell.board.getCell(target.x, i))
          if (
            canEatBaatyrTop.x === target.x &&
            canEatBaatyrTop.y - i === target.y
          )
            // if (
            //   this.cell.board.getCell(canEatBaatyrTop.x, i).color !==
            //   Colors.FORTRESS
            // ) {
            //   return false;
            // }
            return true;
        }
      }

      if (canEatBaatyrBottom) {
        for (let i = canEatBaatyrBottom.y; i <= 13; i++) {
          // console.log("This is strange code: ", canEatBaatyrBottom.y);

          // if (this.cell.board.getCell(target.x, i))
          if (
            canEatBaatyrBottom.x === target.x &&
            canEatBaatyrBottom.y + 1 === target.y
          )
            // if (
            //   this.cell.board.getCell(canEatBaatyrTop.x, i).color !==
            //   Colors.FORTRESS
            // ) {
            //   return false;
            // }
            return true;
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
