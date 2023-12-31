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
            this.cell.board.getCell(
              canEatBaatyrTop.x,
              canEatBaatyrTop.y - 1 > 0
                ? canEatBaatyrTop.y - 1
                : canEatBaatyrTop.y
            ).color === "fortress"
          )
            collisionFortress = true;

          if (
            this.cell.board.getCell(
              canEatBaatyrTop.x,
              canEatBaatyrTop.y - 1 > 0
                ? canEatBaatyrTop.y - 1
                : canEatBaatyrTop.y
            ).color !== "fortress"
          ) {
            if (canEatBaatyrTop.x === target.x && i === target.y) {
              return true;
            }
          }
        }
      }

      if (canEatBaatyrTopLeft) {
        let x = canEatBaatyrTopLeft.x;
        let y = canEatBaatyrTopLeft.y;

        while (x >= 0 && y >= 0) {
          if (
            this.cell.board.getCell(
              canEatBaatyrTopLeft.x - 1 > 0
                ? canEatBaatyrTopLeft.x - 1
                : canEatBaatyrTopLeft.x,
              canEatBaatyrTopLeft.y - 1 > 0
                ? canEatBaatyrTopLeft.y - 1
                : canEatBaatyrTopLeft.y
            ).figure === null &&
            this.cell.board.getCell(
              canEatBaatyrTopLeft.x - 1 > 0
                ? canEatBaatyrTopLeft.x - 1
                : canEatBaatyrTopLeft.x,
              canEatBaatyrTopLeft.y - 1 > 0
                ? canEatBaatyrTopLeft.y - 1
                : canEatBaatyrTopLeft.y
            ).color !== "fortress"
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
        let x = canEatBaatyrBottomLeft.x;
        let y = canEatBaatyrBottomLeft.y;

        while (x >= 0 && y <= 13) {
          if (
            this.cell.board.getCell(
              canEatBaatyrBottomLeft.x - 1 > 0
                ? canEatBaatyrBottomLeft.x - 1
                : canEatBaatyrBottomLeft.x,
              canEatBaatyrBottomLeft.y + 1 < 13
                ? canEatBaatyrBottomLeft.y + 1
                : canEatBaatyrBottomLeft.y
            ).figure === null &&
            this.cell.board.getCell(
              canEatBaatyrBottomLeft.x - 1 > 0
                ? canEatBaatyrBottomLeft.x - 1
                : canEatBaatyrBottomLeft.x,
              canEatBaatyrBottomLeft.y + 1 < 13
                ? canEatBaatyrBottomLeft.y + 1
                : canEatBaatyrBottomLeft.y
            ).color !== "fortress"
          )
            if (x === target.x && y === target.y) {
              return true;
            }
          x--;
          y++;
        }
      }

      if (canEatBaatyrBottomRight) {
        let x = canEatBaatyrBottomRight.x;
        let y = canEatBaatyrBottomRight.y;

        while (x <= 6 && y <= 13) {
          if (
            this.cell.board.getCell(
              canEatBaatyrBottomRight.x + 1 < 6
                ? canEatBaatyrBottomRight.x + 1
                : canEatBaatyrBottomRight.x,
              canEatBaatyrBottomRight.y + 1 < 13
                ? canEatBaatyrBottomRight.y + 1
                : canEatBaatyrBottomRight.y
            ).figure === null &&
            this.cell.board.getCell(
              canEatBaatyrBottomRight.x + 1 < 6
                ? canEatBaatyrBottomRight.x + 1
                : canEatBaatyrBottomRight.x,
              canEatBaatyrBottomRight.y + 1 < 13
                ? canEatBaatyrBottomRight.y + 1
                : canEatBaatyrBottomRight.y
            ).color !== "fortress"
          )
            if (x === target.x && y === target.y) {
              return true;
            }
          x++;
          y++;
        }
      }

      if (canEatBaatyrTopRight) {
        let x = canEatBaatyrTopRight.x;
        let y = canEatBaatyrTopRight.y;

        while (x <= 6 && y >= 0) {
       
          if (
            this.cell.board.getCell(
              canEatBaatyrTopRight.x + 1 < 6
                ? canEatBaatyrTopRight.x + 1
                : canEatBaatyrTopRight.x,
              canEatBaatyrTopRight.y - 1 > 0
                ? canEatBaatyrTopRight.y - 1
                : canEatBaatyrTopRight.y
            ).figure === null &&
            this.cell.board.getCell(
              canEatBaatyrTopRight.x + 1 < 6
                ? canEatBaatyrTopRight.x + 1
                : canEatBaatyrTopRight.x,
              canEatBaatyrTopRight.y - 1 > 0
                ? canEatBaatyrTopRight.y - 1
                : canEatBaatyrTopRight.y
            ).color !== "fortress"
          )
            if (x === target.x && y === target.y) {
              return true;
            }
          x++;
          y--;
        }
      }

      if (canEatBaatyrLeft) {
        for (let i = canEatBaatyrLeft.x; i >= 0; i--) {
       

          if (
            this.cell.board.getCell(
              canEatBaatyrLeft.x - 1 > 0
                ? canEatBaatyrLeft.x - 1
                : canEatBaatyrLeft.x,
              canEatBaatyrLeft.y
            ).figure === null &&
            this.cell.board.getCell(
              canEatBaatyrLeft.x - 1 > 0
                ? canEatBaatyrLeft.x - 1
                : canEatBaatyrLeft.x,
              canEatBaatyrLeft.y
            ).color !== "fortress"
          )
            if (i === target.x && canEatBaatyrLeft.y === target.y) {

              return true;
            }
        }
      }

      if (canEatBaatyrRight) {
        for (let i = canEatBaatyrRight.x; i <= 6; i++) {

          if (
            this.cell.board.getCell(
              canEatBaatyrRight.x + 1 < 6
                ? canEatBaatyrRight.x + 1
                : canEatBaatyrRight.x,
              canEatBaatyrRight.y
            ).figure === null &&
            this.cell.board.getCell(
              canEatBaatyrRight.x + 1 < 6
                ? canEatBaatyrRight.x + 1
                : canEatBaatyrRight.x,
              canEatBaatyrRight.y
            ).color !== "fortress"
          )
            if (i === target.x && canEatBaatyrRight.y === target.y) {
     
              return true;
            }
        }
      }

      if (canEatBaatyrBottom) {
        for (let i = canEatBaatyrBottom.y; i <= 13; i++) {

          if (
            this.cell.board.getCell(
              canEatBaatyrBottom.x,
              canEatBaatyrBottom.y + 1 < 13
                ? canEatBaatyrBottom.y + 1
                : canEatBaatyrBottom.y
            ).figure === null &&
            this.cell.board.getCell(
              canEatBaatyrBottom.x,
              canEatBaatyrBottom.y + 1 < 13
                ? canEatBaatyrBottom.y + 1
                : canEatBaatyrBottom.y
            ).color !== "fortress"
          )
            if (canEatBaatyrBottom.x === target.x && i === target.y) {
     
              return true;
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
