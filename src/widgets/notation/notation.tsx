import React from "react";
import { NotationCell } from "@/entities/notationCell";
import { Colors } from "@/models/Colors";

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
  historyMovmentsState: any;
};

const Notation: React.FC<NotationProp> = ({
  historyMovments,
  historyMovmentsState,
}) => {
  historyMovments.map((e: any, index: any) => {
    movementsNotation.push({
      number: index,
      whiteMove: notationSymbolY[e.y] + notationSymbolX[e.x],
      blackMove: "B9-A8",
    });
  });

  let checkedFigureCoordinateWhite: any;
  let movedFgureCoordinateWhite: any;
  let checkedFigureCoordinateBlack: any;
  let movedFgureCoordinateBlack: any;
  let numberMove = 1;

  return (
    <div className="grid grid-cols-[100px_390px_390px] content-start overflow-y-scroll scrollbar-hide bg-[#eef3f6] w-[900px] h-96 p-[10px] rounded-md">
      {historyMovmentsState.map((e: any, index: any) => {
        if (e.currentPlayer === Colors.WHITE) {
          e.checkedX
            ? (checkedFigureCoordinateWhite =
                notationSymbolX[e.checkedX] + notationSymbolY[e.checkedY])
            : (movedFgureCoordinateWhite =
                notationSymbolX[e.movedX] + notationSymbolY[e.movedY]);
        } else {
          e.checkedX
            ? (checkedFigureCoordinateBlack =
                notationSymbolX[e.checkedX] + notationSymbolY[e.checkedY])
            : (movedFgureCoordinateBlack =
                notationSymbolX[e.movedX] + notationSymbolY[e.movedY]);
        }

        if (e.currentPlayer === Colors.WHITE) {
          if (e.moveFigure) {
            return (
              <React.Fragment key={index}>
                <NotationCell>{String(numberMove++)}</NotationCell>
                <NotationCell>
                  {checkedFigureCoordinateWhite +
                    "-" +
                    movedFgureCoordinateWhite}
                </NotationCell>
              </React.Fragment>
            );
          }
        } else {
          if (e.moveFigure) {
            return (
              <NotationCell key={index}>
                {checkedFigureCoordinateBlack + "-" + movedFgureCoordinateBlack}
              </NotationCell>
            );
          }
        }

        return null;
      })}
    </div>
  );
};

export { Notation };
