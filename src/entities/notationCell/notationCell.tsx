import React from "react";

type NotationCellProp = {
  children: string;
};

const NotationCell: React.FC<NotationCellProp> = ({ children }) => {
  return (
    <div
      className="flex justify-center items-center bg-[#fff] h-[50px] m-1 hover:bg-[#f4f4f4] cursor-pointer duration-75 text-2xl rounded-md"
    >
      {children}
    </div>
  );
};

export { NotationCell };
