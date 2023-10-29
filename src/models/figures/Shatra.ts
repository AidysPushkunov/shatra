import { FigureEntities } from "@/entities/figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

export class Shatra extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? FigureEntities : FigureEntities;
    this.name = FigureNames.SHATRA;
  }
}
