"use client";

import { Cell } from "@/models/Cell";
import React from "react";
import { Rect, Circle, Group } from "react-konva";

const fieldIntent = {
  black: "#b7c0d8",
  white: "#e8edf9",
  active: "rgba(123, 97, 255, 0.5)",
  activeField: "#BAAEFE",
  fortress: "",
  attackFigure: "green",
};


// black: "#769656",
// white: "#EEEED2",
// active: "rgba(123, 97, 255, 0.5)",
// activeField: "#BAAEFE",
// fortress: "",
// attackFigure: "red",

type FieldProps = {
  index: number;
  indexRow: number;
  intent: "black" | "white" | "active" | "fortress";
  cell: Cell;
  children: React.ReactNode;
  selected: boolean;
  clickField: (cell: Cell, event: any) => void;
};

const Field: React.FC<FieldProps> = ({
  index,
  indexRow,
  intent,
  cell,
  children,
  selected,
  clickField,
}) => {
  const figureRef = React.useRef(null);

  return (
    <Group
      x={indexRow * 40}
      y={index * 40}
      width={40}
      height={40}
      ref={figureRef}
      onClick={(event) => {
        clickField(cell, event);
      }}
      onTap={(event) => {
        clickField(cell, event);
      }}
    >
      <Rect
        x={0}
        y={0}
        width={40}
        height={40}
        fill={selected ? fieldIntent.activeField : fieldIntent[intent]}
      />
      {intent === "fortress"
        ? null
        : cell.available &&
          !cell.figure && (
            <Circle
              x={20}
              y={20}
              radius={5}
              opacity={0.8}
              fill={
                cell.eatFieldAttack
                  ? fieldIntent.attackFigure
                  : fieldIntent.active
              }
            />
          )}
      {children}
    </Group>
  );
};

export { Field };
