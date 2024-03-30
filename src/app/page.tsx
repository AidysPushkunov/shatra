"use client";

import React from "react";

import { BoardWidget } from "@/widgets/board";
import { Board } from "@/models/Board";
import { Player } from "@/models/Player";
import { Colors } from "@/models/Colors";
import { Timer } from "@/widgets/timer";
import { ShowCoordinates } from "@/features/showCoordinates";
import { Notation } from "@/widgets/notation";

let historyMovements: any[] = [];

export default function Home() {
  const [historyMovementsState, setHistoryMovementsState] =
    React.useState(historyMovements);
  const [board, setBoard] = React.useState(new Board());

  const [whitePlayer] = React.useState(new Player(Colors.WHITE));

  const [blackPlayer] = React.useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = React.useState<Player | null>(null);

  React.useEffect((): void => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  // function flipBoard(): void {
  //   const newBoard = board.getCopyBoard();
  //   newBoard.flipBoard();
  //   setBoard(newBoard);
  // }

  function updateBoard(): void {
    const newBoard = board.getCopyBoard();
    console.log('This is board: ', newBoard)
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
            />

<div className="flex items-start h-full mt-5">
      <Notation
          historyMovements={historyMovements}
          historyMovementsState={historyMovementsState}
          currentPlayer={currentPlayer}
        />
      </div>
     
            {/* </div> */}
{/* <Timer restart={restart} currentPlayer={currentPlayer} /> */}
          </div>
          {/* <div className="flex justify-center">
            <ShowCoordinates numbers={false} />
          </div> */}
        </div>

        {/* <button onClick={flipBoard}>Перевернуть доску</button> */}
      {/* </div> */}

    </>
  );
}
