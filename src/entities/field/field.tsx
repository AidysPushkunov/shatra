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

const changePositionFigure = (figure: any) => {
  // use Konva methods to animate a shape
  figure.to({
    x: 124,
    y: 223,
    scaleX: 1.5,
    scaleY: 1.5,
    onFinish: () => {
      figure.to({
        scaleX: 1,
        scaleY: 1,
      });
    },
    duration: 2.5,
  });
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
  const fieldRef = React.useRef(null);

  const handleFigureClick = () => {
    // another way to access Konva nodes is to just use event object
    const field: any = fieldRef.current;
    changePositionFigure(field);
  };

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
        ref={fieldRef}
        onClick={handleFigureClick}
        onTap={handleFigureClick}
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
