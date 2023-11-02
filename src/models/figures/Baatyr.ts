import { FigureEntities } from "@/entities/figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

const figureWhiteBaatyr = () => {
  return <FigureEntities intent="blackBaatyr" />;
};

const figureBlackBaatyr = () => {
  return <FigureEntities intent="blackBaatyr" />;
};

export class Baatyr extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? figureWhiteBaatyr : figureBlackBaatyr;
    this.name = FigureNames.BAATYR;
  }
}
