import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import ColorBox from "./ColorBox";

const SingleColorPalette = ({ palette, colorId }) => {
  const [format, setFormat] = useState("hex");
  let colors;

  const gatherShades = (palette, color) => {
    let shades = [];
    let allColors = palette.colors;
    let cIndex = null;

    //Retrieve the position index
    Object.keys(allColors[100]).forEach(key => {
      if (allColors[100][key].id === color) {
        cIndex = key;
      }
    });

    //Retrieve the each color with index
    Object.keys(allColors).forEach(key => {
      shades.push(allColors[key][cIndex]);
    });

    return shades.slice(1);
  };

  colors = gatherShades(palette, colorId);

  const changeFormat = val => {
    setFormat(val);
  };

  const colorBoxes = colors.map(color => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showLink={false}
    />
  ));
  return (
    <div className="SingleColorPalette Palette">
      <Navbar changeFormat={changeFormat} showAllColors={false} />

      <div className="Palette-colors">
        {colorBoxes}
        <div className="go-back ColorBox">
          <Link to={`/palette/${palette.id}`} className="back-button">
            GO BACK
          </Link>
        </div>
      </div>

      <PaletteFooter palette={palette} />
    </div>
  );
};

export default SingleColorPalette;
