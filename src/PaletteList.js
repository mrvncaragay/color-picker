import React from "react";
import { Link } from "react-router-dom";
import MiniPalalette from "./MiniPalette";

const PaletteList = ({ palettes }) => {
  return (
    <div>
      {palettes.map(palette => (
        <MiniPalalette {...palette} />
      ))}
    </div>
  );
};

export default PaletteList;
