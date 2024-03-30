import { Colors } from "@/models/Colors";
import { Player } from "@/models/Player";
import React from "react";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: React.FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = React.useState(300);
  const [whiteTime, setWhiteTime] = React.useState(300);

  // поработать над временем

  // let hoursBlackTime = blackTime >= 3600 ? blackTime / 3600 : 0;
  let minutesBlackTime = blackTime >= 60 ? blackTime / 60 : 0;
  let secondsBlackTime = blackTime - Math.trunc(blackTime / 60) * 60;

  // let hoursWhiteTime = whiteTime >= 3600 ? whiteTime / 3600 : 0;
  let minutesWhiteTime = whiteTime >= 60 ? whiteTime / 60 : 0;
  let secondsWhiteTime = whiteTime - Math.trunc(whiteTime / 60) * 60;

  const timer = React.useRef<null | ReturnType<typeof setInterval>>(null);

  React.useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;

    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime((prev) => prev - 1);
  }

  function decrementWhiteTimer() {
    setWhiteTime((prev) => prev - 1);
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  };

  return (
    <div className="flex flex-col justify-between max-h-[100vh] w-[20vw] text-sm bg-stone-500">
      <div>
        <div className="font-semibold">Surname N.</div>
        <div className="flex items-center">
          <span className="relative flex h-2 w-2">
            {currentPlayer?.color === Colors.BLACK ? (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            ) : (
              <></>
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <div className="ml-3">
            {/* {hoursBlackTime < 10
              ? `0${Math.trunc(hoursBlackTime)}`
              : Math.trunc(hoursBlackTime)}
            : */}
            {minutesBlackTime < 10
              ? `0${Math.trunc(minutesBlackTime)}`
              : Math.trunc(minutesBlackTime)}
            :{secondsBlackTime < 10 ? `0${secondsBlackTime}` : secondsBlackTime}
          </div>
        </div>
      </div>
      {/* 
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div> */}

      <div className="mb-20">
        <div className="font-semibold">Amyrov A.</div>
        <div className="flex items-center">
          <span className="relative flex h-2 w-2">
            {currentPlayer?.color === Colors.WHITE ? (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            ) : (
              <></>
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <div className="ml-3">
            {/* {hoursWhiteTime < 10
              ? `0${Math.trunc(hoursWhiteTime)}`
              : Math.trunc(hoursWhiteTime)}
            : */}
            {minutesWhiteTime < 10
              ? `0${Math.trunc(minutesWhiteTime)}`
              : Math.trunc(minutesWhiteTime)}
            :{secondsWhiteTime < 10 ? `0${secondsWhiteTime}` : secondsWhiteTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Timer };
