import React from "react";
import { Figure } from "@/models/figures/Figure";
// import { FigureEntities } from "@/entities/figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: React.FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div>
      <h3>{title}</h3>
      {figures.map((figure) => (
        <div key={figure.id}>
          {figure.name} {figure.logo}
        </div>
      ))}
    </div>
  );
};

export { LostFigures };
