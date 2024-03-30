import React from "react";

type NotationCellProp = {
  children: string;
};

const NotationCell: React.FC<NotationCellProp> = ({ children }) => {
  return (
    <div
      className="flex justify-center items-center bg-[#F7F6F5] h-7 hover:drop-shadow-lg cursor-pointer duration-75 text-sm rounded-sm"
    >
      {children}
    </div>
  );
};

export { NotationCell };
