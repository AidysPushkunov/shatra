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

  function flipBoard() {
    const newBoard = board.getCopyBoard();
    newBoard.flipBoard();
    setBoard(newBoard);
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
    setTimeout(() => updateBoard(), 305);
  }

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setHistoryMovementsState([]);
    historyMovements = [];
  }

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <div>
              <ShowCoordinates numbers={true} />
            </div>
            <BoardWidget
              board={board}
              setHistoryMovementsState={setHistoryMovementsState}
              historyMovements={historyMovements}
              setBoard={setBoard}
              currentPlayer={currentPlayer}
              updateBoard={updateBoard}
              swapPlayer={swapPlayer}
            />
          </div>
          <div className="flex justify-center">
            <ShowCoordinates numbers={false} />
          </div>
        </div>
        <Timer restart={restart} currentPlayer={currentPlayer} />
        <button onClick={flipBoard}>Перевернуть доску</button>
      </div>
      <div className="flex justify-center my-10">
        <Notation
          historyMovements={historyMovements}
          historyMovementsState={historyMovementsState}
        />
      </div>
    </>
  );
}
