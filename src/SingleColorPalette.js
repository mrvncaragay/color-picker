import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";

// Component styles
import styles from "./styles/PaletteStyles";

const SingleColorPalette = ({ palette, colorId, classes }) => {
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
      showingFullPalette={false}
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar changeFormat={changeFormat} showAllColors={false} />

      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${palette.id}`}>GO BACK</Link>
        </div>
      </div>

      <PaletteFooter palette={palette} />
    </div>
  );
};

export default withStyles(styles)(SingleColorPalette);
