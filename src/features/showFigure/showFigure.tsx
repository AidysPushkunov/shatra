import useImage from "use-image";
import { FigureEntities } from "@/entities/figure";
import { Field } from "@/entities/field";
import { Image } from "react-konva";
import { Cell } from "@/models/Cell";

type ShowFieldProps = {
  intent: "black" | "white" | "active" | "fortress";
};

const ShowFigure: React.FC<ShowFieldProps> = ({ intent }) => {
  let x = <FigureEntities intent="whiteBiy" />;
  const PlaceStamp = () => {
    const [image] = useImage(x.toString());
    return <Image image={image} x={1} y={1} width={75} height={75} />;
  };
  return (
    <Field intent={intent}>
      <PlaceStamp />
    </Field>
  );
};

export { ShowFigure };
