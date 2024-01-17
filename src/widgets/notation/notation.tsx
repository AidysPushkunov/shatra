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

  let checkedFigureCoordinateWhite: any;
  let movedFgureCoordinateWhite: any;
  let checkedFigureCoordinateBlack: any;
  let movedFgureCoordinateBlack: any;
  let numberMove = 1;

  return (
    <div className="grid grid-cols-[100px_335px_335px] overflow-y-scroll scrollbar-hide bg-[#eef3f6] w-[800px] max-h-[400px] p-[10px] rounded-md">
      {historyMovments.map((e: any, index: any) => {
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

        return (
          <>
            {e.currentPlayer === Colors.WHITE ? (
              e.checkedX ? (
                <></>
              ) : (
                <>
                  <NotationCell index={true} key={index}>
                    {String(numberMove++)}
                  </NotationCell>
                  <NotationCell index={false} key={index}>
                    {checkedFigureCoordinateWhite +
                      "-" +
                      movedFgureCoordinateWhite}
                  </NotationCell>
                </>
              )
            ) : e.checkedX ? (
              <></>
            ) : (
              <>
                <NotationCell index={false} key={index}>
                  {checkedFigureCoordinateBlack +
                    "-" +
                    movedFgureCoordinateBlack}
                </NotationCell>
              </>
            )}
          </>
        );
      })}
    </div>
  );
};

export { Notation };
