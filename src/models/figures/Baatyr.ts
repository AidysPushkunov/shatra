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

    if (this.cell.board.canEatAbilityBaatyr(this.cell)) {
      const canEatBaatyrTop = this.cell.canEatBaatyr(target, Direction.TOP);
      const canEatBaatyrTopLeft = this.cell.canEatBaatyr(
        target,
        Direction.TOP_LEFT
      );
      const canEatBaatyrBottomLeft = this.cell.canEatBaatyr(
        target,
        Direction.BOTTOM_LEFT
      );
      const canEatBaatyrBottomRight = this.cell.canEatBaatyr(
        target,
        Direction.BOTTOM_RIGHT
      );
      const canEatBaatyrTopRight = this.cell.canEatBaatyr(
        target,
        Direction.TOP_RIGHT
      );
      const canEatBaatyrBottom = this.cell.canEatBaatyr(
        target,
        Direction.BOTTOM
      );
      const canEatBaatyrLeft = this.cell.canEatBaatyr(target, Direction.LEFT);
      const canEatBaatyrRight = this.cell.canEatBaatyr(target, Direction.RIGHT);

      if (canEatBaatyrTop) {
        let collisionFortress: Boolean = false;

        for (let i = canEatBaatyrTop.y; i >= 0; i--) {
          if (collisionFortress) continue;
          if (
            this.cell.board.getCell(canEatBaatyrTop.x, i).color === "fortress"
          )
            collisionFortress = true;

          if (
            this.cell.board.getCell(canEatBaatyrTop.x, i).figure === null &&
            this.cell.board.getCell(canEatBaatyrTop.x, i).color !== "fortress"
          ) {
            if (canEatBaatyrTop.x === target.x && i === target.y) {
              return true;
            }
          }
        }
      }

      if (canEatBaatyrTopLeft) {
        let collisionFortress: Boolean = false;

        let x = canEatBaatyrTopLeft.x;
        let y = canEatBaatyrTopLeft.y;

        while (x >= 0 && y >= 0) {
          if (collisionFortress) continue;

          if (this.cell.board.getCell(x, y).color === "fortress") {
            collisionFortress = true;
          }

          if (
            this.cell.board.getCell(x, y).figure === null &&
            this.cell.board.getCell(x, y).color !== "fortress"
          ) {
            if (x === target.x && y === target.y) {
              return true;
            }
          }
          x--;
          y--;
        }
      }

      if (canEatBaatyrBottomLeft) {
        let collisionFortress: Boolean = false;
        let x = canEatBaatyrBottomLeft.x;
        let y = canEatBaatyrBottomLeft.y;

        while (x >= 0 && y <= 13) {
          if (collisionFortress) continue;

          if (this.cell.board.getCell(x, y).color === "fortress") {
            collisionFortress = true;
          }

          if (
            this.cell.board.getCell(x, y).figure === null &&
            this.cell.board.getCell(x, y).color !== "fortress"
          ) {
            if (x === target.x && y === target.y) {
              return true;
            }
          }
          x--;
          y++;
        }
      }

      if (canEatBaatyrBottomRight) {
        let collisionFortress: Boolean = false;
        let x = canEatBaatyrBottomRight.x;
        let y = canEatBaatyrBottomRight.y;

        while (x <= 6 && y <= 13) {
          if (collisionFortress) continue;

          if (this.cell.board.getCell(x, y).color === "fortress") {
            collisionFortress = true;
          }

          if (
            this.cell.board.getCell(x, y).figure === null &&
            this.cell.board.getCell(x, y).color !== "fortress"
          ) {
            if (x === target.x && y === target.y) {
              return true;
            }
          }
          x++;
          y++;
        }
      }

      if (canEatBaatyrTopRight) {
        let collisionFortress: Boolean = false;
        let x = canEatBaatyrTopRight.x;
        let y = canEatBaatyrTopRight.y;

        while (x <= 6 && y >= 0) {
          if (collisionFortress) continue;

          if (this.cell.board.getCell(x, y).color === "fortress") {
            collisionFortress = true;
          }

          if (
            this.cell.board.getCell(x, y).figure === null &&
            this.cell.board.getCell(x, y).color !== "fortress"
          ) {
            if (x === target.x && y === target.y) {
              return true;
            }
          }
          x++;
          y--;
        }
      }

      if (canEatBaatyrLeft) {
        let collisionFortress: Boolean = false;

        for (let i = canEatBaatyrLeft.x; i >= 0; i--) {
          if (collisionFortress) continue;

          if (
            this.cell.board.getCell(i, canEatBaatyrLeft.y).color === "fortress"
          ) {
            collisionFortress = true;
          }

          if (
            this.cell.board.getCell(i, canEatBaatyrLeft.y).figure === null &&
            this.cell.board.getCell(i, canEatBaatyrLeft.y).color !== "fortress"
          ) {
            if (i === target.x && canEatBaatyrLeft.y === target.y) {
              return true;
            }
          }
        }
      }

      if (canEatBaatyrRight) {
        let collisionFortress: Boolean = false;

        for (let i = canEatBaatyrRight.x; i <= 6; i++) {
          if (collisionFortress) continue;

          if (
            this.cell.board.getCell(i, canEatBaatyrRight.y).color === "fortress"
          ) {
            collisionFortress = true;
          }

          if (
            this.cell.board.getCell(i, canEatBaatyrRight.y).figure === null &&
            this.cell.board.getCell(i, canEatBaatyrRight.y).color !== "fortress"
          ) {
            if (i === target.x && canEatBaatyrRight.y === target.y) {
              return true;
            }
          }
        }
      }

      if (canEatBaatyrBottom) {
        let collisionFortress: Boolean = false;

        for (let i = canEatBaatyrBottom.y; i <= 13; i++) {
          if (collisionFortress) continue;

          if (
            this.cell.board.getCell(canEatBaatyrBottom.x, i).color ===
            "fortress"
          ) {
            collisionFortress = true;
          }

          if (
            this.cell.board.getCell(canEatBaatyrBottom.x, i).figure === null &&
            this.cell.board.getCell(canEatBaatyrBottom.x, i).color !==
              "fortress"
          ) {
            if (canEatBaatyrBottom.x === target.x && i === target.y) {
              return true;
            }
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
