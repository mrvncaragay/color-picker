import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "./Palette.css";

const Palette = ({ palette }) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");

  const colorBoxes = palette.colors[level].map(color => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      colorUrl={`/palette/${palette.id}/${color.id}`}
      showingFullPalette={true}
    />
  ));

  const changeLevel = level => {
    setLevel(level);
  };

  const changeFormat = val => {
    setFormat(val);
  };

  return (
    <div className="Palette">
      <Navbar
        changeLevel={changeLevel}
        level={level}
        changeFormat={changeFormat}
        showAllColors={true}
      />

      <div className="Palette-colors">{colorBoxes}</div>
      <PaletteFooter palette={palette} />
    </div>
  );
};

export default Palette;
