"use client";

import { useState, useEffect, Suspense } from "react";

import { BoardWidget } from "@/widgets/board";
import { Board } from "@/models/Board";
import { Player } from "@/models/Player";
import { Colors } from "@/models/Colors";
import { useSearchParams } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { Timer } from "@/widgets/timer";
import { ShowCoordinates } from "@/features/showCoordinates";
import { Notation } from "@/widgets/notation";
import { FlippingBoard } from "@/features/flippingBoard";

import Loading from "@/app/loading";
import { Menu } from "@/widgets/menu";




let historyMovements: any[] = [];


export default function Home() {
  const searchParams = useSearchParams();
  const [socket, setSocket] = useState<Socket | null>(null);

  const [historyMovementsState, setHistoryMovementsState] = useState(historyMovements);
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [board, setBoard] = useState(new Board());




  const gameId = searchParams.get('search')

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket'],
      extraHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      // Присоединиться к комнате игры с gameId
      socket.emit('joinGameRoom', gameId);
      setSocket(socket);
    });

    //  // Обработка событий (например, прием ходов от других игроков)
    //  socket.on('opponentMove', (moveFrom: string, moveTo: string) => {
    //   console.log('Received opponent move:', moveFrom, moveTo);
    //   // Обработать ход от другого игрока
    // });


    return () => {
      socket.disconnect(); // Отключить сокет при размонтировании компонента
    };
  }, []);


  const handlePlayerMove = (moveFrom: string, moveTo: string, event: any) => {
    if (socket) {
      socket.emit('makeMove', { gameId, moveFrom, moveTo, event });
    }
  };


  useEffect((): void => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);


  function updateBoard(): void {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function swapPlayer(): void {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
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
            />
          </div>
        </div>
      </Suspense>
    </>
  );
}
