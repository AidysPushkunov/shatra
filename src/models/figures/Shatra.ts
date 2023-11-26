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

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

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

    // if (this.cell.canEat(target)) {
    //   // let areaFigureXForward =
    //   //   this.cell.x + 1 > 6 ? this.cell.x : this.cell.x + 1;
    //   // let areaFigureYForward =
    //   //   this.cell.y + 1 > 13 ? this.cell.y : this.cell.y + 1;
    //   // let areaFigureXBack = this.cell.x - 1 < 0 ? this.cell.x : this.cell.x - 1;
    //   // let areaFigureYBack = this.cell.y - 1 < 0 ? this.cell.y : this.cell.y - 1;
    //   // left top diogonal
    //   // if (
    //   //   !this.cell.board
    //   //     .getCell(
    //   //       areaFigureXBack >= 0 && areaFigureXBack <= 6
    //   //         ? areaFigureXBack
    //   //         : this.cell.x,
    //   //       areaFigureYBack >= 0 && areaFigureYBack <= 13
    //   //         ? areaFigureYBack
    //   //         : this.cell.y
    //   //     )
    //   //     .isEmpty() &&
    //   //   this.cell.board.getCell(
    //   //     areaFigureXBack >= 0 && areaFigureXBack <= 6
    //   //       ? areaFigureXBack
    //   //       : this.cell.x,
    //   //     areaFigureYBack >= 0 && areaFigureYBack <= 13
    //   //       ? areaFigureYBack
    //   //       : this.cell.y
    //   //   ).figure?.color !== this.cell.figure?.color
    //   // ) {
    //   // if (this.cell.canEat(target) !== false)  {
    //   // }
    //   // }
    //   //right top diogonal
    //   // if (
    //   //   !this.cell.board
    //   //     .getCell(
    //   //       areaFigureXForward >= 0 && areaFigureXForward <= 6
    //   //         ? areaFigureXForward
    //   //         : this.cell.x,
    //   //       areaFigureYBack >= 0 && areaFigureYBack <= 13
    //   //         ? areaFigureYBack
    //   //         : this.cell.y
    //   //     )
    //   //     .isEmpty() &&
    //   //   this.cell.board.getCell(
    //   //     areaFigureXForward >= 0 && areaFigureXForward <= 6
    //   //       ? areaFigureXForward
    //   //       : this.cell.x,
    //   //     areaFigureYBack >= 0 && areaFigureYBack <= 13
    //   //       ? areaFigureYBack
    //   //       : this.cell.y
    //   //   ).figure?.color !== this.cell.figure?.color
    //   // ) {
    //   //   if (
    //   //     this.cell.x + eatFieldForward === target.x &&
    //   //     this.cell.y - eatFieldForward === target.y &&
    //   //     this.cell.board.getCell(target.x, target.y).isEmpty()
    //   //   )
    //   //     return true;
    //   // }
    //   // bottom left diogonal
    //   // if (
    //   //   !this.cell.board
    //   //     .getCell(
    //   //       areaFigureXBack >= 0 && areaFigureXBack <= 6
    //   //         ? areaFigureXBack
    //   //         : this.cell.x,
    //   //       areaFigureYForward >= 0 && areaFigureYForward <= 13
    //   //         ? areaFigureYForward
    //   //         : this.cell.y
    //   //     )
    //   //     .isEmpty() &&
    //   //   this.cell.board.getCell(
    //   //     areaFigureXBack >= 0 && areaFigureXBack <= 6
    //   //       ? areaFigureXBack
    //   //       : this.cell.x,
    //   //     areaFigureYForward >= 0 && areaFigureYForward <= 13
    //   //       ? areaFigureYForward
    //   //       : this.cell.y
    //   //   ).figure?.color !== this.cell.figure?.color
    //   // ) {
    //   //   if (
    //   //     this.cell.x - eatFieldForward === target.x &&
    //   //     this.cell.y + eatFieldForward === target.y &&
    //   //     this.cell.board.getCell(target.x, target.y).isEmpty()
    //   //   )
    //   //     return true;
    //   // }
    //   //right bottom diogonal
    //   // if (
    //   //   !this.cell.board
    //   //     .getCell(
    //   //       areaFigureXForward >= 0 && areaFigureXForward <= 6
    //   //         ? areaFigureXForward
    //   //         : this.cell.x,
    //   //       areaFigureYForward >= 0 && areaFigureYForward <= 13
    //   //         ? areaFigureYForward
    //   //         : this.cell.y
    //   //     )
    //   //     .isEmpty() &&
    //   //   this.cell.board.getCell(
    //   //     areaFigureXForward >= 0 && areaFigureXForward <= 6
    //   //       ? areaFigureXForward
    //   //       : this.cell.x,
    //   //     areaFigureYForward >= 0 && areaFigureYForward <= 13
    //   //       ? areaFigureYForward
    //   //       : this.cell.y
    //   //   ).figure?.color !== this.cell.figure?.color
    //   // ) {
    //   //   if (
    //   //     this.cell.x + eatFieldForward === target.x &&
    //   //     this.cell.y + eatFieldForward === target.y &&
    //   //     this.cell.board.getCell(target.x, target.y).isEmpty()
    //   //   )
    //   //     return true;
    //   // }
    //   // bottom
    //   // if (
    //   //   !this.cell.board
    //   //     .getCell(
    //   //       this.cell.x,
    //   //       areaFigureYForward >= 0 && areaFigureYForward <= 13
    //   //         ? areaFigureYForward
    //   //         : this.cell.y
    //   //     )
    //   //     .isEmpty() &&
    //   //   this.cell.board.getCell(
    //   //     this.cell.x,
    //   //     areaFigureYForward >= 0 && areaFigureYForward <= 13
    //   //       ? areaFigureYForward
    //   //       : this.cell.y
    //   //   ).figure?.color !== this.cell.figure?.color
    //   // ) {
    //   //   if (
    //   //     this.cell.x === target.x &&
    //   //     this.cell.y + eatFieldForward === target.y &&
    //   //     this.cell.board.getCell(target.x, target.y).isEmpty()
    //   //   )
    //   //     return true;
    //   // }
    //   // right
    //   // if (
    //   //   !this.cell.board
    //   //     .getCell(
    //   //       areaFigureXForward >= 0 && areaFigureXForward <= 6
    //   //         ? areaFigureXForward
    //   //         : this.cell.x,
    //   //       this.cell.y
    //   //     )
    //   //     .isEmpty() &&
    //   //   this.cell.board.getCell(
    //   //     areaFigureXForward >= 0 && areaFigureXForward <= 6
    //   //       ? areaFigureXForward
    //   //       : this.cell.x,
    //   //     this.cell.y
    //   //   ).figure?.color !== this.cell.figure?.color
    //   // ) {
    //   //   if (
    //   //     this.cell.x + eatFieldForward === target.x &&
    //   //     this.cell.y === target.y &&
    //   //     this.cell.board.getCell(target.x, target.y).isEmpty()
    //   //   )
    //   //     return true;
    //   // }
    //   // left
    //   // if (
    //   //   !this.cell.board
    //   //     .getCell(
    //   //       areaFigureXBack >= 0 && areaFigureXBack <= 6
    //   //         ? areaFigureXBack
    //   //         : this.cell.x,
    //   //       this.cell.y
    //   //     )
    //   //     .isEmpty() &&
    //   //   this.cell.board.getCell(
    //   //     areaFigureXBack >= 0 && areaFigureXBack <= 6
    //   //       ? areaFigureXBack
    //   //       : this.cell.x,
    //   //     this.cell.y
    //   //   ).figure?.color !== this.cell.figure?.color
    //   // ) {
    //   //   if (
    //   //     this.cell.x - eatFieldForward === target.x &&
    //   //     this.cell.y === target.y &&
    //   //     this.cell.board.getCell(target.x, target.y).isEmpty()
    //   //   )
    //   //     return true;
    //   // }
    //   // top
    //   //   if (
    //   //     !this.cell.board
    //   //       .getCell(
    //   //         this.cell.x,
    //   //         areaFigureYBack >= 0 && areaFigureYBack <= 13
    //   //           ? areaFigureYBack
    //   //           : this.cell.y
    //   //       )
    //   //       .isEmpty() &&
    //   //     this.cell.board.getCell(
    //   //       this.cell.x,
    //   //       areaFigureYBack >= 0 && areaFigureYBack <= 13
    //   //         ? areaFigureYBack
    //   //         : this.cell.y
    //   //     ).figure?.color !== this.cell.figure?.color
    //   //   ) {
    //   //     if (
    //   //       this.cell.x === target.x &&
    //   //       this.cell.y - eatFieldForward === target.y &&
    //   //       this.cell.board.getCell(target.x, target.y).isEmpty()
    //   //     )
    //   //       return true;
    //   //   }
    //   //   return false;
    // }

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
