import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import Loading from "@/app/loading";
import { Menu } from '@/widgets/menu';

export default function Home() {

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Menu />
        <div className="grid items-center justify-center w-full h-[100vh]">
          <div className="grid max-w-96 md:gid-rows-2 md:grid-cols-2 text-sm gap-2">
            <Link href="/game" >
              <div className="flex flex-col hover:bg-gray-50 transition-all gap-5 justify-center items-center px-10 py-5 cursor-pointer bg-white border rounded-md">
                <Image
                  src="/images/controller_game.svg"
                  width={70}
                  height={70}
                  alt="main page"
                />
                <span>Play Online</span>
              </div>
            </Link>
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