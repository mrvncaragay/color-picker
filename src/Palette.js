import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Palette = ({ palette }) => {
  const [level, setLevel] = useState(500);

  const colorBoxes = palette.colors[level].map(color => (
    <ColorBox background={color.hex} name={color.name} />
  ));

  const changeLevel = level => {
    setLevel(level);
  };

  return (
    <div className="Palette">
      <Slider
        defaultValue={level}
        min={100}
        max={900}
        onAfterChange={changeLevel}
        step={100}
      />
      {/* Navbar */}

      <div className="Palette-colors">{colorBoxes}</div>
      {/* footer */}
    </div>
  );
};

export default Palette;
