import React from "react";

type notationElementType = {
  coordinate: string;
};

const Coordinates: React.FC<notationElementType> = ({ coordinate }) => {
  return (
    <div className="flex items-center justify-center w-[75px] h-[75px]">
      {coordinate}
    </div>
  );
};

export { Coordinates };
