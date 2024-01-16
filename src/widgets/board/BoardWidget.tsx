import React from "react";

import { Board } from "@/models/Board";
import { ShowFigure } from "@/features/showFigure";
import { Cell } from "@/models/Cell";
import { Player } from "@/models/Player";
import { Direction } from "@/models/Direction";

import { Stage, Layer, Rect } from "react-konva";
import { Colors } from "@/models/Colors";
import { Figure } from "@/models/figures/Figure";

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
  const [state, setState] = React.useState<any[]>([]);
  const [firstClick, setFirstClick] = React.useState(false);
  const [animatedFigure, setAnimateFigure] = React.useState<any>();
  const [positionField, setpositionField] = React.useState<any>();

  React.useEffect(() => {
    setState(() => generateConvasElements());
  }, [board]);

  const [selectedCellItems, setSelectedCellItems] = React.useState<any>();

  React.useEffect(() => {
    if (selectedCellItems) {
      const moveFigureTimer = setTimeout(() => {
        // console.log(selectedCellItems);
        selectedCellItems?.selectedCell.moveFigure(selectedCellItems?.cell);
        updateBoard();
      }, 400);

      return () => clearTimeout(moveFigureTimer);
    }
  }, [selectedCellItems]);

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  const [oldCellCoordinate, setOldCellCordinate] = React.useState<any>();
  const [newCellCoordinate, setNewCellCordinate] = React.useState<any>();

  function animatedChangePositionFigure(
    figure: any,
    e: any,
    sequence: boolean
  ) {
    // console.log(e);
    if (!sequence) {
      e.target.parent.moveToTop();
      setAnimateFigure(e.target.parent.children[1]);
      console.log("Опана", animatedFigure);

      setFirstClick(true);
      setOldCellCordinate(figure);
    } else {
      if (animatedFigure) {
        setNewCellCordinate(figure);

        animatedFigure.to({
          x:
            (figure.x - oldCellCoordinate.x) * 75 == 0
              ? (figure.x - oldCellCoordinate.x) * 75 + 10
              : (figure.x - oldCellCoordinate.x) * 75 + 10,
          y:
            (figure.y - oldCellCoordinate.y) * 75 == 0
              ? (figure.y - oldCellCoordinate.y) * 75 + 10
              : (figure.y - oldCellCoordinate.y) * 75 + 10,
          duration: 0.35,
        });
        setFirstClick(false);
        setAnimateFigure(null);
      }
    }
  }

  function clickField(cell: Cell, figureRef: any, event: any) {
    // animatedChangePositionFigure(cell, event, firstClick);

    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      console.log("selectedCell", selectedCell);
      setSelectedCellItems({ selectedCell, cell });
      animatedChangePositionFigure(cell, event, firstClick);

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
      // setAnimateFigure(null);
      updateBoard();
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
        setFirstClick(false);
        !selectedCell?.figure &&
          animatedChangePositionFigure(cell, event, firstClick);
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
