import React, { useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";

// Component styles
import styles from "./styles/PaletteStyles";

const Palette = ({ palette, classes }) => {
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
    <div className={classes.Palette}>
      <Navbar
        changeLevel={changeLevel}
        level={level}
        changeFormat={changeFormat}
        showAllColors={true}
      />

      <div className={classes.colors}>{colorBoxes}</div>
      <PaletteFooter palette={palette} />
    </div>
  );
};

export default withStyles(styles)(Palette);
