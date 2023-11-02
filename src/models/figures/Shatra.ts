import { FigureEntities } from "@/entities/figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

const figureWhiteShatra = () => {
  return <FigureEntities intent="whiteShatra" />;
};

const figureBlackShatra = () => {
  return <FigureEntities intent="blackShatra" />;
};

export class Shatra extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? figureBlackShatra : figureWhiteShatra;
    this.name = FigureNames.SHATRA;
  }
}
