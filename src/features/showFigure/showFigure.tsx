import { Field } from "@/entities/field";
import { Cell } from "@/models/Cell";
import { FigureEntities } from "@/entities/figure";

type ShowFieldProps = {
  index: number;
  indexRow: number;
  intent: "black" | "white" | "active" | "fortress";
  cell: Cell;
  selected: boolean;
  clickField: (cell: Cell, figureRef: any, event: any) => void;
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
      key={cell.id}
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
