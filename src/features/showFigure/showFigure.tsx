import { Field } from "@/entities/field";
import { Cell } from "@/models/Cell";
import { FigureEntities } from "@/entities/figure";
import { Stage } from "react-konva";

type ShowFieldProps = {
  // state: any;
  arrayCanvasElements: any;
  handleDragStart: any;
  // onDragEnd: any;
  index: number;
  indexRow: number;
  intent: "black" | "white" | "active" | "fortress";
  cell: Cell;
  selected: boolean;
  clickField: (cell: Cell) => void;
};

const ShowFigure: React.FC<ShowFieldProps> = ({
  // state,
  arrayCanvasElements,
  handleDragStart,
  // onDragEnd,
  index,
  indexRow,
  intent,
  cell,
  selected,
  clickField,
}) => {
  return (
    <Field
      // state={state}
      // handleDragStart={handleDragStart}
      // onDragEnd={onDragEnd}
      key={cell.id}
      index={index}
      indexRow={indexRow}
      intent={intent}
      selected={selected}
      clickField={clickField}
      cell={cell}
    >
      <FigureEntities
        // state={state}
        arrayCanvasElements={arrayCanvasElements}
        intent={cell.figure?.logo}
        handleDragStart={handleDragStart}
        // onDragEnd={onDragEnd}
      />
    </Field>
  );
};

export { ShowFigure };
