import { Coordinates } from "@/entities/coordinates";

type ShowCordinatesPropsType = {
  numbers: boolean;
};

const ShowCordinates: React.FC<ShowCordinatesPropsType> = ({ numbers }) => {
  const cordinatesNumber = [];
  const cordinatesAlphabet = ["", "A", "B", "C", "D", "E", "F", "G"];

  for (let i = 14; i >= 1; i--) {
    cordinatesNumber.push(i);
  }

  return (
    <div className={numbers ? "text-2xl" : "text-2xl flex"}>
      {numbers
        ? cordinatesNumber.map((e) => (
            <div className="" key={e}>
              <Coordinates coordinat={e.toString()} />
            </div>
          ))
        : cordinatesAlphabet.map((e) => (
            <div className="" key={e}>
              <Coordinates coordinat={e} />
            </div>
          ))}
    </div>
  );
};

export { ShowCordinates };
