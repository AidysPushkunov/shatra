import { useEffect, useState, useRef } from "react";
import { Board } from "@/models/Board";
import { ShowFigure } from "@/features/showFigure";
import { Cell } from "@/models/Cell";
import { Player } from "@/models/Player";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { Group } from "react-konva";

import _ from "lodash";
import { Colors } from "@/models/Colors";
import { Direction } from "@/models/Direction";



interface BoardProps {
  board: Board;
  historyMovements: any;
  setHistoryMovementsState: any;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  updateBoard: () => void;
  swapPlayer: () => void;
  onUpdateBoard: (board: Board) => void;
  handlePlayerMove: (moveFrom: string, moveTo: string) => void;
  socket: any;
  playerColor: string | null;
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
  handlePlayerMove,
  socket,
  playerColor
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [checkedCell, setCheckedCell] = useState<Cell | null>(null);

  const [state, setState] = useState<any[]>([]);
  const [eventForAnimation, setEventForAnimation] = useState<object>({});

  const cellRefs = useRef<Array<Array<typeof Group | null>>>([]);



  useEffect(() => {
    cellRefs.current = Array.from({ length: board.cells.length }, () => []);
  }, [board.cells.length]);

  const updateCellRef = (row: number, col: number, ref: typeof Group | null) => {
    cellRefs.current[row][col] = ref;
  };

  const getCellRef = (row: number, col: number) => {
    return cellRefs.current[row][col];
  };


  const [size, setSize] = useState({
    width: SCENE_BASE_WIDTH,
    height: SCENE_BASE_HEIGHT,
  });

  let moveSound: any;

  if (typeof window !== 'undefined') {
    moveSound = new Audio("/sounds/shatra_sound.mp3");
  }

  const makeMove = (fromCoordinate: string, toCoordinate: string) => {

    let fromCell, toCell;

    if (playerColor === Colors.BLACK) {
      fromCell = board.getCellByCoordinate(fromCoordinate, true);
      toCell = board.getCellByCoordinate(toCoordinate, true);
    } else {
      fromCell = board.getCellByCoordinate(fromCoordinate, false);
      toCell = board.getCellByCoordinate(toCoordinate, false);
    }

    if (fromCell && toCell && fromCell.figure && fromCell.figure.canMove(toCell)) {

      const isKingCaptured = toCell.board.isKingCaptured();
      if (isKingCaptured) {
        console.log(`Game over! ${fromCell.figure.color === Colors.WHITE ? "White" : "Black"} king has been captured.`);
        alert(`Game over! ${fromCell.figure.color === Colors.WHITE ? "Black win" : "White win"} .`);
        return;
      }


      const animateFigure = getAnimateFigure(fromCell);
      const animateGroup = animateFigure ? animateFigure.getParent() : null;


      if (animateFigure && animateGroup) {
        animateFigure.to({
          x: playerColor === Colors.WHITE ? (toCell.x - fromCell.x) * 40 + 5 : (fromCell.x - toCell.x) * 40 + 5,
          y: playerColor === Colors.WHITE ? (toCell.y - fromCell.y) * 40 + 5 : (fromCell.y - toCell.y) * 40 + 5,
          duration: 0.3,
          onFinish: () => {
            moveSound.play();
            fromCell.moveFigure(toCell);
            setTimeout(() => updateBoard(), 305);
            setSelectedCell(null);
            setCheckedCell(null);
          },
        });
      } else {
        console.log('Animate Figure or Group is not available.');
      }
    } else {
      console.log('Invalid move or cells.');
    }
  };

  const getAnimateFigure = (cell: Cell): Konva.Image | null => {

    let groupRef: any;

    if (playerColor === Colors.BLACK) {
      groupRef = getCellRef(6 - cell.x, 13 - cell.y);
    } else {
      groupRef = getCellRef(cell.x, cell.y);
    }

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

    if (groupRef && groupRef.current) {
      const children = groupRef.current.children;

      const animateFigure = children.find(
        (child: any) => child instanceof Konva.Image
      );
      addToLayerIfNeeded(animateFigure);
      return animateFigure as Konva.Image;
    } else {
      console.log('GroupRef is null or undefined.');
    }

    return null;
  };


  function clickField(cell: Cell, event: any) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {



      makeMove(selectedCell.coordinate, cell.coordinate);
      handlePlayerMove(selectedCell.coordinate, cell.coordinate);


      const movements =
        [Direction.TOP, Direction.TOP_LEFT, Direction.TOP_RIGHT, Direction.LEFT, Direction.RIGHT, Direction.BOTTOM, Direction.BOTTOM_LEFT, Direction.BOTTOM_RIGHT]
          .some(direction => selectedCell.canEat(selectedCell, direction));

      const canChopFurther =
        [Direction.TOP, Direction.TOP_LEFT, Direction.TOP_RIGHT, Direction.LEFT, Direction.RIGHT, Direction.BOTTOM, Direction.BOTTOM_LEFT, Direction.BOTTOM_RIGHT]
          .some(direction => selectedCell.canEat(cell, direction));


      if (canChopFurther && movements) {
      } else {
        swapPlayer();
      }

    } else {

      if (currentPlayer?.color === playerColor && cell.figure?.color === playerColor) {
        cell.setEatFieldAttack(null, false);
        setEventForAnimation(event);
        setCheckedCell(cell);
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    const handleOpponentMove = (moveFrom: string, moveTo: string, event: any) => {
      makeMove(moveFrom, moveTo);
    };

    if (socket) {
      socket.on('opponentMove', handleOpponentMove);

      return () => {
        socket.off('opponentMove', handleOpponentMove);
      };
    } else {
      console.log('Socket connection not available');
    }
  }, [socket]);



  useEffect(() => {
    highlightCells();
  }, [selectedCell]);




  useEffect(() => {
    setState(() => generateCanvasElements());
    onUpdateBoard(board);
  }, [board]);


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
          cellRefs={cellRefs}
          updateCellRef={updateCellRef}
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
      <div id="stage-parent">
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