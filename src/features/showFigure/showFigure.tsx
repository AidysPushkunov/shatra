import { Field } from "@/entities/field";
import { Cell } from "@/models/Cell";
import { FigureEntities } from "@/entities/figure";

type ShowFieldProps = {
  intent: "black" | "white" | "active" | "fortress";
  cell: Cell;
  selected: boolean;
  clickField: (cell: Cell) => void;
};

const ShowFigure: React.FC<ShowFieldProps> = ({
  intent,
  cell,
  selected,
  clickField,
}) => {
  return (
    <Field
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
