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
    <div className="flex-col justify-between bg-white drop-shadow-lg h-[40vh] rounded-md">
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
      <div className="grid grid-cols-[7%_45%_45%] w-full max-w-36 h-[25vh] gap-1 content-start overflow-y-scroll overflow-x-hidden scrollbar-hide">
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
