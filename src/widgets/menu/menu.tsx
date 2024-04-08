import React from 'react'
import Link from 'next/link';
import Image from 'next/image'

const Menu = () => {
    return (
        <div className="fixed group transition-transform top-0 left-o h-full bg-white flex flex-col justify-start item-start">

            <Link href="/" className="flex justify-start hover:bg-gray-50 transition-all rounded-sm p-5 item-center gap-2 text-gray-500">
                <Image
                    src="/images/target.png"
                    width={30}
                    height={30}
                    alt="main page"
                />
                <div className="hidden group-hover:block">Main</div>
            </Link>



            <Link href="/game" className="flex justify-start hover:bg-gray-50 transition-all rounded-sm p-5 item-center gap-2 text-gray-500">
                <Image
                    src="/images/controller.png"
                    width={30}
                    height={30}
                    alt="main page"
                />
                <div className="hidden group-hover:block">Game</div>
            </Link>




            <Link href="/education" className="flex justify-start hover:bg-gray-50 transition-all rounded-sm p-5 item-center gap-2 text-gray-500">

                <Image
                    src="/images/education.png"
                    width={30}
                    height={30}
                    alt="main page"
                />
                <div className="hidden group-hover:block">Education</div>
            </Link>




            <Link href="/settings" className="flex justify-start hover:bg-gray-50 transition-all rounded-sm p-5 item-center gap-2 text-gray-500">
                <Image
                    src="/images/settings.png"
                    width={30}
                    height={30}
                    alt="main page"
                />
                <div className="hidden group-hover:block">Settings</div>
            </Link>
        </div>
    )
}

export { Menu }