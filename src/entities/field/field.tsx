"use client";

import { Cell } from "@/models/Cell";
import React from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";

const fieldIntent = {
  black: "#b7c0d8",
  white: "#e8edf9",
  active: "#7B61FF",
  fortress: "#F4F7FA",
};

type FieldProps = {
  intent: "black" | "white" | "active" | "fortress";
  cell: Cell;
  children: React.ReactNode;
  selected: boolean;
  clickField: (cell: Cell) => void;
};

const Field: React.FC<FieldProps> = ({
  intent,
  cell,
  children,
  selected,
  clickField,
}) => {
  return (
    <Stage width={75} height={75}>
      <Layer onClick={() => clickField(cell)}>
        <Rect
          x={0}
          y={0}
          width={75}
          height={75}
          fill={selected ? fieldIntent.active : fieldIntent[intent]}
          shadowBlur={10}
        />
        {intent === "fortress" ? (
          <></>
        ) : (
          <Circle x={37.5} y={37.5} radius={10} fill="#7B61FF" />
        )}
        {children}
      </Layer>
    </Stage>
  );
};

export { Field };
