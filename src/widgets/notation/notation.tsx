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
  currentPlayer: any;
};

const Notation: React.FC<NotationProp> = ({
  historyMovements,
  historyMovementsState,
  currentPlayer
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
    <div className="flex-col justify-between bg-white drop-shadow-lg  w-[30vw] h-[40vh] rounded-md">
      <div className="flex justify-start border-t-4 border-gray-100 gap-5 px-2 py-2 items-center">
      <span className="relative flex h-3 w-3">
            {currentPlayer?.color === Colors.BLACK ? (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            ) : (
              <></>
            )}
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <div>User Two</div>
      </div>
      <div className="grid grid-cols-[7%_45%_45%] w-[30vw] h-[25vh] gap-1 content-start overflow-y-scroll overflow-x-hidden scrollbar-hide">
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

      <div className="flex justify-start gap-5 border-b-4 border-gray-100 px-2 py-2 items-center">
      <span className="relative flex h-3 w-3">
            {currentPlayer?.color === Colors.WHITE ? (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            ) : (
              <></>
            )}
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <div>User One</div>
      </div>
    </div>
  );
};

export { Notation };
