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
  historyMovements: any;
  historyMovementsState: any;
};

const Notation: React.FC<NotationProp> = ({
  historyMovements,
  historyMovementsState,
}) => {
  historyMovements.map((e: any, index: any) => {
    movementsNotation.push({
      number: index,
      whiteMove: notationSymbolY[e.y] + notationSymbolX[e.x],
      blackMove: "B9-A8",
    });
  });

  let checkedFigureCoordinateWhite: any;
  let movedFigureCoordinateWhite: any;
  let checkedFigureCoordinateBlack: any;
  let movedFigureCoordinateBlack: any;
  let numberMove = 1;

  return (
    <div className="grid grid-cols-[10%_45%_45%] content-start overflow-y-scroll scrollbar-hide bg-slate-100 w-[300px] max-h-40 p-[10px] rounded-md">
      {historyMovementsState.map((e: any, index: any) => {
        if (e.currentPlayer === Colors.WHITE) {
          e.checkedX
            ? (checkedFigureCoordinateWhite =
                notationSymbolX[e.checkedX] + notationSymbolY[e.checkedY])
            : (movedFigureCoordinateWhite =
                notationSymbolX[e.movedX] + notationSymbolY[e.movedY]);
        } else {
          e.checkedX
            ? (checkedFigureCoordinateBlack =
                notationSymbolX[e.checkedX] + notationSymbolY[e.checkedY])
            : (movedFigureCoordinateBlack =
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
                    movedFigureCoordinateWhite}
                </NotationCell>
              </React.Fragment>
            );
          }
        } else {
          if (e.moveFigure) {
            return (
              <NotationCell key={index}>
                {checkedFigureCoordinateBlack +
                  "-" +
                  movedFigureCoordinateBlack}
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
