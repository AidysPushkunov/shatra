"use client";

import React from "react";
import { Stage, Layer, Rect } from "react-konva";

const fieldIntent = {
  black: "#b7c0d8",
  white: "#e8edf9",
  active: "#7B61FF",
  fortress: "#F4F7FA",
};

type FieldProps = {
  intent: "black" | "white" | "active" | "fortress";
  children: React.ReactNode;
};

const Field: React.FC<FieldProps> = ({ intent, children }) => {
  return (
    <Stage width={75} height={75}>
      <Layer>
        <Rect
          x={0}
          y={0}
          width={75}
          height={75}
          fill={fieldIntent[intent]}
          shadowBlur={10}
        />
        {children}
      </Layer>
    </Stage>
  );
};

export { Field };
