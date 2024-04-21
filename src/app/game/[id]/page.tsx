"use client";

import { useState, useEffect, Suspense } from "react";

import { BoardWidget } from "@/widgets/board";
import { Board } from "@/models/Board";
import { Player } from "@/models/Player";
import { Colors } from "@/models/Colors";
import { useSearchParams } from 'next/navigation';
import Loading from "@/app/loading";
import { Menu } from "@/widgets/menu";

import { useSocket } from '@/contexts/socketContext';
import { useRouter } from 'next/navigation';
import _ from "lodash";



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

  const [flippBoard, setflippBoard] = useState(false);


  console.log('Player color: ', playerColor)
  console.log('currentPlayer: ', currentPlayer)

  const handlePlayerMove = (moveFrom: string, moveTo: string) => {
    if (socket) {
      socket.emit('makeMove', { gameId, playerId, moveFrom, moveTo });
    }
  };


  useEffect(() => {
    if (playerColor === 'black' && board) {
      setflippBoard(true);
    }
  }, [playerColor, board]);

  useEffect(() => {
    if (board) {
      setBoard(prevBoard => {
        const newBoard = _.cloneDeep(prevBoard);
        newBoard && newBoard.flipBoard();
        newBoard && newBoard.addFigures();
        return newBoard;
      });


      console.log(board);
    }
  }, [flippBoard])

  useEffect((): void => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);


  function updateBoard(): void {
    if (board) {
      const newBoard = board.getCopyBoard();
      setBoard(newBoard);
    }

  }

  useEffect(() => {
    if (socket) {
      console.log('socket swap worked')
      socket.on('playerUpdated', (newPlayerColor) => {
        const newPlayer = new Player(newPlayerColor);
        setCurrentPlayer(newPlayer);
        updateBoard(); // Обновление игровой доски
      });
    }
  }, [socket])

  function swapPlayer(): void {
    if (socket) {
      socket.emit('swapPlayer');
    }

    setTimeout((): void => updateBoard(), 305);
  }

  function restart(): void {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
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
