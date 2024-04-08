"use client";

import { Suspense } from 'react';
import Loading from "@/app/loading";
import { Menu } from '@/widgets/menu';


export default function Home() {

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Menu />
        <div className="flex justify-center ml-[70px]">
          Welcome! To our shatra game
        </div>
      </Suspense>
    </>
  );
}