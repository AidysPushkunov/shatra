import React from "react";
import { NotationCell } from "@/entities/notationCell";
import { Colors } from "@/models/Colors";


type NotationProp = {
  historyMovements: any;
  historyMovementsState: any;
  currentPlayer: any;
};

const Notation: React.FC<NotationProp> = ({
  historyMovementsState,
  currentPlayer
}) => {

  let checkedFigureCoordinateWhite: any;
  let movedFigureCoordinateWhite: any;
  let checkedFigureCoordinateBlack: any;
  let movedFigureCoordinateBlack: any;
  let numberMove = 1;

  return (
    <div className="flex-col justify-between bg-white drop-shadow-lg h-[40vh] w-96 rounded-md">
      <div className="grid grid-cols-[7%_45%_45%] h-[40vh] gap-1 content-start overflow-y-scroll overflow-x-hidden scrollbar-hide">
        {historyMovementsState.map((e: any, index: any) => {
          if (e.currentPlayer === Colors.WHITE) {
            e.checkedX
              ? (checkedFigureCoordinateWhite = e.coordinateChecked)
              : (movedFigureCoordinateWhite = e.coordinate);
          } else {
            e.checkedX
              ? (checkedFigureCoordinateBlack = e.coordinateChecked)
              : (movedFigureCoordinateBlack = e.coordinate);
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
    </div>
  );
};

export { Notation };
