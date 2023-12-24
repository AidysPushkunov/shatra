"use client";

import React from "react";

import { BoardWidget } from "@/widgets/board";
import { Board } from "@/models/Board";
import { Player } from "@/models/Player";
import { Colors } from "@/models/Colors";
import { LostFigures } from "@/widgets/lostFigures";
import { Timer } from "@/widgets/timer";
import { ShowCordinates } from "@/features/showCordinates";

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
      {<h3>Move: {currentPlayer?.color}</h3>}
      <div>
        {/* <LostFigures title="Black shatra: " figures={board.lostBlackFigures} />
        <LostFigures title="White shatra: " figures={board.lostWhiteFigures} /> */}
      </div>
      <Timer restart={restart} currentPlayer={currentPlayer} />

      <div className="flex justify-center my-14">
        <div>
          <ShowCordinates numbers={true} />
        </div>
        <BoardWidget
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
      </div>
      <div className="flex justify-center my-14">
        <ShowCordinates numbers={false} />
      </div>
    </>
  );
}
