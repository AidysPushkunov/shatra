import React from "react";
import { NotationCell } from "@/entities/notationCell";

const notationSymbolY: any[] = [
  "14",
  "13",
  "12",
  "11",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
];

const notationSymbolX: any[] = ["A", "B", "C", "D", "E", "F", "G"];

const movementsNotation: any[] = [
  { number: 1, whiteMove: "B6-A7", blackMove: "B9-A8" },
  { number: 2, whiteMove: "B6-A7", blackMove: "B9-A8" },
];

type NotationProp = {
  historyMovments: any;
};

const Notation: React.FC<NotationProp> = ({ historyMovments }) => {
  // movementsNotation.push(historyMovments);
  historyMovments.map((e: any, index: any) => {
    movementsNotation.push({
      number: index,
      whiteMove: notationSymbolY[e.y] + notationSymbolX[e.x],
      blackMove: "B9-A8",
    });
  });

  return (
    <div className="flex justify-start flex-wrap overflow-y-scroll scrollbar-hide bg-[#eef3f6] w-[800px] max-h-[400px] p-[10px] rounded-md">
      {historyMovments.map((e: any, index: any) => {
        return (
          <NotationCell index={false} key={index}>
            {notationSymbolX[e.x] + notationSymbolY[e.y]}
          </NotationCell>
        );
      })}
    </div>
  );
};

export { Notation };
