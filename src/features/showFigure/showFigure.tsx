import { Field } from "@/entities/field";
import { Cell } from "@/models/Cell";
import { FigureEntities } from "@/entities/figure";
import { Group } from "react-konva";

type ShowFieldProps = {
  index: number;
  indexRow: number;
  intent: "black" | "white" | "active" | "fortress";
  cell: Cell;
  selected: boolean;
  clickField: (cell: Cell, event: any) => void;
  cellRefs: any;
  updateCellRef: any;
};

const ShowFigure: React.FC<ShowFieldProps> = ({
  index,
  indexRow,
  intent,
  cell,
  selected,
  clickField,
  cellRefs,
  updateCellRef
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
      cellRefs={cellRefs}
      updateCellRef={updateCellRef}
    >
      <FigureEntities intent={cell} />
    </Field>
  );
};

export { ShowFigure };
