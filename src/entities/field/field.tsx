"use client";

import { Cell } from "@/models/Cell";
import React from "react";
import { Stage, Layer, Rect, Circle, Group } from "react-konva";

const fieldIntent = {
  black: "#b7c0d8",
  white: "#e8edf9",
  active: "rgba(123, 97, 255, 0.5)",
  activeField: "#BAAEFE",
  // fortress: "#F4F7FA",
  fortress: "",

  attackFigure: "#CD0000",
};

type FieldProps = {
  index: number;
  indexRow: number;
  intent: "black" | "white" | "active" | "fortress";
  cell: Cell;
  children: React.ReactNode;
  selected: boolean;
  clickField: (cell: Cell) => void;
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
  return (
    // <Stage width={75} height={75}>
    // <Layer onClick={() => clickField(cell)}>
    <Group
      x={indexRow * 75}
      y={index * 75}
      width={75}
      height={75}
      onClick={() => clickField(cell)}
    >
      <Rect
        x={0}
        y={0}
        width={75}
        height={75}
        fill={
          selected
            ? fieldIntent.activeField
            : cell.available && cell.figure?.color // for attack Figure field show red... Need to think about it
            ? fieldIntent.attackFigure
            : fieldIntent[intent]
        }
      />
      {intent === "fortress"
        ? null
        : cell.available &&
          !cell.figure && (
            <Circle x={37.5} y={37.5} radius={10} fill={fieldIntent.active} />
          )}
      {children}
    </Group>
  );
};

export { Field };
