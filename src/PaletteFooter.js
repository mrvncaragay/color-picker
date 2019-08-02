import React from "react";
import { withStyles } from "@material-ui/styles";

// Component styles
import styles from "./styles/PaletteFooterStyles";

const PaletteFooter = ({ palette, classes }) => {
  return (
    <footer className={classes.PaletteFooter}>
      {palette.paletteName}
      <span className={classes.emoji}> {palette.emoji} </span>
    </footer>
  );
};

export default withStyles(styles)(PaletteFooter);
