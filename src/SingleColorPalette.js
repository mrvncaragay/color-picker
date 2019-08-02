import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";

const styles = {
  Palette: {
    height: "100vh",
    overflowY: "hidden",
    overflowX: "hidden"
  },

  colors: {
    height: "90%"
  },

  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    opacity: 1,
    backgroundColor: "black",

    "& a": {
      color: "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255,255,255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none"
    }
  }
};

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
