"use client";

import { Cell } from "@/models/Cell";
import React from "react";
import { Rect, Circle, Group } from "react-konva";

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
  clickField: (cell: Cell, figureRef: any, event: any) => void;
};

const changePositionFigure = (figure: any, x: any, y: any) => {
  // use Konva methods to animate a shape
  figure.to({
    x: x,
    y: y,
    onFinish: () => {
      figure.to({
        scaleX: 1,
        scaleY: 1,
      });
    },
    duration: 0.2,
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
  const figureRef = React.useRef(null);

  const handleFigureClick = (e: any) => {
    console.log("Figure ref", e);
    if (e.target === Image) {
      console.log("success!!!");
    }

    // const figure: any = e.target;
    // changePositionFigure(figure, e.evt.x, e.evt.y);
  };

  return (
    <Group
      x={indexRow * 75}
      y={index * 75}
      width={75}
      height={75}
      ref={figureRef}
      onClick={(event) => {
        // console.log("x: ", event, " y: ", event.evt.y);
        // event?.target?.parent?.moveToTop();
        clickField(cell, figureRef, event);
      }}
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
