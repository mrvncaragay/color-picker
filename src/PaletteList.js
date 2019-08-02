import React from "react";
import { Link } from "react-router-dom";
import MiniPalalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";

// Component Styles
import styles from "./styles/PaletteListStyles";

const PaletteList = ({ classes, palettes, history }) => {
  const goToPalette = id => {
    history.push(`/palette/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalalette
              {...palette}
              handleClick={() => goToPalette(palette.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
