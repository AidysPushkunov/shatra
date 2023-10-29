import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import { FigureEntities } from "@/entities/figure";

export class Baatyr extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? FigureEntities : FigureEntities;
    this.name = FigureNames.BAATYR;
  }
}
