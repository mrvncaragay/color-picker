import React from "react";
import { Link } from "react-router-dom";
import MiniPalalette from "./MiniPalette";

const PaletteList = ({ palettes }) => {
  return (
    <div>
      <MiniPalalette />
      {palettes.map(palette => (
        <p>
          <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        </p>
      ))}
    </div>
  );
};

export default PaletteList;
