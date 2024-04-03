import { useState, useEffect, Dispatch, SetStateAction } from "react";
import _ from 'lodash';
import { Board } from "@/models/Board";
import Image from 'next/image';

type FlippingBoardProps = {
  setBoard: Dispatch<SetStateAction<Board>>;
};

const FlippingBoard: React.FC<FlippingBoardProps> = ({setBoard}) => {
  const [flipped, setFlipped] = useState(false)
  const [flippedCorrect, setFlippedCorrect] = useState(false)


  useEffect(() => {
    if (!flipped && localStorage.getItem('flippedBoard') === 'true') {
      setFlippedCorrect(true);
    }
  }, [])


  useEffect(() => {
    if (flippedCorrect) {
      flipBoard()
    }
  }, [flippedCorrect])


  useEffect(() => {
    setBoard(prevBoard => {
      const newBoard = _.cloneDeep(prevBoard);
      newBoard.flipBoard();
      return newBoard;
    });

    localStorage.setItem('flippedBoard', flipped.toString()); 
}, [flipped])



  function flipBoard(): void {
    setFlipped(!flipped);
  }

  return (
    <Image className='cursor-pointer mt-5 hover:rotate-[-360deg] duration-300' src={'/images/reverse.svg'} width={30} height={30} alt={'reverse'} onClick={() => flipBoard()} />
  );
};

export { FlippingBoard };
