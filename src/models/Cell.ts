import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import { Board } from "./Board";
import { Direction } from "./Direction";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  infortress: boolean;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    inFortress: boolean,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.infortress = inFortress;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  isEmpty() {
    return this.figure === null;
  }

  canEat(target: Cell, direction: Direction): Cell | undefined {
    const areaFigureXForward = this.x - 1 < 0 ? this.x : this.x - 1;
    const areaFigureYForward = this.y - 1 < 0 ? this.y : this.y - 1;
    const areaFigureXBack = this.x + 1 > 6 ? this.x : this.x + 1;
    const areaFigureYBack = this.y + 1 > 13 ? this.y : this.y + 1;

    const areaFigureXForwardEmpty = this.x - 2 < 0 ? this.x : this.x - 2;
    const areaFigureYForwardEmpty = this.y - 2 < 0 ? this.y : this.y - 2;
    const areaFigureXBackEmpty = this.x + 2 > 6 ? this.x : this.x + 2;
    const areaFigureYBackEmpty = this.y + 2 > 13 ? this.y : this.y + 2;

    if (direction === Direction.TOP_LEFT) {
      if (
        !this.board.getCell(areaFigureXForward, areaFigureYForward).isEmpty() &&
        this.board.getCell(areaFigureXForward, areaFigureYForward).figure
          ?.color !== this.figure?.color
      ) {
        if (
          this.isEnemy(
            this.board.getCell(areaFigureXForward, areaFigureYForward)
          ) &&
          this.board
            .getCell(areaFigureXForwardEmpty, areaFigureYForwardEmpty)
            .isEmpty() &&
          this.board.getCell(areaFigureXForwardEmpty, areaFigureYForwardEmpty)
            .color !== Colors.FORTRESS &&
          this.board.getCell(areaFigureXForwardEmpty, areaFigureYForwardEmpty)
            .x !== this.x &&
          this.board.getCell(areaFigureXForwardEmpty, areaFigureYForwardEmpty)
            .y !== this.y
        ) {
          return this.board.getCell(
            areaFigureXForwardEmpty,
            areaFigureYForwardEmpty
          );
        }
      }
    }

    if (direction === Direction.TOP) {
      if (
        !this.board.getCell(this.x, areaFigureYForward).isEmpty() &&
        this.board.getCell(this.x, areaFigureYForward).figure?.color !==
          this.figure?.color
      ) {
        if (
          this.isEnemy(this.board.getCell(this.x, areaFigureYForward)) &&
          this.board.getCell(this.x, areaFigureYForwardEmpty).isEmpty() &&
          this.board.getCell(this.x, areaFigureYForwardEmpty).color !==
            Colors.FORTRESS &&
          this.board.getCell(this.x, areaFigureYForwardEmpty).y !== this.y
        ) {
          return this.board.getCell(this.x, areaFigureYForwardEmpty);
        }
      }
    }

    if (direction === Direction.TOP_RIGHT) {
      if (
        !this.board.getCell(areaFigureXBack, areaFigureYForward).isEmpty() &&
        this.board.getCell(areaFigureXBack, areaFigureYForward).figure
          ?.color !== this.figure?.color
      ) {
        if (
          this.isEnemy(
            this.board.getCell(areaFigureXBack, areaFigureYForward)
          ) &&
          this.board
            .getCell(areaFigureXBackEmpty, areaFigureYForwardEmpty)
            .isEmpty() &&
          this.board.getCell(areaFigureXBackEmpty, areaFigureYForwardEmpty)
            .color !== Colors.FORTRESS &&
          this.board.getCell(areaFigureXBackEmpty, areaFigureYForwardEmpty)
            .x !== this.x &&
          this.board.getCell(areaFigureXBackEmpty, areaFigureYForwardEmpty)
            .y !== this.y
        ) {
          return this.board.getCell(
            areaFigureXBackEmpty,
            areaFigureYForwardEmpty
          );
        }
      }
    }

    if (direction === Direction.LEFT) {
      if (
        !this.board.getCell(areaFigureXForward, this.y).isEmpty() &&
        this.board.getCell(areaFigureXForward, this.y).figure?.color !==
          this.figure?.color
      ) {
        if (
          this.isEnemy(this.board.getCell(areaFigureXForward, this.y)) &&
          this.board.getCell(areaFigureXForwardEmpty, this.y).isEmpty() &&
          this.board.getCell(areaFigureXForwardEmpty, this.y).color !==
            Colors.FORTRESS &&
          this.board.getCell(areaFigureXForwardEmpty, this.y).x !== this.x
        ) {
          return this.board.getCell(areaFigureXForwardEmpty, this.y);
        }
      }
    }

    if (direction === Direction.RIGHT) {
      if (
        !this.board.getCell(areaFigureXBack, this.y).isEmpty() &&
        this.board.getCell(areaFigureXBack, this.y).figure?.color !==
          this.figure?.color
      ) {
        if (
          this.isEnemy(this.board.getCell(areaFigureXBack, this.y)) &&
          this.board.getCell(areaFigureXBackEmpty, this.y).isEmpty() &&
          this.board.getCell(areaFigureXBackEmpty, this.y).color !==
            Colors.FORTRESS &&
          this.board.getCell(areaFigureXBackEmpty, this.y).x !== this.x
        ) {
          return this.board.getCell(areaFigureXBackEmpty, this.y);
        }
      }
    }

    if (direction === Direction.BOTTOM_LEFT) {
      if (
        !this.board.getCell(areaFigureXForward, areaFigureYBack).isEmpty() &&
        this.board.getCell(areaFigureXForward, areaFigureYBack).figure
          ?.color !== this.figure?.color
      ) {
        if (
          this.isEnemy(
            this.board.getCell(areaFigureXForward, areaFigureYBack)
          ) &&
          this.board
            .getCell(areaFigureXForwardEmpty, areaFigureYBackEmpty)
            .isEmpty() &&
          this.board.getCell(areaFigureXForwardEmpty, areaFigureYBackEmpty)
            .color !== Colors.FORTRESS &&
          this.board.getCell(areaFigureXForwardEmpty, areaFigureYBackEmpty)
            .x !== this.x &&
          this.board.getCell(areaFigureXForwardEmpty, areaFigureYBackEmpty)
            .y !== this.y
        ) {
          return this.board.getCell(
            areaFigureXForwardEmpty,
            areaFigureYBackEmpty
          );
        }
      }
    }

    if (direction === Direction.BOTTOM) {
      if (
        !this.board.getCell(this.x, areaFigureYBack).isEmpty() &&
        this.board.getCell(this.x, areaFigureYBack).figure?.color !==
          this.figure?.color
      ) {
        if (
          this.isEnemy(this.board.getCell(this.x, areaFigureYBack)) &&
          this.board.getCell(this.x, areaFigureYBackEmpty).isEmpty() &&
          this.board.getCell(this.x, areaFigureYBackEmpty).color !==
            Colors.FORTRESS &&
          this.board.getCell(this.x, areaFigureYBackEmpty).y !== this.y
        ) {
          // Логика чтобы шатра не вошла в свою крепость
          return this.board.getCell(this.x, areaFigureYBackEmpty);
        }
      }
    }

    if (direction === Direction.BOTTOM_RIGHT) {
      if (
        !this.board.getCell(areaFigureXBack, areaFigureYBack).isEmpty() &&
        this.board.getCell(areaFigureXBack, areaFigureYBack).figure?.color !==
          this.figure?.color
      ) {
        if (
          this.isEnemy(this.board.getCell(areaFigureXBack, areaFigureYBack)) &&
          this.board
            .getCell(areaFigureXBackEmpty, areaFigureYBackEmpty)
            .isEmpty() &&
          this.board.getCell(areaFigureXBackEmpty, areaFigureYBackEmpty)
            .color !== Colors.FORTRESS &&
          this.board.getCell(areaFigureXBackEmpty, areaFigureYBackEmpty).x !==
            this.x &&
          this.board.getCell(areaFigureXBackEmpty, areaFigureYBackEmpty).y !==
            this.y
        ) {
          return this.board.getCell(areaFigureXBackEmpty, areaFigureYBackEmpty);
        }
      }
    }
  }

  isEnemy(target: Cell): boolean {
    if (Boolean(target.figure)) {
      return this.figure?.color !== target.figure?.color;
    }

    return false;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiogonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if (absY !== absX) return false;

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
        return false;
    }

    return true;
  }

  isFortressAbility(target: Cell): Boolean {
    if (target.infortress) {
      console.log("This fortress enemy? ", target.x, target.y);
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

  addLostFigure(figure: Figure | null) {
    figure
      ? figure.color === Colors.BLACK
        ? this.board.lostBlackFigures.push(figure)
        : this.board.lostWhiteFigures.push(figure)
      : "";
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure?.canMove(target)) {
      this.figure?.moveFigure(target);

      if (
        this.figure.cell.canEat(target, Direction.TOP_LEFT) ||
        this.figure.cell.canEat(target, Direction.TOP_RIGHT) ||
        this.figure.cell.canEat(target, Direction.TOP) ||
        this.figure.cell.canEat(target, Direction.BOTTOM_LEFT) ||
        this.figure.cell.canEat(target, Direction.BOTTOM_RIGHT) ||
        this.figure.cell.canEat(target, Direction.BOTTOM) ||
        this.figure.cell.canEat(target, Direction.LEFT) ||
        this.figure.cell.canEat(target, Direction.RIGHT)
      ) {
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
        this.addLostFigure(eatFigure.figure);
        eatFigure.figure = null;
      }

      if (target.figure) {
        this.addLostFigure(target.figure);
      }
      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
