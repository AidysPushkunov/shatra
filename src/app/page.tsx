"use client";

import React from "react";

import { BoardWidget } from "@/widgets/board";
import { Board } from "@/models/Board";
import { Player } from "@/models/Player";
import { Colors } from "@/models/Colors";
import { Timer } from "@/widgets/timer";
import { ShowCordinates } from "@/features/showCordinates";
import { Notation } from "@/widgets/notation";

const historyMovments: any[] = [];

export default function Home() {
  const [board, setBoard] = React.useState(new Board());
  const [whitePlayer, setWhitePlayer] = React.useState(
    new Player(Colors.WHITE)
  );

  const [onFortress, setOnFortress] = React.useState([]);

  const [blackPlayer, setBlackPlayer] = React.useState(
    new Player(Colors.BLACK)
  );
  const [currentPlayer, setCurrentPlayer] = React.useState<Player | null>(null);

  React.useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <div>
              <ShowCordinates numbers={true} />
            </div>
            <BoardWidget
              board={board}
              historyMovments={historyMovments}
              setBoard={setBoard}
              currentPlayer={currentPlayer}
              swapPlayer={swapPlayer}
            />
          </div>
          <div className="flex justify-center">
            <ShowCordinates numbers={false} />
          </div>
        </div>
        <Timer restart={restart} currentPlayer={currentPlayer} />
      </div>
      <div className="flex justify-center my-10">
        <Notation historyMovments={historyMovments} />
      </div>
    </>
  );
}
