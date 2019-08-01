import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

const Palette = ({ palette }) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");

  const colorBoxes = palette.colors[level].map(color => (
    <ColorBox background={color[format]} name={color.name} />
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
      />

      <div className="Palette-colors">{colorBoxes}</div>
      {/* footer */}
    </div>
  );
};

export default Palette;
