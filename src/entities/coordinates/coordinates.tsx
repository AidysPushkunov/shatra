import React from "react";

type notationElementType = { 
  coordinat: string;
};

const Coordinates: React.FC<notationElementType> = ({ coordinat }) => {
  return (
    <div className="flex items-center justify-center w-[75px] h-[75px]">
      {coordinat}
    </div>
  );
};

export { Coordinates };
