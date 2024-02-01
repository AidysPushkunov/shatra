import React from "react";

import { Board } from "@/models/Board";
import { ShowFigure } from "@/features/showFigure";
import { Cell } from "@/models/Cell";
import { Player } from "@/models/Player";
import { Direction } from "@/models/Direction";

import { Stage, Layer } from "react-konva";

interface BoardProps {
  board: Board;
  historyMovements: any;
  setHistoryMovementsState: any;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  updateBoard: () => void;
  swapPlayer: () => void;
}

const BoardWidget: React.FC<BoardProps> = ({
  board,
  setHistoryMovementsState,
  historyMovements,
  setBoard,
  currentPlayer,
  updateBoard,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = React.useState<Cell | null>(null);
  const [checkedCell, setCheckedCell] = React.useState<Cell | null>(null);

  const [state, setState] = React.useState<any[]>([]);
  const [animatedFigure, setAnimateFigure] = React.useState<any>(null);
  const [selectedCellItems, setSelectedCellItems] = React.useState<any>();
  const [oldCellCoordinate, setOldCellCoordinate] = React.useState<any>();

  React.useEffect(() => {
    setState(() => generateCanvasElements());
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

  function animatedChangePositionFigure(
    figure: any,
    e: any,
    sequence: boolean
  ) {
    const findAncestor = (
      node: any,
      predicate: (node: any) => boolean
    ): any => {
      while (node && !predicate(node)) {
        node = node.parent;
      }
      return node;
    };

    const addToLayerIfNeeded = (figure: any): any => {
      const figureGroup = findAncestor(
        figure,
        (node: any) => node.getClassName && node.getClassName() === "Group"
      );

      if (figureGroup) {
        if (
          !figureGroup.getParent() ||
          figureGroup.getParent().className !== "Layer"
        ) {
          figureGroup.moveToTop();
        }
      }
    };

    if (!sequence) {
      addToLayerIfNeeded(e.target);

      const parent = e.target.parent;
      const children = parent ? parent.getChildren() : [];
      const animateFigure = children.find(
        (child: any) => child instanceof Konva.Image
      );

      if (animateFigure) {
        setAnimateFigure(animateFigure);
        setOldCellCoordinate(figure);
      }
    } else {
      if (animatedFigure) {
        addToLayerIfNeeded(animatedFigure);

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
          onFinish: () => setAnimateFigure(null),
        });
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

      historyMovements.push({
        moveFigure: true,
        currentPlayer: currentPlayer?.color,
        movedX: x,
        movedY: y,
      });

      setHistoryMovementsState(historyMovements);

      setSelectedCellItems({ selectedCell, cell });
      animatedChangePositionFigure(cell, event, true);

      setTimeout(() => {
        if (
          cell.x - selectedCell.x === 1 ||
          cell.y - selectedCell.y === 1 ||
          cell.x - selectedCell.x === -1 ||
          cell.y - selectedCell.y === -1 ||
          checkedCell?.infortress
        ) {
          swapPlayer();
          setSelectedCell(null);
        } else {
          if (!board.canEatAbility(cell)) {
            swapPlayer();
            setSelectedCell(null);
          } else {
            setSelectedCell(cell);
            animatedChangePositionFigure(cell, event, false);
          }
        }

        setCheckedCell(null);
        updateBoard();
      }, 305);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        let x = cell.x;
        let y = cell.y;

        historyMovements.push({
          moveFigure: false,
          currentPlayer: currentPlayer?.color,
          checkedX: x,
          checkedY: y,
        });

        setCheckedCell(cell);
        setHistoryMovementsState(historyMovements);

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

  function generateCanvasElements() {
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
