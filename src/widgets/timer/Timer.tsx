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
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Каралардыҥ ӧйи {blackTime}</h2>
      <h2>Актардыҥ ӧйи {whiteTime}</h2>
    </div>
  );
};

export { Timer };
