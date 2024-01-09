import { Field } from "@/entities/field";
import { Cell } from "@/models/Cell";
import { FigureEntities } from "@/entities/figure";
import { Stage } from "react-konva";

type ShowFieldProps = {
  index: number;
  indexRow: number;
  intent: "black" | "white" | "active" | "fortress";
  cell: Cell;
  selected: boolean;
  clickField: (cell: Cell) => void;
};

const ShowFigure: React.FC<ShowFieldProps> = ({
  index,
  indexRow,
  intent,
  cell,
  selected,
  clickField,
}) => {
  return (
    <Field
      index={index}
      indexRow={indexRow}
      intent={intent}
      selected={selected}
      clickField={clickField}
      cell={cell}
    >
      <FigureEntities intent={cell.figure?.logo} />
    </Field>
  );
};

export { ShowFigure };
