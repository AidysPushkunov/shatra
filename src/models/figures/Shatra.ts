import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

export class Shatra extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? "blackShatra" : "whiteShatra";
    this.name = FigureNames.SHATRA;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    let eatFieldForward = this.cell.figure?.color === Colors.WHITE ? 2 : -2;

    if (this.cell.canEat(target)) {
      let areaFigureXForward =
        this.cell.x + 1 > 6
          ? this.cell.x
          : this.cell.figure?.color === Colors.WHITE
          ? this.cell.x + 1
          : this.cell.x - 1;
      let areaFigureYForward =
        this.cell.y + 1 > 13
          ? this.cell.y
          : this.cell.figure?.color === Colors.WHITE
          ? this.cell.y + 1
          : this.cell.y - 1;
      let areaFigureXBack =
        this.cell.x - 1 < 0
          ? this.cell.x
          : this.cell.figure?.color === Colors.WHITE
          ? this.cell.x - 1
          : this.cell.x + 1;
      let areaFigureYBack =
        this.cell.y - 1 < 0
          ? this.cell.y
          : this.cell.figure?.color === Colors.WHITE
          ? this.cell.y - 1
          : this.cell.y + 1;

      // left top diogonal
      if (
        !this.cell.board
          .getCell(
            areaFigureXBack >= 0 && areaFigureXBack <= 6
              ? areaFigureXBack
              : this.cell.x,
            areaFigureYBack
          )
          .isEmpty() &&
        this.cell.board.getCell(
          areaFigureXBack >= 0 && areaFigureXBack <= 6
            ? areaFigureXBack
            : this.cell.x,
          areaFigureYForward >= 0 && areaFigureYForward <= 13
            ? areaFigureYForward
            : this.cell.y
        ).figure?.color !== this.cell.figure?.color
      ) {
        if (
          this.cell.x - eatFieldForward === target.x &&
          this.cell.y - eatFieldForward === target.y
        )
          return true;
      }

      // bottom left diogonal
      if (
        !this.cell.board
          .getCell(
            areaFigureXBack >= 0 && areaFigureXBack <= 6
              ? areaFigureXBack
              : this.cell.x,
            areaFigureYForward >= 0 && areaFigureYForward <= 13
              ? areaFigureYForward
              : this.cell.y
          )
          .isEmpty() &&
        this.cell.board.getCell(
          areaFigureXBack >= 0 && areaFigureXBack <= 6
            ? areaFigureXBack
            : this.cell.x,
          areaFigureYForward >= 0 && areaFigureYForward <= 13
            ? areaFigureYForward
            : this.cell.y
        ).figure?.color !== this.cell.figure?.color
      ) {
        if (
          this.cell.x - eatFieldForward === target.x &&
          this.cell.y + eatFieldForward === target.y
        )
          return true;
      }

      //right top diogonal
      if (
        !this.cell.board
          .getCell(
            areaFigureXForward >= 0 && areaFigureXForward <= 6
              ? areaFigureXForward
              : this.cell.x,
            areaFigureYBack >= 0 && areaFigureYBack <= 13
              ? areaFigureYBack
              : this.cell.y
          )
          .isEmpty() &&
        this.cell.board.getCell(
          areaFigureXForward >= 0 && areaFigureXForward <= 6
            ? areaFigureXForward
            : this.cell.x,
          areaFigureYBack >= 0 && areaFigureYBack <= 13
            ? areaFigureYBack
            : this.cell.y
        ).figure?.color !== this.cell.figure?.color
      ) {
        if (
          this.cell.x + eatFieldForward === target.x &&
          this.cell.y - eatFieldForward === target.y
        )
          return true;
      }

      //right bottom diogonal
      if (
        !this.cell.board
          .getCell(
            areaFigureXForward >= 0 && areaFigureXForward <= 6
              ? areaFigureXForward
              : this.cell.x,
            areaFigureYForward >= 0 && areaFigureYForward <= 13
              ? areaFigureYForward
              : this.cell.y
          )
          .isEmpty() &&
        this.cell.board.getCell(
          areaFigureXForward >= 0 && areaFigureXForward <= 6
            ? areaFigureXForward
            : this.cell.x,
          areaFigureYForward >= 0 && areaFigureYForward <= 13
            ? areaFigureYForward
            : this.cell.y
        ).figure?.color !== this.cell.figure?.color
      ) {
        if (
          this.cell.x + eatFieldForward === target.x &&
          this.cell.y + eatFieldForward === target.y
        )
          return true;
      }

      // bottom
      if (
        !this.cell.board
          .getCell(
            this.cell.x,
            areaFigureYForward >= 0 && areaFigureYForward <= 13
              ? areaFigureYForward
              : this.cell.y
          )
          .isEmpty() &&
        this.cell.board.getCell(
          this.cell.x,
          areaFigureYForward >= 0 && areaFigureYForward <= 13
            ? areaFigureYForward
            : this.cell.y
        ).figure?.color !== this.cell.figure?.color
      ) {
        if (
          this.cell.x === target.x &&
          this.cell.y + eatFieldForward === target.y
        )
          return true;
      }

      // right

      if (
        !this.cell.board
          .getCell(
            areaFigureXForward >= 0 && areaFigureXForward <= 6
              ? areaFigureXForward
              : this.cell.x,
            this.cell.y
          )
          .isEmpty() &&
        this.cell.board.getCell(
          areaFigureXForward >= 0 && areaFigureXForward <= 6
            ? areaFigureXForward
            : this.cell.x,
          this.cell.y
        ).figure?.color !== this.cell.figure?.color
      ) {
        if (
          this.cell.x + eatFieldForward === target.x &&
          this.cell.y === target.y
        )
          return true;
      }

      // left
      if (
        !this.cell.board
          .getCell(
            areaFigureXBack >= 0 && areaFigureXBack <= 6
              ? areaFigureXBack
              : this.cell.x,
            this.cell.y
          )
          .isEmpty() &&
        this.cell.board.getCell(
          areaFigureXBack >= 0 && areaFigureXBack <= 6
            ? areaFigureXBack
            : this.cell.x,
          this.cell.y
        ).figure?.color !== this.cell.figure?.color
      ) {
        if (
          this.cell.x - eatFieldForward === target.x &&
          this.cell.y === target.y
        )
          return true;
      }

      // top

      if (
        !this.cell.board
          .getCell(
            this.cell.x,
            areaFigureYBack >= 0 && areaFigureYBack <= 13
              ? areaFigureYBack
              : this.cell.y
          )
          .isEmpty() &&
        this.cell.board.getCell(
          this.cell.x,
          areaFigureYBack >= 0 && areaFigureYBack <= 13
            ? areaFigureYBack
            : this.cell.y
        ).figure?.color !== this.cell.figure?.color
      ) {
        if (
          this.cell.x === target.x &&
          this.cell.y - eatFieldForward === target.y
        )
          return true;
      }

      return false;
    }

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

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
