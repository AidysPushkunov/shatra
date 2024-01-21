import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import { Board } from "./Board";
import { Direction } from "./Direction";
import { Baatyr } from "./figures/Baatyr";

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

  canEatEmptyCell(
    areaFigureX: number,
    areaFigureY: number,
    areaFigureXEmpty: number,
    areaFigureYEmpty: number
  ) {
    if (
      !this.board.getCell(areaFigureX, areaFigureY).isEmpty() &&
      this.board.getCell(areaFigureX, areaFigureY).figure?.color !==
        this.figure?.color
    ) {
      if (
        this.isEnemy(this.board.getCell(areaFigureX, areaFigureY)) &&
        this.board.getCell(areaFigureXEmpty, areaFigureYEmpty).isEmpty() &&
        this.board.getCell(areaFigureXEmpty, areaFigureYEmpty).color !==
          Colors.FORTRESS
        // &&
        // this.board.getCell(areaFigureXEmpty, areaFigureYEmpty).x !== this.x &&
        // this.board.getCell(areaFigureXEmpty, areaFigureYEmpty).y !== this.y
      ) {
        return this.board.getCell(areaFigureXEmpty, areaFigureYEmpty);
      }
    }
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
      return this.canEatEmptyCell(
        areaFigureXForward,
        areaFigureYForward,
        areaFigureXForwardEmpty,
        areaFigureYForwardEmpty
      );
    }

    if (direction === Direction.TOP) {
      return this.canEatEmptyCell(
        this.x,
        areaFigureYForward,
        this.x,
        areaFigureYForwardEmpty
      );
    }

    if (direction === Direction.TOP_RIGHT) {
      return this.canEatEmptyCell(
        areaFigureXBack,
        areaFigureYForward,
        areaFigureXBackEmpty,
        areaFigureYForwardEmpty
      );
    }

    if (direction === Direction.LEFT) {
      return this.canEatEmptyCell(
        areaFigureXForward,
        this.y,
        areaFigureXForwardEmpty,
        this.y
      );
    }

    if (direction === Direction.RIGHT) {
      return this.canEatEmptyCell(
        areaFigureXBack,
        this.y,
        areaFigureXBackEmpty,
        this.y
      );
    }

    if (direction === Direction.BOTTOM_LEFT) {
      return this.canEatEmptyCell(
        areaFigureXForward,
        areaFigureYBack,
        areaFigureXForwardEmpty,
        areaFigureYBackEmpty
      );
    }

    if (direction === Direction.BOTTOM) {
      return this.canEatEmptyCell(
        this.x,
        areaFigureYBack,
        this.x,
        areaFigureYBackEmpty
      );
    }

    if (direction === Direction.BOTTOM_RIGHT) {
      return this.canEatEmptyCell(
        areaFigureXBack,
        areaFigureYBack,
        areaFigureXBackEmpty,
        areaFigureYBackEmpty
      );
    }
  }

  canEatBaatyr(target: Cell, direction: Direction): Cell | undefined {
    if (direction === Direction.TOP) {
      for (let y = this.y; y >= 0; y--) {
        if (
          this.board.getCell(this.x, y).figure?.color !== this.figure?.color &&
          this.board.getCell(this.x, y).figure !== null
        ) {
          if (y + 1 > 13 || y - 1 < 0) {
            return undefined;
          }

          if (
            this.board.getCell(this.x, y - 1 < 0 ? y : y - 1).color ===
            "fortress"
          ) {
            return undefined;
          }

          if (
            this.board.getCell(this.x, y - 1 < 0 ? y : y - 1).figure !== null
          ) {
            return undefined;
          }

          return this.board.getCell(this.x, y);
        }
      }
    }

    if (direction === Direction.TOP_LEFT) {
      let x = this.x;
      let y = this.y;

      while (x >= 0 && y >= 0) {
        if (
          this.board.getCell(x, y).figure?.color !== this.figure?.color &&
          this.board.getCell(x, y).figure !== null
        ) {
          if (x + 1 > 6 || x - 1 < 0 || y + 1 > 13 || y - 1 < 0) {
            return undefined;
          }

          if (
            this.board.getCell(x - 1 < 0 ? x : x - 1, y - 1 < 0 ? y : y - 1)
              .color === "fortress"
          ) {
            return undefined;
          }

          if (
            this.board.getCell(x - 1 < 0 ? x : x - 1, y - 1 < 0 ? y : y - 1)
              .figure !== null
          ) {
            return undefined;
          }

          return this.board.getCell(x, y);
        }

        x--;
        y--;
      }
    }

    if (direction === Direction.BOTTOM_LEFT) {
      let x = this.x;
      let y = this.y;

      while (x >= 0 && y <= 13) {
        if (
          this.board.getCell(x - 1 < 0 ? x : x - 1, y + 1 > 13 ? y : y + 1)
            .color === "fortress"
        ) {
          return undefined;
        }

        if (
          this.board.getCell(x, y).figure?.color !== this.figure?.color &&
          this.board.getCell(x, y).figure !== null
        ) {
          if (x + 1 > 6 || x - 1 < 0 || y + 1 > 13 || y - 1 < 0) {
            return undefined;
          }

          if (
            this.board.getCell(x - 1 < 0 ? x : x - 1, y + 1 > 13 ? y : y + 1)
              .figure !== null
          ) {
            return undefined;
          }

          return this.board.getCell(x, y);
        }

        x--;
        y++;
      }
    }

    if (direction === Direction.BOTTOM_RIGHT) {
      let x = this.x;
      let y = this.y;

      while (x <= 6 && y <= 13) {
        if (
          this.board.getCell(x + 1 > 6 ? x : x + 1, y + 1 > 13 ? y : y + 1)
            .color === "fortress"
        ) {
          return undefined;
        }

        if (
          this.board.getCell(x, y).figure?.color !== this.figure?.color &&
          this.board.getCell(x, y).figure !== null
        ) {
          if (x + 1 > 6 || x - 1 < 0 || y + 1 > 13 || y - 1 < 0) {
            return undefined;
          }

          if (
            this.board.getCell(x + 1 > 6 ? x : x + 1, y + 1 > 13 ? y : y + 1)
              .figure !== null
          ) {
            return undefined;
          }

          return this.board.getCell(x, y);
        }

        x++;
        y++;
      }
    }

    if (direction === Direction.TOP_RIGHT) {
      let x = this.x;
      let y = this.y;

      while (x <= 6 && y >= 0) {
        if (
          this.board.getCell(x + 1 > 6 ? x : x + 1, y - 1 < 0 ? y : y - 1)
            .color === "fortress"
        ) {
          return undefined;
        }

        if (
          this.board.getCell(x, y).figure?.color !== this.figure?.color &&
          this.board.getCell(x, y).figure !== null
        ) {
          if (x + 1 > 6 || x - 1 < 0 || y + 1 > 13 || y - 1 < 0) {
            return undefined;
          }

          if (
            this.board.getCell(x + 1 > 6 ? x : x + 1, y - 1 < 0 ? y : y - 1)
              .figure !== null
          ) {
            return undefined;
          }

          return this.board.getCell(x, y);
        }

        x++;
        y--;
      }
    }

    if (direction === Direction.LEFT) {
      for (let x = this.x; x >= 0; x--) {
        if (
          this.board.getCell(x, this.y).figure?.color !== this.figure?.color &&
          this.board.getCell(x, this.y).figure !== null
        ) {
          if (
            this.board.getCell(x - 1 < 0 ? x : x - 1, this.y).color ===
            "fortress"
          ) {
            return undefined;
          }

          if (
            this.board.getCell(x - 1 < 0 ? x : x - 1, this.y).figure !== null
          ) {
            return undefined;
          }

          return this.board.getCell(x, this.y);
        }
      }
    }

    if (direction === Direction.RIGHT) {
      for (let x = this.x; x <= 6; x++) {
        if (
          this.board.getCell(x, this.y).figure?.color !== this.figure?.color &&
          this.board.getCell(x, this.y).figure !== null
        ) {
          if (
            this.board.getCell(x + 1 > 6 ? x : x + 1, this.y).color ===
            "fortress"
          ) {
            return undefined;
          }

          if (
            this.board.getCell(x + 1 >= 6 ? x : x + 1, this.y).figure !== null
          ) {
            return undefined;
          }

          return this.board.getCell(x, this.y);
        }
      }
    }

    if (direction === Direction.BOTTOM) {
      for (let y = this.y; y <= 13; y++) {
        if (
          this.board.getCell(this.x, y).figure?.color !== this.figure?.color &&
          this.board.getCell(this.x, y).figure !== null
        ) {
          if (y + 1 > 13 || y - 1 < 0) {
            return undefined;
          }

          if (
            this.board.getCell(this.x, y + 1 > 13 ? y : y + 1).color ===
            "fortress"
          ) {
            return undefined;
          }

          if (
            this.board.getCell(this.x, y + 1 > 13 ? y : y + 1).figure !== null
          ) {
            return undefined;
          }

          return this.board.getCell(this.x, y);
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

  // В диоганади проблемы с dx и dy

  isEmptyDiogonal(target: Cell) {
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
