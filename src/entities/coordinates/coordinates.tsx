import React from "react";

type notationElementType = {
  coordinat: string;
};

const Coordinates: React.FC<notationElementType> = ({ coordinat }) => {
  return <div>{coordinat}</div>;
};

export { Coordinates };
