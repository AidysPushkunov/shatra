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
    <div className="flex flex-col justify-between ml-20 w-[200px] text-2xl">
      <div>
        <div className="font-semibold">Surname N.</div>
        <div className="flex items-center">
          <span className="relative flex h-4 w-4">
            {currentPlayer?.color === Colors.BLACK ? (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            ) : (
              <></>
            )}
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
          <div className="ml-3">00:00:{blackTime}</div>
        </div>
      </div>

      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>

      <div className="mb-20">
        <div className="font-semibold">Amyrov A.</div>
        <div className="flex items-center">
          <span className="relative flex h-4 w-4">
            {currentPlayer?.color === Colors.WHITE ? (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            ) : (
              <></>
            )}
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
          <div className="ml-3">00:00:{whiteTime}</div>
        </div>
      </div>
    </div>
  );
};

export { Timer };
