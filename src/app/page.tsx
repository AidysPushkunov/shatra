"use client";

import {useState, useEffect} from "react";
import Image from 'next/image';

import { BoardWidget } from "@/widgets/board";
import { Board } from "@/models/Board";
import { Player } from "@/models/Player";
import { Colors } from "@/models/Colors";
import { Timer } from "@/widgets/timer";
import { ShowCoordinates } from "@/features/showCoordinates";
import { Notation } from "@/widgets/notation";

import _ from 'lodash';

let historyMovements: any[] = [];


export default function Home() {

  const [historyMovementsState, setHistoryMovementsState] =
    useState(historyMovements);
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);


  const [flipped, setFlipped] = useState(false)
  const [flippedCorrect, setFlippedCorrect] = useState(false)
 
  const [board, setBoard] = useState(new Board());


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

  useEffect((): void => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);


  function updateBoard(): void {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function swapPlayer(): void {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
    setTimeout((): void => updateBoard(), 305);
  }

  function restart(): void {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setHistoryMovementsState([]);
    historyMovements = [];
  }

  return (
    <>
      <div className="w-[70px] h-[100vh] bg-white drop-shadow-md  fixed">

      </div>
      <div className="flex justify-center ml-[70px]">
        {/* <div className="flex flex-col"> */}
          <div className="flex justify-center gap-20">
      

            {/* <div>
              <ShowCoordinates numbers={true} />
            </div> */}
            {/* <div  className="w-full h-full max-w-[30vw]"> */}
            <BoardWidget
              board={board}
              setHistoryMovementsState={setHistoryMovementsState}
              historyMovements={historyMovements}
              setBoard={setBoard}
              currentPlayer={currentPlayer}
              updateBoard={updateBoard}
              swapPlayer={swapPlayer}
              onUpdateBoard={(updatedBoard) => setBoard(updatedBoard)}
            />

<div className="flex items-start h-full mt-5">
  <div>
      <Notation
        historyMovements={historyMovements}
        historyMovementsState={historyMovementsState}
        currentPlayer={currentPlayer}
      />
      <Image className='cursor-pointer mt-5 hover:rotate-[-360deg] duration-300' src={'/images/reverse.svg'} width={30} height={30} alt={'reverse'} onClick={() => flipBoard()} />
    </div>
  </div>
     
            {/* </div> */}
{/* <Timer restart={restart} currentPlayer={currentPlayer} /> */}
          </div>
          {/* <div className="flex justify-center">
            <ShowCoordinates numbers={false} />
          </div> */}
        </div>
      {/* </div> */}

    </>
  );
}
