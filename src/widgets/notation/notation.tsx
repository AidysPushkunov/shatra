import React from "react";
import { NotationCell } from "@/entities/notationCell";

const Notation: React.FC = () => {
  return (
    <div className="flex justify-center flex-wrap overflow-y-scroll scrollbar-hide bg-[#eef3f6] w-[800px] h-[400px] p-[10px] rounded-md">
      <NotationCell index={true}>1</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>

      <NotationCell index={true}>2</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>

      <NotationCell index={true}>3</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>

      <NotationCell index={true}>4</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>

      <NotationCell index={true}>1</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>

      <NotationCell index={true}>2</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>

      <NotationCell index={true}>3</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>

      <NotationCell index={true}>4</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>

      <NotationCell index={true}>1</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>

      <NotationCell index={true}>2</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>

      <NotationCell index={true}>3</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>

      <NotationCell index={true}>4</NotationCell>
      <NotationCell index={false}>B6-A7</NotationCell>
      <NotationCell index={false}>B9-A8</NotationCell>
    </div>
  );
};

export { Notation };
