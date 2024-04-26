"use client";

import { Suspense } from 'react';
import Loading from "@/app/loading";
import { Menu } from '@/widgets/menu';
import Image from 'next/image';

export default function Home() {

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Menu />
                <div className="flex justify-center ml-[70px] mt-10 mb-20">
                    <div className="grid md:flex justify-center gap-12 max-w-[700px]">
                        <Image src={"/images/board.png"} alt="board_altai_shatra" height={300} width={300} />
                        <div>
                            <h1 className="font-medium my-5">Settings</h1>
                            <p>
                                From this page you can edit and customize the gameplay to your liking in the future. This functionality is currently under development and will become available in the near future.
                            </p>
                        </div>
                    </div>
                </div>
            </Suspense>
        </>
    );
}