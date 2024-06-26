import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import { Board } from "./Board";
import { Direction } from "./Direction";
import { Baatyr } from "./figures/Baatyr";

let eatenFigures: any = [];
export class Cell {
  x: number;
  y: number;
  color: Colors;
  infortress: boolean;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number;
  eatFieldAttack: Boolean;
  coordinate: string;
  isBoardFlipped: boolean = false;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    inFortress: boolean,
    figure: Figure | null,
    coordinate: string
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.infortress = inFortress;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
    this.eatFieldAttack = false;
    this.coordinate = coordinate
  }

  changeFlippedBoard() {
    this.isBoardFlipped = !this.isBoardFlipped;
  }

  setEatFieldAttack(cell: Cell | null, activate: boolean): void {
    if (cell) {
      activate ? (cell.eatFieldAttack = true) : (cell.eatFieldAttack = false);
    }
  }

  isEmpty() {
    return this.figure === null;
  }

  canEatEmptyCell(
    areaFigureX: number,
    areaFigureY: number,
    areaFigureXEmpty: number,
    areaFigureYEmpty: number
  ): Cell | null {
    if (
      !this.board.getCell(areaFigureX, areaFigureY).isEmpty() &&
      !this.board.getCell(areaFigureX, areaFigureY).figure?.eaten &&
      this.board.getCell(areaFigureX, areaFigureY).figure?.color !==
      this.figure?.color &&
      this.isEnemy(this.board.getCell(areaFigureX, areaFigureY)) &&
      this.board.getCell(areaFigureXEmpty, areaFigureYEmpty).isEmpty() &&
      this.board.getCell(areaFigureXEmpty, areaFigureYEmpty).color !==
      Colors.FORTRESS
    ) {
      if (this.figure?.color === Colors.WHITE) {
        if (this.figure.logo === "whiteBiy" && areaFigureYEmpty < 10) {
          return this.board.getCell(areaFigureXEmpty, areaFigureYEmpty);
        } else {
          if (this.board.checkFortressEmpty(Colors.WHITE)) {
            return this.board.getCell(areaFigureXEmpty, areaFigureYEmpty);
          }
        }

        if (areaFigureYEmpty < 10 && this.figure.logo !== "whiteBiy") {
          return this.board.getCell(areaFigureXEmpty, areaFigureYEmpty);
        }
      }

      if (this.figure?.color === Colors.BLACK) {
        if (this.figure.logo === "blackBiy" && areaFigureYEmpty > 3) {
          return this.board.getCell(areaFigureXEmpty, areaFigureYEmpty);
        } else {
          if (this.board.checkFortressEmpty(Colors.BLACK)) {
            return this.board.getCell(areaFigureXEmpty, areaFigureYEmpty);
          }
        }

        if (areaFigureYEmpty > 3 && this.figure.logo !== "blackBiy") {
          return this.board.getCell(areaFigureXEmpty, areaFigureYEmpty);
        }
      }
    }
    this.setEatFieldAttack(null, false);
    return null;
  }

  canEat(target: Cell, direction: Direction): Cell | null {
    const areaFigureXForward = target.x - 1 < 0 ? null : target.x - 1;
    const areaFigureYForward = target.y - 1 < 0 ? null : target.y - 1;
    const areaFigureXBack = target.x + 1 > 6 ? null : target.x + 1;
    const areaFigureYBack = target.y + 1 > 13 ? null : target.y + 1;

    const areaFigureXForwardEmpty = target.x - 2 < 0 ? null : target.x - 2;
    const areaFigureYForwardEmpty = target.y - 2 < 0 ? null : target.y - 2;
    const areaFigureXBackEmpty = target.x + 2 > 6 ? null : target.x + 2;
    const areaFigureYBackEmpty = target.y + 2 > 13 ? null : target.y + 2;

    if (
      direction === Direction.TOP_LEFT &&
      areaFigureXForward !== null &&
      areaFigureYForward !== null &&
      areaFigureXForwardEmpty !== null &&
      areaFigureYForwardEmpty !== null
    ) {
      const emptyEatField = this.canEatEmptyCell(
        areaFigureXForward,
        areaFigureYForward,
        areaFigureXForwardEmpty,
        areaFigureYForwardEmpty
      );

      this.setEatFieldAttack(emptyEatField, true);

      return emptyEatField;
    }

    if (
      direction === Direction.TOP &&
      areaFigureYForward !== null &&
      areaFigureYForwardEmpty !== null
    ) {
      const emptyEatField = this.canEatEmptyCell(
        this.x,
        areaFigureYForward,
        this.x,
        areaFigureYForwardEmpty
      );

      this.setEatFieldAttack(emptyEatField, true);

      return emptyEatField;
    }

    if (
      direction === Direction.TOP_RIGHT &&
      areaFigureXBack !== null &&
      areaFigureYForward !== null &&
      areaFigureXBackEmpty !== null &&
      areaFigureYForwardEmpty !== null
    ) {
      const emptyEatField = this.canEatEmptyCell(
        areaFigureXBack,
        areaFigureYForward,
        areaFigureXBackEmpty,
        areaFigureYForwardEmpty
      );

      this.setEatFieldAttack(emptyEatField, true);

      return emptyEatField;
    }

    if (
      direction === Direction.LEFT &&
      areaFigureXForward !== null &&
      areaFigureXForwardEmpty !== null
    ) {
      const emptyEatField = this.canEatEmptyCell(
        areaFigureXForward,
        this.y,
        areaFigureXForwardEmpty,
        this.y
      );

      this.setEatFieldAttack(emptyEatField, true);

      return emptyEatField;
    }

    if (
      direction === Direction.RIGHT &&
      areaFigureXBack !== null &&
      areaFigureXBackEmpty !== null
    ) {
      const emptyEatField = this.canEatEmptyCell(
        areaFigureXBack,
        this.y,
        areaFigureXBackEmpty,
        this.y
      );

      this.setEatFieldAttack(emptyEatField, true);

      return emptyEatField;
    }

    if (
      direction === Direction.BOTTOM_LEFT &&
      areaFigureXForward !== null &&
      areaFigureYBack !== null &&
      areaFigureXForwardEmpty !== null &&
      areaFigureYBackEmpty !== null
    ) {
      const emptyEatField = this.canEatEmptyCell(
        areaFigureXForward,
        areaFigureYBack,
        areaFigureXForwardEmpty,
        areaFigureYBackEmpty
      );

      this.setEatFieldAttack(emptyEatField, true);

      return emptyEatField;
    }

    if (
      direction === Direction.BOTTOM &&
      areaFigureYBack !== null &&
      areaFigureYBackEmpty !== null
    ) {
      const emptyEatField = this.canEatEmptyCell(
        this.x,
        areaFigureYBack,
        this.x,
        areaFigureYBackEmpty
      );

      this.setEatFieldAttack(emptyEatField, true);

      return emptyEatField;
    }

    if (
      direction === Direction.BOTTOM_RIGHT &&
      areaFigureXBack !== null &&
      areaFigureYBack !== null &&
      areaFigureXBackEmpty !== null &&
      areaFigureYBackEmpty !== null
    ) {
      const emptyEatField = this.canEatEmptyCell(
        areaFigureXBack,
        areaFigureYBack,
        areaFigureXBackEmpty,
        areaFigureYBackEmpty
      );

      this.setEatFieldAttack(emptyEatField, true);

      return emptyEatField;
    }

    return null;
  }

  canEatBaatyrEmptyCell(target: Cell, direction: Direction) {
    const checkCell = (x: number, y: number) => {
      return this.board.getCell(x, y).figure;
    };

    const isValidCell = (x: number, y: number) => {
      return x >= 0 && x <= 6 && y >= 0 && y <= 13;
    };

    const checkDirection = (xIncrement: number, yIncrement: number) => {
      let x = target.x;
      let y = target.y;

      while (isValidCell(x, y)) {
        const currentCell = checkCell(x, y);

        if (currentCell?.color === "fortress") {
          return undefined;
        }

        if (currentCell?.color !== this.figure?.color && currentCell) {
          if (
            !isValidCell(x + xIncrement, y + yIncrement) ||
            checkCell(x + xIncrement, y + yIncrement)
          ) {
            return undefined;
          }

          return this.board.getCell(x, y);
        }

        x += xIncrement;
        y += yIncrement;
      }

      return undefined;
    };

    switch (direction) {
      case Direction.TOP:
        return checkDirection(0, -1);

      case Direction.TOP_LEFT:
        return checkDirection(-1, -1);

      case Direction.BOTTOM_LEFT:
        return checkDirection(-1, 1);

      case Direction.BOTTOM_RIGHT:
        return checkDirection(1, 1);

      case Direction.TOP_RIGHT:
        return checkDirection(1, -1);

      case Direction.LEFT:
        return checkDirection(-1, 0);

      case Direction.RIGHT:
        return checkDirection(1, 0);

      case Direction.BOTTOM:
        return checkDirection(0, 1);

      default:
        return undefined;
    }
  }

  canEatBaatyr(target: Cell, direction: Direction): Cell | undefined {
    if (direction === Direction.TOP) {
      return this.canEatBaatyrEmptyCell(target, direction);
    }

    if (direction === Direction.TOP_LEFT) {
      return this.canEatBaatyrEmptyCell(target, direction);
    }

    if (direction === Direction.BOTTOM_LEFT) {
      return this.canEatBaatyrEmptyCell(target, direction);
    }

    if (direction === Direction.BOTTOM_RIGHT) {
      return this.canEatBaatyrEmptyCell(target, direction);
    }

    if (direction === Direction.TOP_RIGHT) {
      return this.canEatBaatyrEmptyCell(target, direction);
    }

    if (direction === Direction.LEFT) {
      return this.canEatBaatyrEmptyCell(target, direction);
    }

    if (direction === Direction.RIGHT) {
      return this.canEatBaatyrEmptyCell(target, direction);
    }

    if (direction === Direction.BOTTOM) {
      return this.canEatBaatyrEmptyCell(target, direction);
    }
  }

  isEnemy(target: Cell): boolean {
    if (Boolean(target.figure)) {
      return this.figure?.color !== target.figure?.color;
    }

    return false;
  }

  isEmptyVertical(target: Cell) {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let y = min + 1; y < max; y++) {
      if (this.board.getCell(this.x, y).figure?.color === this.figure?.color) {
        return false;
      }

      if (
        this.board.getCell(this.x, y).figure !== null &&
        this.board.getCell(this.x, y + 1).figure !== null
      ) {
        return false;
      }

      if (this.board.getCell(this.x, y).color === "fortress") return;
    }

    return true;
  }

  isEmptyHorizontal(target: Cell) {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let x = min + 1; x < max; x++) {
      if (this.board.getCell(x, this.y).figure?.color === this.figure?.color) {
        return false;
      }

      if (
        this.board.getCell(x, this.y).figure !== null &&
        this.board.getCell(x + 1 < 6 ? x : x + 1, this.y).figure !== null
      ) {
        return false;
      }

      if (this.board.getCell(x, this.y).color === "fortress") return;
    }
    return true;
  }

  isEmptyDiagonal(target: Cell) {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if (absY !== absX) return false;

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (
        this.board.getCell(this.x + dx * i, this.y + dy * i).figure?.color ===
        this.figure?.color
      ) {
        return false;
      }

      if (
        this.board.getCell(this.x + dx * i, this.y + dy * i).figure !== null &&
        this.board.getCell(this.x + dx * i + dx, this.y + dy * i + dy)
          .figure !== null
      ) {
        return false;
      }

      if (
        this.board.getCell(this.x + dx * i, this.y + dy * i).color ===
        "fortress"
      ) {
        return;
      }
    }

    return true;
  }

  isFortressAbility(target: Cell): Boolean {
    if (target.infortress) {
      if (target.y >= 10) {
        return true;
      }

      if (target.y <= 3) {
        return true;
      }
    }
    return false;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  setBaatyr(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  addLostFigure(figure: Figure | null) {
    figure
      ? figure.color === Colors.BLACK
        ? this.board.lostBlackFigures.push(figure)
        : this.board.lostWhiteFigures.push(figure)
      : null;
  }

  moveFigure(target: Cell) {

    if (this.figure && this.figure?.canMove(target)) {
      this.figure?.moveFigure(target);
      if (
        this.figure?.color === Colors.WHITE ? target.y === 0 : target.y === 13
      ) {
        this.setBaatyr(
          new Baatyr(this.figure.color, this.board.getCell(target.x, target.y))
        );
      }
      if (
        this.figure.cell.canEat(this, Direction.TOP_LEFT) ||
        this.figure.cell.canEat(this, Direction.TOP_RIGHT) ||
        this.figure.cell.canEat(this, Direction.TOP) ||
        this.figure.cell.canEat(this, Direction.BOTTOM_LEFT) ||
        this.figure.cell.canEat(this, Direction.BOTTOM_RIGHT) ||
        this.figure.cell.canEat(this, Direction.BOTTOM) ||
        this.figure.cell.canEat(this, Direction.LEFT) ||
        this.figure.cell.canEat(this, Direction.RIGHT)
      ) {
        if (target.eatFieldAttack) {
          let x =
            target.x - this.figure.cell.x < 0
              ? target.x - this.figure.cell.x + 1
              : target.x - this.figure.cell.x - 1;
          let y =
            target.y - this.figure.cell.y < 0
              ? target.y - this.figure.cell.y + 1
              : target.y - this.figure.cell.y - 1;
          let eatFigure = this.board.getCell(
            target.x === this.figure.cell.x ? target.x : target.x - x,
            target.y === this.figure.cell.y ? target.y : target.y - y
          );

          eatFigure.figure?.changeOpacity(0.5);
          eatenFigures.push(eatFigure);

          setTimeout(() => {
            if (!this.board.canEatAbility(target)) {
              eatenFigures.map((eatenFigure: Cell) => {
                eatenFigure.figure = null;
              });

              eatenFigures = [];

              this.addLostFigure(eatFigure.figure);
            }
          }, 305);
        }
      }
      if (
        this.figure.logo === "blackBaatyr" ||
        this.figure.logo === "whiteBaatyr"
      ) {
        if (
          this.figure.cell.canEatBaatyr(target, Direction.TOP) ||
          this.figure.cell.canEatBaatyr(target, Direction.TOP_LEFT) ||
          this.figure.cell.canEatBaatyr(target, Direction.TOP_RIGHT) ||
          this.figure.cell.canEatBaatyr(target, Direction.LEFT) ||
          this.figure.cell.canEatBaatyr(target, Direction.RIGHT) ||
          this.figure.cell.canEatBaatyr(target, Direction.BOTTOM)
        ) {
          let eatFigureTop = this.figure.cell.canEatBaatyr(
            target,
            Direction.TOP
          );
          let eatFigureTopLeft = this.figure.cell.canEatBaatyr(
            target,
            Direction.TOP_LEFT
          );
          let eatFigureBottomLeft = this.figure.cell.canEatBaatyr(
            target,
            Direction.BOTTOM_LEFT
          );
          let eatFigureBottomRight = this.figure.cell.canEatBaatyr(
            target,
            Direction.BOTTOM_RIGHT
          );
          let eatFigureTopRight = this.figure.cell.canEatBaatyr(
            target,
            Direction.TOP_RIGHT
          );
          let eatFigureLeft = this.figure.cell.canEatBaatyr(
            target,
            Direction.LEFT
          );
          let eatFigureRight = this.figure.cell.canEatBaatyr(
            target,
            Direction.RIGHT
          );
          let eatFigureBottom = this.figure.cell.canEatBaatyr(
            target,
            Direction.BOTTOM
          );
          if (
            eatFigureTopLeft !== undefined &&
            Number(target.y) < Number(eatFigureTopLeft.figure?.cell.y) &&
            Number(target.x) < Number(eatFigureTopLeft.figure?.cell.x)
          ) {
            this.addLostFigure(eatFigureTopLeft.figure);
            eatFigureTopLeft.figure = null;
          }
          if (
            eatFigureBottomLeft !== undefined &&
            Number(target.y) > Number(eatFigureBottomLeft.figure?.cell.y) &&
            Number(target.x) < Number(eatFigureBottomLeft.figure?.cell.x)
          ) {
            this.addLostFigure(eatFigureBottomLeft.figure);
            eatFigureBottomLeft.figure = null;
          }
          if (
            eatFigureBottomRight !== undefined &&
            Number(target.y) > Number(eatFigureBottomRight.figure?.cell.y) &&
            Number(target.x) > Number(eatFigureBottomRight.figure?.cell.x)
          ) {
            this.addLostFigure(eatFigureBottomRight.figure);
            eatFigureBottomRight.figure = null;
          }
          if (
            eatFigureTopRight !== undefined &&
            Number(target.y) < Number(eatFigureTopRight.figure?.cell.y) &&
            Number(target.x) > Number(eatFigureTopRight.figure?.cell.x)
          ) {
            this.addLostFigure(eatFigureTopRight.figure);
            eatFigureTopRight.figure = null;
          }
          if (
            eatFigureTop !== undefined &&
            Number(target.x) === Number(eatFigureTop.figure?.cell.x)
          ) {
            this.addLostFigure(eatFigureTop.figure);
            eatFigureTop.figure = null;
          }
          if (
            eatFigureLeft !== undefined &&
            Number(target.y) === Number(eatFigureLeft.figure?.cell.y)
          ) {
            this.addLostFigure(eatFigureLeft.figure);
            eatFigureLeft.figure = null;
          }
          if (
            eatFigureRight !== undefined &&
            Number(target.y) === Number(eatFigureRight.figure?.cell.y)
          ) {
            this.addLostFigure(eatFigureRight.figure);
            eatFigureRight.figure = null;
          }
          if (
            eatFigureBottom !== undefined &&
            Number(target.x) === Number(eatFigureBottom.figure?.cell.x)
          ) {
            this.addLostFigure(eatFigureBottom.figure);
            eatFigureBottom.figure = null;
          }
        }
      }

      if (target.figure) {
        this.addLostFigure(target.figure);
      }
      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
