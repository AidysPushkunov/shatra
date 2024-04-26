'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Menu = () => {
    const [showNavigation, setShowNavigation] = useState(false);

    function handleNavigation() {
        setShowNavigation(!showNavigation);
    }

    useEffect(() => {
        document.body.style.overflow = showNavigation ? 'hidden' : '';
    }, [showNavigation]);

    return (
        <>
            <div
                onClick={() => handleNavigation()}
                id='burger'
                className={showNavigation ? 'active group relative z-20 block h-5 w-6 cursor-pointer md:hidden m-5' : 'm-5 group relative z-20 block h-5 w-6 cursor-pointer md:hidden'}
            >
                <div className='absolute left-0 top-0 h-[1.5px] w-full rounded-sm bg-gray-400 transition-transform group-[.active]:translate-y-2 group-[.active]:rotate-45'></div>
                <div className='absolute left-0 top-1/2 h-[1.5px] w-full rounded-sm bg-gray-400 transition-opacity group-[.active]:opacity-0'></div>
                <div className='absolute bottom-0 left-0 h-[1.5px] w-full rounded-sm bg-gray-400 transition-transform group-[.active]:-translate-y-[11px] group-[.active]:-rotate-45'></div>{' '}
            </div>
            <div className={
                showNavigation
                    ? "fixed left-0 md:top-0 z-10 h-full w-full translate-x-0 bg-[#F8F9FD] pt-0 text-center font-montserrat text-sm transition-transform"
                    : "hidden md:fixed z-10 text-xs transition-transform top-0 left-0 h-full bg-white md:flex flex-col justify-start items-start"
            }>

                <Link href="/" className="p-2 w-full flex flex-col justify-center hover:bg-gray-100 transition-all rounded-sm items-center gap-2 text-gray-500">
                    <Image
                        src="/images/target.png"
                        width={30}
                        height={30}
                        alt="main page"
                    />
                    <div className="text-center">Main</div>
                </Link>


                <Link href="/education" className="p-2 w-full flex flex-col justify-center hover:bg-gray-100 transition-all rounded-sm items-center gap-2 text-gray-500">

                    <Image
                        src="/images/education.png"
                        width={30}
                        height={30}
                        alt="main page"
                    />
                    <div className="text-center">Education</div>
                </Link>




                <Link href="/settings" className="p-2 w-full flex flex-col justify-end hover:bg-gray-100 transition-all rounded-sm items-center gap-2 text-gray-500">
                    <Image
                        src="/images/settings.png"
                        width={30}
                        height={30}
                        alt="main page"
                    />
                    <div className="text-center">Settings</div>
                </Link>
            </div>
        </>
    )
}

export { Menu }