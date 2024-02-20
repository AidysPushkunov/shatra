import { Coordinates } from "@/entities/coordinates";

type ShowCoordinatesPropsType = {
  numbers: boolean;
};

const coordinatesNumber: number[] = [];
const coordinatesAlphabet: string[] = ["", "A", "B", "C", "D", "E", "F", "G"];

for (let i = 14; i >= 1; i--) {
  coordinatesNumber.push(i);
}

const ShowCoordinates: React.FC<ShowCoordinatesPropsType> = ({ numbers }) => {
  return (
    <div className={numbers ? "text-2xl" : "text-2xl flex"}>
      {numbers
        ? coordinatesNumber.map((e) => (
            <div className="" key={e}>
              <Coordinates coordinate={e.toString()} />
            </div>
          ))
        : coordinatesAlphabet.map((e) => (
            <div className="" key={e}>
              <Coordinates coordinate={e} />
            </div>
          ))}
    </div>
  );
};

export { ShowCoordinates };
