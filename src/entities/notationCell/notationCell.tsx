import React from "react";

type NotationCellProp = {
  children: string;
  index: boolean | null | undefined;
};

const NotationCell: React.FC<NotationCellProp> = ({ children, index }) => {
  return (
    <div
      className={
        index
          ? "px-[5%] flex justify-center items-center bg-[#fff] h-[50px] m-1 hover:bg-[#f4f4f4] cursor-pointer duration-75 text-2xl rounded-md"
          : "px-[15%] flex justify-center items-center bg-[#fff] h-[50px] m-1 hover:bg-[#f4f4f4] cursor-pointer duration-75 text-2xl rounded-md"
      }
    >
      {children}
    </div>
  );
};

export { NotationCell };
