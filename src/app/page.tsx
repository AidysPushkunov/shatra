'use client'

import { useState, useEffect } from 'react';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import Loading from "@/app/loading";
import { Menu } from '@/widgets/menu';

import { io, Socket } from 'socket.io-client';
import { useSocket } from '@/contexts/socketContext';



export default function Home() {
  const socket = useSocket();
  const router = useRouter();
  const path = usePathname();
  console.log("asPath ", path);

  const [gameId, setGameId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  // const [socket, setSocket] = useState<Socket | null>(null);

  const handlePlayOnline = () => {
    if (socket) {
      console.log('Attempting to join or create game...');
      const playerId = socket.id; // Используем socket.id как playerId

      socket.emit('joinOrCreate', { playerId }); // Отправляем событие на сервер с playerId

      socket.on('gameReady', (gameId: string) => {
        console.log('Received game ID:', gameId);
        router.push(`/game/${gameId}?gameId=${gameId}&playerId=${playerId}`); // Перенаправляем на страницу игры с gameId
      });
    } else {
      console.error('Socket is null. Cannot join or create game.');
    }
  };


  useEffect(() => {
    return () => {
      if (socket) {
        socket.off('gameReady');
      }
    };
  }, [socket]);


  // useEffect(() => {
  //   if (socket) {
  //     socket.on('gameReady', (gameId: string) => {
  //       console.log('Game is ready with ID:', gameId);
  //       setGameId(gameId);
  //       router.push(`/game/${gameId}?playerId=${playerId}`);
  //     });

  //     return () => {
  //       socket.off('gameReady');
  //     };
  //   }
  // }, [socket, router, playerId]);


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
            <button onClick={handlePlayOnline}>
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