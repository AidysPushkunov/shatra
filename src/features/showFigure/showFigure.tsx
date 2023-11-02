
import { Field } from "@/entities/field";
import { Cell } from "@/models/Cell";
import { FigureEntities } from "@/entities/figure";



type ShowFieldProps = {
  intent: "black" | "white" | "active" | "fortress";
  cell: Cell;
};


const ShowFigure: React.FC<ShowFieldProps> = ({ intent, cell }) => {
  return (
    <Field intent={intent}>
      <FigureEntities intent="blackBaatyr" />
    </Field>
  );
};

export { ShowFigure };
