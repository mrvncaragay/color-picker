import React, { useState } from "react";
import Slider from "rc-slider";
import { Select, MenuItem } from "@material-ui/core";
import "rc-slider/assets/index.css";
import "./Navbar.css";

const Navbar = ({ level, changeLevel, changeFormat }) => {
  const [format, setFormat] = useState("hex");

  const handleChangeFormat = e => {
    setFormat(e.target.value);
    changeFormat(e.target.value);
  };

  return (
    <header className="Navbar">
      <div className="logo">
        <a href="#">Color picker</a>
      </div>

      <div className="slider-container">
        <span>Level: {level}</span>
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            onAfterChange={changeLevel}
            step={100}
          />
        </div>
      </div>

      <div className="select-container">
        <Select value={format} onChange={handleChangeFormat}>
          <MenuItem value="hex">HEX - #fffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
        </Select>
      </div>
    </header>
  );
};

export default Navbar;
