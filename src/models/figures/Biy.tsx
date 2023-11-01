import { FigureEntities } from "@/entities/figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

const figureWhiteBiy = () => {
  return <FigureEntities intent="whiteBiy" />;
};

const figureBlackBiy = () => {
  return <FigureEntities intent="blackBiy" />;
};

export class Biy extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? figureBlackBiy : figureWhiteBiy;
    this.name = FigureNames.BIY;
  }
}
