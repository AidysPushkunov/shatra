import React from "react";

import { Board } from "@/models/Board";
import { ShowFigure } from "@/features/showFigure";
import { Cell } from "@/models/Cell";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardWidget: React.FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = React.useState<Cell | null>();

  function clickField(cell: Cell) {
    if (cell.figure) {
      setSelectedCell(cell);
    }
  }

  return (
    <div className="flex flex-wrap w-[525px]">
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell) => (
            <ShowFigure
              clickField={clickField}
              intent={cell.color}
              cell={cell}
              key={cell.id}
              selected={
                cell.x === selectedCell?.x && cell.y === selectedCell?.y
              }
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export { BoardWidget };
