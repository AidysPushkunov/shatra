"use client";

import React from "react";

import { BoardWidget } from "@/widgets/board";
import { Board } from "@/models/Board";

export default function Home() {
  const [board, setBoard] = React.useState(new Board());

  React.useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  return (
    <>
      <h1 className="flex text-[100px] text-red-700 justify-center">
        Telengit Shatra
      </h1>
      <p className="text-gray-400 text-center max-w-[750px] m-[auto] my-1">
        Shatra is an intellectual board game of the Telengit people. The goal of
        this project is to create an Internet platform for the game “Shatra” in
        real time between two people or with artificial intelligence.
      </p>
      <div className="flex items-center justify-center">
        <BoardWidget board={board} setBoard={setBoard} />
      </div>
    </>
  );
}
