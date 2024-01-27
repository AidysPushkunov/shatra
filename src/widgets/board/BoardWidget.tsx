import React from "react";

import { Board } from "@/models/Board";
import { ShowFigure } from "@/features/showFigure";
import { Cell } from "@/models/Cell";
import { Player } from "@/models/Player";
import { Direction } from "@/models/Direction";

import { Stage, Layer } from "react-konva";

interface BoardProps {
  board: Board;
  historyMovments: any;
  setHistoryMovmentsState: any;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardWidget: React.FC<BoardProps> = ({
  board,
  setHistoryMovmentsState,
  historyMovments,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = React.useState<Cell | null>(null);
  const [checkedCell, setCheckedCell] = React.useState<Cell | null>(null);

  const [state, setState] = React.useState<any[]>([]);
  const [animatedFigure, setAnimateFigure] = React.useState<any>();
  const [selectedCellItems, setSelectedCellItems] = React.useState<any>();
  const [oldCellCoordinate, setOldCellCordinate] = React.useState<any>();

  React.useEffect(() => {
    setState(() => generateConvasElements());
  }, [board]);

  React.useEffect(() => {
    if (selectedCellItems) {
      const moveFigureTimer = setTimeout(() => {
        selectedCellItems?.selectedCell.moveFigure(selectedCellItems?.cell);
        updateBoard();
      }, 300);

      return () => clearTimeout(moveFigureTimer);
    }
  }, [selectedCellItems]);

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function animatedChangePositionFigure(
    figure: any,
    e: any,
    sequence: boolean
  ) {
    if (!sequence) {
      e.target.parent.moveToTop();
      setAnimateFigure(e.target.parent.children[1]);
      setOldCellCordinate(figure);
    } else {
      if (animatedFigure) {
        animatedFigure.to({
          x:
            (figure.x - oldCellCoordinate.x) * 75 == 0
              ? (figure.x - oldCellCoordinate.x) * 75 + 10
              : (figure.x - oldCellCoordinate.x) * 75 + 10,
          y:
            (figure.y - oldCellCoordinate.y) * 75 == 0
              ? (figure.y - oldCellCoordinate.y) * 75 + 10
              : (figure.y - oldCellCoordinate.y) * 75 + 10,
          duration: 0.3,
        });
        setAnimateFigure(null);
      }
    }
  }

  function clickField(cell: Cell, event: any) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      let x = cell.x;
      let y = cell.y;

      historyMovments.push({
        moveFigure: true,
        currentPlayer: currentPlayer?.color,
        movedX: x,
        movedY: y,
      });

      setHistoryMovmentsState(historyMovments);

      setSelectedCellItems({ selectedCell, cell });
      animatedChangePositionFigure(cell, event, true);
      if (
        cell.x - selectedCell.x === 1 ||
        cell.y - selectedCell.y === 1 ||
        cell.x - selectedCell.x === -1 ||
        cell.y - selectedCell.y === -1 ||
        checkedCell?.infortress
      ) {
        swapPlayer();
      } else {
        console.log(
          cell.canEat(cell, Direction.LEFT),
          cell.canEat(cell, Direction.RIGHT),
          cell.canEat(cell, Direction.TOP_LEFT),
          cell.canEat(cell, Direction.TOP_RIGHT),
          cell.canEat(cell, Direction.TOP),
          cell.canEat(cell, Direction.BOTTOM_LEFT),
          cell.canEat(cell, Direction.BOTTOM_RIGHT),
          cell.canEat(cell, Direction.BOTTOM)
        );
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
        // let canEat = false;

        // for (const direction of [
        //   Direction.LEFT,
        //   Direction.RIGHT,
        //   Direction.TOP_LEFT,
        //   Direction.TOP_RIGHT,
        //   Direction.TOP,
        //   Direction.BOTTOM_LEFT,
        //   Direction.BOTTOM_RIGHT,
        //   Direction.BOTTOM,
        // ]) {
        //   if (cell.canEat(selectedCell, direction)) {
        //     console.log("This is cell: ", cell);
        //     console.log("This is selectedCell: ", selectedCell);
        //     console.log(cell.canEat(cell, direction));
        //     canEat = true;
        //     break;
        //   }
        // }

        // if (!canEat) {
        //   swapPlayer();
        // }
      }
      setCheckedCell(null);
      setSelectedCell(null);
      updateBoard();
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        let x = cell.x;
        let y = cell.y;

        historyMovments.push({
          moveFigure: false,
          currentPlayer: currentPlayer?.color,
          checkedX: x,
          checkedY: y,
        });

        setCheckedCell(cell);
        setHistoryMovmentsState(historyMovments);

        setSelectedCell(cell);
        animatedChangePositionFigure(cell, event, false);
      }
    }
  }

  React.useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function generateConvasElements() {
    const arrayCanvasElements: any = board.cells.map((row, index) =>
      row.map((cell, indexRow) => (
        <ShowFigure
          key={cell.id}
          index={index}
          indexRow={indexRow}
          clickField={clickField}
          intent={cell.color}
          cell={cell}
          selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
        />
      ))
    );

    return arrayCanvasElements.flat();
  }

  return (
    <>
      <Stage width={525} height={1050} className="flex flex-wrap w-[525px]">
        <Layer>{state}</Layer>
      </Stage>
    </>
  );
};

export { BoardWidget };
