import React from "react";

import { Board } from "@/models/Board";
import { ShowFigure } from "@/features/showFigure";
import { Cell } from "@/models/Cell";
import { Player } from "@/models/Player";
import { Direction } from "@/models/Direction";

import { Stage, Layer, Rect } from "react-konva";
import { Colors } from "@/models/Colors";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardWidget: React.FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = React.useState<Cell | null>(null);

  function clickField(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);

      if (
        cell.x - selectedCell.x === 1 ||
        cell.y - selectedCell.y === 1 ||
        cell.x - selectedCell.x === -1 ||
        cell.y - selectedCell.y === -1
      ) {
        swapPlayer();
      } else {
        if (
          !cell.canEat(cell, Direction.LEFT) &&
          !cell.canEat(cell, Direction.RIGHT) &&
          !cell.canEat(cell, Direction.TOP_LEFT) &&
          !cell.canEat(cell, Direction.TOP_RIGHT) &&
          !cell.canEat(cell, Direction.TOP) &&
          !cell.canEat(cell, Direction.BOTTOM_LEFT) &&
          !cell.canEat(cell, Direction.BOTTOM_RIGHT) &&
          !cell.canEat(cell, Direction.BOTTOM)
        ) {
          swapPlayer();
        }
      }
      setSelectedCell(null);
      updateBoard();
    } else {
      if (cell.figure?.color === currentPlayer?.color) setSelectedCell(cell);
    }
  }

  React.useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <>
      {/* <div className="flex flex-wrap w-[525px]"> */}
      <Stage width={525} height={1050} className="flex flex-wrap w-[525px]">
        <Layer>
          {board.cells.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((cell, indexRow) => (
                <>
                  <ShowFigure
                    key={cell.id}
                    index={index}
                    indexRow={indexRow}
                    clickField={clickField}
                    intent={cell.color}
                    cell={cell}
                    selected={
                      cell.x === selectedCell?.x && cell.y === selectedCell?.y
                    }
                  />
                </>
              ))}
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
      {/* </div> */}
      {/* </Stage> */}
    </>
  );
};

export { BoardWidget };
