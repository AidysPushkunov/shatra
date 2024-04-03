import { useEffect, useState } from "react";
import { Board } from "@/models/Board";
import { ShowFigure } from "@/features/showFigure";
import { Cell } from "@/models/Cell";
import { Player } from "@/models/Player";
import { Direction } from "@/models/Direction";

import { Stage, Layer } from "react-konva";

import Konva from "konva";

interface BoardProps {
  board: Board;
  historyMovements: any;
  setHistoryMovementsState: any;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  updateBoard: () => void;
  swapPlayer: () => void;
  onUpdateBoard: (board: Board) => void;
}


const SCENE_BASE_WIDTH = 280;
const SCENE_BASE_HEIGHT = 560;

const BoardWidget: React.FC<BoardProps> = ({
  board,
  setHistoryMovementsState,
  historyMovements,
  setBoard,
  currentPlayer,
  updateBoard,
  swapPlayer,
  onUpdateBoard,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [checkedCell, setCheckedCell] = useState<Cell | null>(null);

  const [state, setState] = useState<any[]>([]);
  const [animatedFigure, setAnimateFigure] = useState<any>(null);
  const [selectedCellItems, setSelectedCellItems] = useState<any>();
  const [oldCellCoordinate, setOldCellCoordinate] = useState<any>();

  const [size, setSize] = useState({
    width: SCENE_BASE_WIDTH,
    height: SCENE_BASE_HEIGHT,
  });

  let moveSound: any;

  if (typeof window !== 'undefined') { 
    moveSound = new Audio('./sounds/shatra_sound.mp3')
  }


  useEffect(() => {
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
            (figure.x - oldCellCoordinate.x) * 40 == 0
              ? (figure.x - oldCellCoordinate.x) * 40 + 5
              : (figure.x - oldCellCoordinate.x) * 40 + 5,
          y:
            (figure.y - oldCellCoordinate.y) * 40 == 0
              ? (figure.y - oldCellCoordinate.y) * 40 + 5
              : (figure.y - oldCellCoordinate.y) * 40 + 5,
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
        coordinate: cell.coordinate,
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
          moveSound.play();
          swapPlayer();
          setSelectedCell(null);
        } else {
          if (!board.canEatAbility(cell)) {
            moveSound.play();
            swapPlayer();
            setSelectedCell(null);
          } else {
            moveSound.play();
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
          coordinateChecked: cell.coordinate,
          checkedX: x,
          checkedY: y,
        });

        cell.setEatFieldAttack(null, false);
        setCheckedCell(cell);
        setHistoryMovementsState(historyMovements);

        setSelectedCell(cell);
        animatedChangePositionFigure(cell, event, false);
      }
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }


  
  useEffect(() => {
    setState(() => generateCanvasElements());
    onUpdateBoard(board); 
  }, [board]);

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

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("stage-parent");
      if (container) {
        setSize({
          width: container.offsetWidth,
          height: container.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const getMaxScale = () => {
    const scaleX = size.width / SCENE_BASE_WIDTH;
    const scaleY = size.height / SCENE_BASE_HEIGHT;

    return Math.min(scaleX, scaleY);
  };

  const getScale = () => {
    const maxScale = getMaxScale();
    return { x: maxScale, y: maxScale };
  };

  return (
    <div id="stage-parent-container">
     <div id="stage-parent" >
      <Stage width={size.width} height={size.height}
      scale={getScale()}
      >
        <Layer>{state}</Layer>
      </Stage>
      </div>
      </div>
  );
};

export { BoardWidget };
