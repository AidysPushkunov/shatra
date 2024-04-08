import Image from 'next/image';
import LoaderGif from '@/../public/loader_blocks.gif';

const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center h-screen py-[auto]">
          <div className="text-center">
            <Image src={LoaderGif} alt="my gif" height={200} width={200} />
            <h1>Shatra.com</h1>
          </div>
      </div>
    )
}


export { LoadingPage }

