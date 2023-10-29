import React from "react";

import { Board } from "@/models/Board";
import { ShowFigure } from "@/features/showFigure";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardWidget: React.FC<BoardProps> = ({ board, setBoard }) => {
  return (
    <div className="flex flex-wrap w-[525px]">
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell) => (
            <ShowFigure intent={cell.color} key={cell.id} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export { BoardWidget };
