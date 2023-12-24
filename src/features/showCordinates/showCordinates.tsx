import { Coordinates } from "@/entities/coordinates";

type ShowCordinatesPropsType = {
  numbers: boolean;
};

const ShowCordinates: React.FC<ShowCordinatesPropsType> = ({ numbers }) => {
  const cordinatesNumber = [];
  const cordinatesAlphabet = ["A", "B", "C", "D", "E", "F", "G"];

  for (let i = 14; i >= 1; i--) {
    cordinatesNumber.push(i);
  }

  return (
    <div className={numbers ? "" : "flex"}>
      {numbers
        ? cordinatesNumber.map((e) => (
            <div className="mt-[48px] mb-[48px]">
              <Coordinates coordinat={e.toString()} />
            </div>
          ))
        : cordinatesAlphabet.map((e) => (
            <div className="ml-[37.5px] mr-[37.5px]">
              <Coordinates coordinat={e} />
            </div>
          ))}
    </div>
  );
};

export { ShowCordinates };
