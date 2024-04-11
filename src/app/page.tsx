'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import Loading from "@/app/loading";
import { Menu } from '@/widgets/menu';

import { io, Socket } from 'socket.io-client';




export default function Home() {
  const router = useRouter();

  const [gameId, setGameId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const playerId = 'player:' + Math.random().toString();


  const joinOrCreateGame = () => {
    if (socket) {
      console.log('Attempting to join or create game...');
      socket.emit('joinOrCreate', playerId, (gameId: string) => {
        console.log('Received game ID:', gameId);
        setGameId(gameId);
        if (gameId) {
          console.log('Navigating to game:', gameId);
          router.push(`/game/${gameId}`); // Переход на страницу игры с ID
        } else {
          console.error('Received empty game ID');
        }
      });
    } else {
      console.error('Socket is null. Cannot emit joinOrCreateGame.');
    }
  };


  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket'],
      extraHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setSocket(newSocket);
    });

    newSocket.on('gameReady', (gameId) => {
      console.log('Game is ready with ID:', gameId);
      setGameId(gameId);
      if (gameId) {
        console.log('Navigating to game:', gameId);
        router.push(`/game/${gameId}`); // Navigate to the game page with the gameId
      } else {
        console.error('Received empty game ID');
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);



  const makeMove = (gameId: string, move: string) => {
    if (socket) {
      socket.emit('makeMove', { gameId, move });
    } else {
      console.error('Socket is null. Cannot emit makeMove.');
    }
  };



  return (
    <>
      <Suspense fallback={<Loading />}>
        <Menu />
        <div className="grid items-center justify-center w-full h-[100vh]">
          <div className="grid max-w-96 md:gid-rows-2 md:grid-cols-2 text-sm gap-2">
            <button onClick={joinOrCreateGame}>
              <div className="flex flex-col hover:bg-gray-50 transition-all gap-5 justify-center items-center px-10 py-5 cursor-pointer bg-white border rounded-md">
                <Image
                  src="/images/controller_game.svg"
                  width={70}
                  height={70}
                  alt="main page"
                />
                <span>Play Online</span>
              </div>
            </button>
            <Link href="/" className="relative">
              <div className='absolute top-0 left-0 bg-black w-full h-full opacity-70 text-center text-white flex items-center justify-center text-xl rounded-md'>Soon</div>
              <div className="flex flex-col hover:bg-gray-50 transition-all gap-5 justify-center items-center px-10 py-5 cursor-pointer bg-white border rounded-md">
                <Image
                  src="/images/robot.svg"
                  width={70}
                  height={70}
                  alt="main page"
                />
                <span>Play Computer</span>
              </div>
            </Link>
            <Link href="/" className="relative">
              <div className='absolute top-0 left-0 bg-black w-full h-full opacity-70 text-center text-white flex items-center justify-center text-xl rounded-md'>Soon</div>
              <div className="flex flex-col hover:bg-gray-50 transition-all gap-5 justify-center items-center px-10 py-5 cursor-pointer bg-white border rounded-md">
                <Image
                  src="/images/cup.svg"
                  width={70}
                  height={70}
                  alt="main page"
                />
                <span>Tournaments</span>
              </div>
            </Link>

          </div>
        </div>
      </Suspense>
    </>
  );
}