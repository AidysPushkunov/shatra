import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Biy } from "./figures/Biy";
import { Baatyr } from "./figures/Baatyr";
import { Shatra } from "./figures/Shatra";
import { Figure } from "./figures/Figure";
import { Direction } from "./Direction";


const notationSymbolY: string[] = [
  "14",
  "13",
  "12",
  "11",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
];

const notationSymbolX: string[] = ["A", "B", "C", "D", "E", "F", "G"];


export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  constructor() {
    this.initCells();
    this.addFigures();
  }

  public flipBoard() {
    this.cells = this.cells.reverse();

    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        this.cells[i][j].x = j;
        this.cells[i][j].y = i;
      }
    }

    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = this.cells[i].reverse();
      for (let j = 0; j < this.cells[i].length; j++) {
        this.cells[i][j].x = j;
        this.cells[i][j].y = i;
      }
    }

    this.lostBlackFigures = this.lostBlackFigures.reverse();
    this.lostWhiteFigures = this.lostWhiteFigures.reverse();
  }



  public initCells() {
    for (let i = 0; i < 14; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 7; j++) {
        if ((i + j) % 2 !== 0) {
          if (
            (i === 0 && j === 1) ||
            (i === 0 && j === 5) ||
            (i === 1 && j === 6) ||
            (i === 1 && j === 0) ||
            (i === 2 && j === 1) ||
            (i === 2 && j === 5) ||
            (i === 3 && j === 0) ||
            (i === 3 && j === 2) ||
            (i === 3 && j === 4) ||
            (i === 3 && j === 6) ||
            (i === 10 && j === 1) ||
            (i === 10 && j === 5) ||
            (i === 11 && j === 0) ||
            (i === 11 && j === 6) ||
            (i === 12 && j === 1) ||
            (i === 12 && j === 5) ||
            (i === 13 && j === 6) ||
            (i === 13 && j === 0)
          ) {
            row.push(new Cell(this, j, i, Colors.FORTRESS, false, null, notationSymbolX[j] + notationSymbolY[i]));
          } else {
            if (
              (i === 0 && j >= 2 && j <= 4) ||
              (i === 1 && j >= 2 && j <= 4) ||
              (i === 2 && j >= 2 && j <= 4) ||
              (i === 3 && j === 3) ||
              (i === 13 && j >= 2 && j <= 4) ||
              (i === 12 && j >= 2 && j <= 4) ||
              (i === 11 && j >= 2 && j <= 4) ||
              (i === 10 && j === 3)
            ) {
              row.push(new Cell(this, j, i, Colors.WHITE, true, null, notationSymbolX[j] + notationSymbolY[i]));
            } else {
              row.push(new Cell(this, j, i, Colors.WHITE, false, null, notationSymbolX[j] + notationSymbolY[i]));
            }
          }
        } else {
          if (
            (i === 0 && j === 0) ||
            (i === 0 && j === 6) ||
            (i === 1 && j === 5) ||
            (i === 1 && j === 1) ||
            (i === 2 && j === 6) ||
            (i === 2 && j === 0) ||
            (i === 3 && j === 1) ||
            (i === 3 && j === 5) ||
            (i === 10 && j === 0) ||
            (i === 10 && j === 2) ||
            (i === 10 && j === 4) ||
            (i === 10 && j === 6) ||
            (i === 11 && j === 0) ||
            (i === 11 && j === 5) ||
            (i === 12 && j === 1) ||
            (i === 12 && j === 6) ||
            (i === 13 && j === 0) ||
            (i === 13 && j === 5) ||
            (i === 11 && j === 1) ||
            (i === 12 && j === 0) ||
            (i === 13 && j === 1)
          ) {
            row.push(new Cell(this, j, i, Colors.FORTRESS, false, null, notationSymbolX[j] + notationSymbolY[i]));
          } else {
            if (
              (i === 0 && j >= 2 && j <= 4) ||
              (i === 1 && j >= 2 && j <= 4) ||
              (i === 2 && j >= 2 && j <= 4) ||
              (i === 3 && j === 3) ||
              (i === 13 && j >= 2 && j <= 4) ||
              (i === 12 && j >= 2 && j <= 4) ||
              (i === 11 && j >= 2 && j <= 4) ||
              (i === 10 && j === 3)
            ) {
              row.push(new Cell(this, j, i, Colors.BLACK, true, null, notationSymbolX[j] + notationSymbolY[i]));
            } else {
              row.push(new Cell(this, j, i, Colors.BLACK, false, null, notationSymbolX[j] + notationSymbolY[i]));
            }
          }
        }
      }
      this.cells.push(row);
    }
  }


  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        if (!selectedCell?.board.canEatAbility(selectedCell))
          target.eatFieldAttack = false;
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public getCellByCoordinate(coorditate: string): Cell | null {
    if (!this.cells || !Array.isArray(this.cells) || this.cells.length === 0) {
      console.error('Board cells are not properly initialized.');
      return null;
    }

    const match = coorditate.match(/^([A-G]+)(\d+)$/);

    if (!match) {
      console.error('Invalid coordinate format');
      return null;
    }

    const xStr = match[1];
    const yStr = match[2];

    const x = notationSymbolX.indexOf(xStr);
    const y = notationSymbolY.indexOf(yStr);

    if (x === -1 || y === -1 || y >= this.cells.length || x >= this.cells[y].length) {
      console.error('Invalid coordinates:', xStr, yStr);
      return null;
    }

    // Возвращаем актуальную ячейку по координатам x и y
    return this.cells[y][x];
  }

  // Метод для обновления данных в ячейке по координатам x и y
  public updateCell(x: number, y: number, updatedCell: Cell) {
    if (y >= 0 && y < this.cells.length && x >= 0 && x < this.cells[y].length) {
      this.cells[y][x] = updatedCell;
    } else {
      console.error('Invalid coordinates for updating cell:', x, y);
    }
  }

  canEatAbility(target: Cell) {
    for (let x = 0; x <= 6; x++) {
      for (let j = 0; j <= 13; j++) {
        if (
          !this.getCell(x, j).isEmpty() &&
          this.getCell(x, j).figure?.color === target.figure?.color &&
          this.getCell(x, j).figure?.logo !== "blackBiy" &&
          this.getCell(x, j).figure?.logo !== "whiteBiy" &&
          this.getCell(x, j).figure?.logo !== "fortress"
        ) {
          if (
            Boolean(
              this.getCell(x, j).canEat(this.getCell(x, j), Direction.TOP) ||
              this.getCell(x, j).canEat(this.getCell(x, j), Direction.LEFT) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.RIGHT
              ) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.BOTTOM
              ) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.TOP_LEFT
              ) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.TOP_RIGHT
              ) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.BOTTOM_LEFT
              ) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.BOTTOM_RIGHT
              )
            )
          ) {
            return true;
          }
        }
      }
    }
  }

  canEatAbilityBaatyr(target: Cell) {
    if (
      !this.getCell(target.x, target.y).isEmpty() &&
      this.getCell(target.x, target.y).figure?.color !== target.figure?.color &&
      (this.getCell(target.x, target.y).figure?.logo !== "whiteBaatyr" ||
        this.getCell(target.x, target.y).figure?.logo !== "blackBaatyr")
    ) {
      if (
        Boolean(
          this.getCell(target.x, target.y).canEatBaatyr(
            this.getCell(target.x, target.y),
            Direction.TOP
          ) ||
          this.getCell(target.x, target.y).canEatBaatyr(
            this.getCell(target.x, target.y),
            Direction.LEFT
          ) ||
          this.getCell(target.x, target.y).canEatBaatyr(
            this.getCell(target.x, target.y),
            Direction.RIGHT
          ) ||
          this.getCell(target.x, target.y).canEatBaatyr(
            this.getCell(target.x, target.y),
            Direction.BOTTOM
          ) ||
          this.getCell(target.x, target.y).canEatBaatyr(
            this.getCell(target.x, target.y),
            Direction.TOP_LEFT
          ) ||
          this.getCell(target.x, target.y).canEatBaatyr(
            this.getCell(target.x, target.y),
            Direction.TOP_RIGHT
          ) ||
          this.getCell(target.x, target.y).canEatBaatyr(
            this.getCell(target.x, target.y),
            Direction.BOTTOM_LEFT
          ) ||
          this.getCell(target.x, target.y).canEatBaatyr(
            this.getCell(target.x, target.y),
            Direction.BOTTOM_RIGHT
          )
        )
      ) {
        return true;
      }
    }
  }

  canEatAbilityWithBiy(target: Cell) {
    for (let x = 0; x <= 6; x++) {
      for (let j = 0; j <= 13; j++) {
        if (
          !this.getCell(x, j).isEmpty() &&
          this.getCell(x, j).figure?.color === target.figure?.color &&
          (this.getCell(x, j).figure?.logo === "blackBiy" ||
            this.getCell(x, j).figure?.logo === "whiteBiy")
        ) {
          if (
            Boolean(
              this.getCell(x, j).canEat(this.getCell(x, j), Direction.TOP) ||
              this.getCell(x, j).canEat(this.getCell(x, j), Direction.LEFT) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.RIGHT
              ) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.BOTTOM
              ) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.TOP_LEFT
              ) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.TOP_RIGHT
              ) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.BOTTOM_LEFT
              ) ||
              this.getCell(x, j).canEat(
                this.getCell(x, j),
                Direction.BOTTOM_RIGHT
              )
            )
          ) {
            return true;
          }
        }
      }
    }
  }

  checkFortressEmpty(color: Colors): boolean {
    const limitCoordinateY: number = color === Colors.WHITE ? 13 : 2;
    let fortressEmpty: boolean;
    let limit: number = color === Colors.WHITE ? 11 : 0;
    let positionX: number = 2;
    for (positionX; positionX <= 4; positionX++) {
      fortressEmpty = this.getCell(positionX, limit).isEmpty() === true;

      if (
        !fortressEmpty &&
        this.getCell(positionX, limit).figure?.color === color
      ) {
        return false;
      }

      if (positionX === 4 && limit < limitCoordinateY) {
        positionX = 2;
        ++limit;
      }

      if (positionX === 4 && limit === limitCoordinateY) {
        return true;
      }
    }

    return true;
  }

  private addShatra() {
    for (let i = 2; i <= 4; i++) {
      new Shatra(Colors.BLACK, this.getCell(i, 0), this);
      new Shatra(Colors.BLACK, this.getCell(i, 1), this);
      new Shatra(Colors.BLACK, this.getCell(i, 2), this);

      new Shatra(Colors.WHITE, this.getCell(i, 11), this);
      new Shatra(Colors.WHITE, this.getCell(i, 12), this);
      new Shatra(Colors.WHITE, this.getCell(i, 13), this);
    }

    for (let i = 0; i < 7; i++) {
      new Shatra(Colors.BLACK, this.getCell(i, 4), this);
      new Shatra(Colors.BLACK, this.getCell(i, 5), this);

      new Shatra(Colors.WHITE, this.getCell(i, 8), this);
      new Shatra(Colors.WHITE, this.getCell(i, 9), this);
    }
  }

  private addBiy() {
    new Biy(Colors.BLACK, this.getCell(3, 3));
    new Biy(Colors.WHITE, this.getCell(3, 10));
  }

  public addFigures() {
    this.addShatra();
    this.addBiy();
  }
}
