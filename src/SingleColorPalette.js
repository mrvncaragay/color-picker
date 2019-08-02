import React, { useEffect, useState } from "react";
import ColorBox from "./ColorBox";

const SingleColorPalette = ({ palette, colorId }) => {
  //const [shades, setShades] = useState();
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

  /*eslint-disable */
  useEffect(() => {
    //setShades(gatherShades(palette, colorId));
  }, []);
  /*eslint-enable */

  const colorBoxes = colors.map(color => (
    <ColorBox
      key={color.id}
      name={color.name}
      background={color.hex}
      showLink={false}
    />
  ));
  return (
    <div className="Palette">
      <h1> Single Palatte</h1>
      <div className="Palette-colors">{colorBoxes}</div>
    </div>
  );
};

export default SingleColorPalette;
