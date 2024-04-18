import { Cell } from "@/models/Cell";
import React, { useEffect, useRef } from "react";
import { Rect, Circle, Group, Text } from "react-konva";

const fieldIntent = {
  black: "#b7c0d8",
  white: "#e8edf9",
  active: "rgba(123, 97, 255, 0.5)",
  activeField: "#BAAEFE",
  fortress: "",
  attackFigure: "green",
};

type FieldProps = {
  index: number;
  indexRow: number;
  intent: "black" | "white" | "active" | "fortress";
  cell: Cell;
  children: React.ReactNode;
  selected: boolean;
  clickField: (cell: Cell, event: any) => void;
  cellRefs: any;
  updateCellRef: (row: number, col: number, ref: any) => void;
};

const Field: React.FC<FieldProps> = ({
  index,
  indexRow,
  intent,
  cell,
  children,
  selected,
  clickField,
  cellRefs,
  updateCellRef
}) => {
  const groupRef = useRef(null);

  useEffect(() => {
    updateCellRef(indexRow, index, groupRef);
  }, [index, indexRow, updateCellRef]);

  const isTopRow = index === 0;
  const isBottomRow = index === 13;
  const isLeftColumn = indexRow === 0;
  const isRightColumn = indexRow === 6;

  const coordinateName = cell.coordinate.match(/^([A-G]+)(\d+)$/);

  return (
    <Group
      x={indexRow * 40}
      y={index * 40}
      width={40}
      height={40}
      ref={groupRef}
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
      {isBottomRow && coordinateName && (
        <Text
          x={-2}
          y={-1}
          width={40}
          height={40}
          align={"right"}
          verticalAlign={'bottom'}
          fontSize={8}
          text={`${coordinateName[1]}`}
          fill="gray"
        />
      )}
      {isLeftColumn && coordinateName && (
        <Text
          x={2}
          y={2}
          width={40}
          height={40}
          verticalAlign={'top'}
          fontSize={8}
          text={`${coordinateName[2]}`}
          fill="gray"
        />
      )}
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
