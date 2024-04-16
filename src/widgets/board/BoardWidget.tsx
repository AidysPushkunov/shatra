import { useEffect, useState } from "react";
import { Board } from "@/models/Board";
import { ShowFigure } from "@/features/showFigure";
import { Cell } from "@/models/Cell";
import { Player } from "@/models/Player";
import { Direction } from "@/models/Direction";

import { useSocket } from '@/contexts/socketContext';

import { Stage, Layer } from "react-konva";

import Konva from "konva";
import { Socket } from 'socket.io-client';


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


  const [size, setSize] = useState({
    width: SCENE_BASE_WIDTH,
    height: SCENE_BASE_HEIGHT,
  });

  let moveSound: any;

  if (typeof window !== 'undefined') {
    moveSound = new Audio("/sounds/shatra_sound.mp3")
  }



  const makeMove = (fromCoordinate: string, toCoordinate: string, event: any) => {
    console.log('Received move request:', fromCoordinate, toCoordinate);
    const fromCell = board.getCellByCoordinate(fromCoordinate);
    const toCell = board.getCellByCoordinate(toCoordinate);


    console.log('From cell: ', fromCell, 'To Cell: ', toCell);
    // console.log('To cell:', toCell);

    // console.log('fromCell: ', fromCell, ' toCell: ', toCell);

    // animatedChangePositionFigure(toCell, event, true);

    const moveFigureTimer = setTimeout(() => {
      // console.log('Testing: fromCell', fromCell)
      if (fromCell && toCell && fromCell.figure) {

        if (fromCell.figure.canMove(toCell)) { // error in this place
          moveSound.play();
          fromCell.moveFigure(toCell);
          swapPlayer();
          updateBoard();
          // Здесь можно добавить обновление истории ходов, звука и других действий

          // Пример обновления состояния после хода
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




  useEffect(() => {
    const handleOpponentMove = (moveFrom: string, moveTo: string, event: any) => {
      console.log('Received opponent move:', moveFrom, moveTo);
      makeMove(moveFrom, moveTo, event);
      // Здесь вызывайте функцию, которая обрабатывает ход противника
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

  // useEffect(() => {
  //   if (selectedCellItems) {
  //     const moveFigureTimer = setTimeout(() => {
  //       selectedCellItems?.selectedCell.moveFigure(selectedCellItems?.cell);
  //       updateBoard();
  //     }, 300);

  //     return () => clearTimeout(moveFigureTimer);
  //   }
  // }, [selectedCellItems]);

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



  // const clickField = (cell: Cell) => {
  //   if (selectedCell) {
  //     if (checkedCell) {
  //     
  //       makeMove(fromCoordinate, toCoordinate);
  //     }
  //     else {
  //       setCheckedCell(cell)
  //     }
  //   } else {
  //     setSelectedCell(cell);
  //   }
  // };


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
      makeMove(selectedCell.coordinate, cell.coordinate, event);
      handlePlayerMove(selectedCell.coordinate, cell.coordinate, event);
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