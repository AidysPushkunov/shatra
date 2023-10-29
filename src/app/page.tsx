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
      <div className="text-red-700">Telengit Shatra</div>
      <p className="text-gray-400">
        Shatra is an intellectual board game of the Telengit people. The goal of
        this project is to create an Internet platform for the game “Shatra” in
        real time between two people or with artificial intelligence.
      </p>

      <BoardWidget board={board} setBoard={setBoard} />
    </>
  );
}
