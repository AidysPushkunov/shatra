import { useEffect, useState } from "react";
import { Board } from "@/models/Board";
import { ShowFigure } from "@/features/showFigure";
import { Cell } from "@/models/Cell";
import { Player } from "@/models/Player";
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
  handlePlayerMove: (moveFrom: string, moveTo: string, event: any) => void;
  socket: any;
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
  socket
}) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [checkedCell, setCheckedCell] = useState<Cell | null>(null);

  const [state, setState] = useState<any[]>([]);
  const [animatedFigure, setAnimateFigure] = useState<any>(null);
  const [selectedCellItems, setSelectedCellItems] = useState<any>();
  const [oldCellCoordinate, setOldCellCoordinate] = useState<any>();

  const [eventForAnimation, setEventForAnimation] = useState<object>({});

  const [size, setSize] = useState({
    width: SCENE_BASE_WIDTH,
    height: SCENE_BASE_HEIGHT,
  });

  let moveSound: any;

  if (typeof window !== 'undefined') {
    moveSound = new Audio("/sounds/shatra_sound.mp3")
  }



  const makeMove = (fromCoordinate: string, toCoordinate: string, event: any) => {

    const fromCell = board.getCellByCoordinate(fromCoordinate);
    const toCell = board.getCellByCoordinate(toCoordinate);

    fromCell && toCell && animatedChangePositionFigure(fromCell, toCell, event);

    const moveFigureTimer = setTimeout(() => {
      if (fromCell && toCell && fromCell.figure) {
        if (fromCell.figure.canMove(toCell)) {
          moveSound.play();
          fromCell.moveFigure(toCell);
          swapPlayer();
          updateBoard();

          setSelectedCell(null);
          setCheckedCell(null);
        } else {
          console.log("Invalid move!");
        }
      } else {
        console.log("Invalid selection!");
      }
    }, 300);

    return () => clearTimeout(moveFigureTimer);
  }



  function clickField(cell: Cell, event: any) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      makeMove(selectedCell.coordinate, cell.coordinate, eventForAnimation);
      handlePlayerMove(selectedCell.coordinate, cell.coordinate, eventForAnimation);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        cell.setEatFieldAttack(null, false);
        setEventForAnimation(event);
        setCheckedCell(cell);
        setSelectedCell(cell);
      }
    }
  }




  useEffect(() => {
    const handleOpponentMove = (moveFrom: string, moveTo: string, event: any) => {

      makeMove(moveFrom, moveTo, event);
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


  function animatedChangePositionFigure(fromCell: Cell, toCell: Cell, e: any) {
    if (!fromCell || !toCell) {
      console.log("Invalid cell objects provided.");
      return;
    }

    console.log(e);
    const addToLayerIfNeeded = (figure: any): any => {
      const findAncestor = (
        node: any,
        predicate: (node: any) => boolean
      ): any => {
        while (node && !predicate(node)) {
          node = node.parent;
        }
        return node;
      };

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

    addToLayerIfNeeded(e.target);

    const parent = e.target.parent;// Используйте board вместо parent, если это доступно
    console.log('Parent: ', parent);
    if (!parent) {
      console.log("Parent container not found for fromCell:", fromCell);
      return;
    }

    const children = parent ? parent.getChildren() : [];

    console.log('children: ', children);
    const animateFigure = children.find(
      (child: any) => child instanceof Konva.Image
    );

    console.log('animateFigure: ', animateFigure)
    if (!animateFigure) {
      console.log("Animate figure not found in children.");
      return;
    }

    animateFigure.to({
      x: (toCell.x - fromCell.x) * 40 + 5,
      y: (toCell.y - fromCell.y) * 40 + 5,
      duration: 0.3,
      onFinish: () => {
        console.log("Animation finished.");
      },
    });
  }





  // function animatedChangePositionFigure(
  //   figure: any,
  //   e: any,
  //   sequence: boolean
  // ) {
  //   const findAncestor = (
  //     node: any,
  //     predicate: (node: any) => boolean
  //   ): any => {
  //     while (node && !predicate(node)) {
  //       node = node.parent;
  //     }
  //     return node;
  //   };

  //   const addToLayerIfNeeded = (figure: any): any => {
  //     const figureGroup = findAncestor(
  //       figure,
  //       (node: any) => node.getClassName && node.getClassName() === "Group"
  //     );

  //     if (figureGroup) {
  //       if (
  //         !figureGroup.getParent() ||
  //         figureGroup.getParent().className !== "Layer"
  //       ) {
  //         figureGroup.moveToTop();
  //       }
  //     }
  //   };

  //   if (!sequence) {
  //     addToLayerIfNeeded(e.target);

  //     const parent = e.target.parent;
  //     const children = parent ? parent.getChildren() : [];
  //     const animateFigure = children.find(
  //       (child: any) => child instanceof Konva.Image
  //     );

  //     if (animateFigure) {
  //       setAnimateFigure(animateFigure);
  //       setOldCellCoordinate(figure);
  //     }
  //   } else {
  //     if (animatedFigure) {
  //       addToLayerIfNeeded(animatedFigure);

  //       animatedFigure.to({
  //         x:
  //           (figure.x - oldCellCoordinate.x) * 40 == 0
  //             ? (figure.x - oldCellCoordinate.x) * 40 + 5
  //             : (figure.x - oldCellCoordinate.x) * 40 + 5,
  //         y:
  //           (figure.y - oldCellCoordinate.y) * 40 == 0
  //             ? (figure.y - oldCellCoordinate.y) * 40 + 5
  //             : (figure.y - oldCellCoordinate.y) * 40 + 5,
  //         duration: 0.3,
  //         onFinish: () => setAnimateFigure(null),
  //       });
  //     }
  //   }
  // }



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