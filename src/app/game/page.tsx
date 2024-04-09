"use client";

import { useState, useEffect, Suspense } from "react";

import { BoardWidget } from "@/widgets/board";
import { Board } from "@/models/Board";
import { Player } from "@/models/Player";
import { Colors } from "@/models/Colors";
import { Timer } from "@/widgets/timer";
import { ShowCoordinates } from "@/features/showCoordinates";
import { Notation } from "@/widgets/notation";
import { FlippingBoard } from "@/features/flippingBoard";

import { io, Socket } from 'socket.io-client';
import { LoadingPage } from "@/features/loadingPage";
import Link from "next/link";
import Loading from "@/app/game/loading";
import { Menu } from "@/widgets/menu";




let historyMovements: any[] = [];


export default function Home() {

  const [historyMovementsState, setHistoryMovementsState] = useState(historyMovements);
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [board, setBoard] = useState(new Board());

  const [gameId, setGameId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const playerId = 'player:' + Math.random().toString();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Задержка в 3 секунды (можете изменить по своему усмотрению)

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket'], // Use websocket transport
      extraHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:3000', // Specify your client's origin
      },
    }); // Укажите URL вашего WebSocket сервера

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('gameCreated', (gameId) => {
      setGameId(gameId);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);


  const createGame = () => {
    if (socket) {
      socket.emit('createGame', { playerId });
    } else {
      console.error('Socket is null. Cannot emit createGame.');
    }
  };

  const joinGame = (gameId: string) => {
    if (socket) {
      socket.emit('joinGame', { gameId, playerId });
    } else {
      console.error('Socket is null. Cannot emit joinGame.');
    }
  };

  const makeMove = (gameId: string, move: string) => {
    if (socket) {
      socket.emit('makeMove', { gameId, move });
    } else {
      console.error('Socket is null. Cannot emit makeMove.');
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
              onUpdateBoard={(updatedBoard) => setBoard(updatedBoard)}
            />

            {/* <div className="flex items-start h-full mt-5">
              <div>
                <Notation
                  historyMovements={historyMovements}
                  historyMovementsState={historyMovementsState}
                  currentPlayer={currentPlayer}
                />
                <FlippingBoard setBoard={setBoard} />
              </div>
            </div> */}
          </div>
        </div>
      </Suspense>

    </>
  );
}
