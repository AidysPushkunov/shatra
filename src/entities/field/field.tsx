import React from "react";
import { cva } from "class-variance-authority";

const fieldVariants = cva("w-[75px] h-[75px]", {
  variants: {
    intent: {
      black: "bg-black-field",
      white: "bg-white-field",
      active: "bg-active-field",
      fortress: "bg-fortress-field",
    },
    size: {},
  },
});

type FieldProps = {
  intent: "black" | "white" | "active" | "fortress";
};

const Field: React.FC<FieldProps> = ({ intent }) => {
  return (
    <div
      className={fieldVariants({
        intent,
      })}
    ></div>
  );
};

export { Field };
