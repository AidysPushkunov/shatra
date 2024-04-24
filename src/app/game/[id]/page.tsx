"use client";

import { useState, useEffect, Suspense } from "react";

import { BoardWidget } from "@/widgets/board";
import { Board } from "@/models/Board";
import { Player } from "@/models/Player";
import { Colors } from "@/models/Colors";
import { useSearchParams } from 'next/navigation';
import { useSocket } from '@/contexts/socketContext';
import { useRouter } from 'next/navigation';
import { Menu } from "@/widgets/menu";

import Loading from "@/app/loading";
import { Figure } from "@/models/figures/Figure";
import { Cell } from "@/models/Cell";





let historyMovements: any[] = [];


export default function Home() {
  const socket = useSocket();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [historyMovementsState, setHistoryMovementsState] = useState(historyMovements);
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [board, setBoard] = useState<Board | null>(null);
  const gameId = searchParams.get('gameId')
  const playerId = searchParams.get('playerId');
  const playerColor = searchParams.get('playerColor');


  const handlePlayerMove = (moveFrom: string, moveTo: string) => {
    if (socket) {
      socket.emit('makeMove', { gameId, playerId, moveFrom, moveTo });
    }
  };


  useEffect((): void => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);



  // updateBoard надо что то сделать из за него происсхлодит двойное движение фигур

  function updateBoard(): void {
    if (board) {
      if (playerColor && playerColor === Colors.BLACK) {
        console.log('Updated black')
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
      } else {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
      }
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('playerUpdated', (newPlayerColor) => {
        const newPlayer = new Player(newPlayerColor);
        setCurrentPlayer(newPlayer);
        updateBoard();
      });
    }
  }, [socket])

  function swapPlayer(): void {
    if (socket) {
      socket.emit('swapPlayer');
    }

    // setTimeout((): void => updateBoard(), 305);
  }

  function reverseBoardAndFigures(board: Board): Board {
    const reversedBoard = new Board();

    // Определяем количество строк и столбцов на доске
    const numRows = board.cells.length;
    const numCols = numRows > 0 ? board.cells[0].length : 0;

    // Создаем новый двумерный массив для перевернутой доски
    reversedBoard.cells = [];

    // Перебираем строки доски в обратном порядке
    for (let i = numRows - 1; i >= 0; i--) {
      const originalRow = board.cells[i];
      const reversedRow = [];

      // Перебираем элементы в строке в обратном порядке
      for (let j = numCols - 1; j >= 0; j--) {
        reversedRow.push(originalRow[j]); // Добавляем элемент в перевернутую строку
      }

      reversedBoard.cells.push(reversedRow); // Добавляем перевернутую строку на новую доску
    }

    return reversedBoard;
  }





  function restart(): void {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    if (playerColor && playerColor === Colors.BLACK) {
      const originalBoard = newBoard;
      const reversedBoard = reverseBoardAndFigures(originalBoard);
      setBoard(reversedBoard);
    } else {
      setBoard(newBoard);
    }
    setHistoryMovementsState([]);
    historyMovements = [];
  }

  if (board) {
    return (
      <>

        <Suspense fallback={<Loading />}>
          <Menu />
          <div className="flex justify-center">
            <div className="flex justify-center">

              <BoardWidget
                board={board}
                setHistoryMovementsState={setHistoryMovementsState}
                historyMovements={historyMovements}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                updateBoard={updateBoard}
                swapPlayer={swapPlayer}
                onUpdateBoard={(updatedBoard: any) => setBoard(updatedBoard)}
                handlePlayerMove={handlePlayerMove}
                socket={socket}
                playerColor={playerColor}
              />
            </div>
          </div>
        </Suspense>
      </>
    )
  } else {
    return (
      <h1>404</h1>
    )
  }
}
