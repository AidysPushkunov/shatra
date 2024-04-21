'use client'

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import Loading from "@/app/loading";
import { Menu } from '@/widgets/menu';
import SearchGif from '@/../public/gifs/search.gif';
import { useSocket } from '@/contexts/socketContext';



export default function Home() {
  const socket = useSocket();
  const router: any = useRouter();

  const [loading, setLoading] = useState(false);

  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on('onlineCount', (count: number) => {
        setOnlineCount(count);
      });

      return () => {
        socket.off('onlineCount');
      };
    } else {
      console.error('Socket is null. Cannot join or create game.');
    }
  }, [socket]);


  const handlePlayOnline = () => {
    if (socket) {
      setLoading(true)
      const playerId = socket.id;

      socket.emit('joinOrCreate', { playerId });

      socket.on('gameReady', (gameId: string, playrColor: string) => {
        router.push(`/game/${gameId}?gameId=${gameId}&playerId=${playerId}&playerColor=${playrColor}`);
        setLoading(false)
      });
    } else {
      console.error('Socket is null. Cannot join or create game.');
    }
  };

  const handleStopSearch = () => {
    if (socket) {
      setLoading(false);
      socket.emit('stopSearch');
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


  return (
    <>
      <Suspense fallback={<Loading />}>
        <Menu />
        <div className="grid items-center justify-center w-full h-[100vh]">
          {loading ? (
            <div className="fixed flex-col top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
              <Image src={SearchGif} alt="my gif" height={300} width={300} />
              <div >
                <div>Search players...</div>
                <div onClick={handleStopSearch} className='cursor-pointer'>Stop to search</div>
              </div>
            </div>
          ) : null}
          <div className="grid max-w-96 md:gid-rows-2 md:grid-cols-2 text-sm gap-2">
            <button onClick={handlePlayOnline}>
              <div className="flex flex-col hover:bg-gray-50 transition-all gap-5 justify-center items-center px-10 py-5 cursor-pointer bg-white border rounded-md">
                <Image
                  src="/images/controller_game.svg"
                  width={60}
                  height={60}
                  alt="main page"
                />
                <div>
                  <span className="text-xl">Play</span>
                  <div className="text-green-300">Online: {onlineCount}</div>
                </div>
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