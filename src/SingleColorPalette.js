import React, { useState } from "react";
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
    Object.keys(allColors[100]).map(key => {
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
      key={color.id}
      name={color.name}
      background={color[format]}
      showLink={false}
    />
  ));
  return (
    <div className="Palette">
      <Navbar changeFormat={changeFormat} showAllColors={false} />

      <div className="Palette-colors">{colorBoxes}</div>

      <PaletteFooter palette={palette} />
    </div>
  );
};

export default SingleColorPalette;
