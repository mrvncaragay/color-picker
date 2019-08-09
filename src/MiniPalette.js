import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
// Component styles
import styles from "./styles/MiniPaletteStyles";

const MiniPalette = ({
  classes,
  id,
  paletteName,
  emoji,
  colors,
  handleClick,
  deletePalette
}) => {
  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));

  const handleDelete = e => {
    e.stopPropagation();
    deletePalette(id);
  };

  return (
    <div className={classes.root} onClick={handleClick}>
      <DeleteIcon className={classes.deleteIcon} onClick={handleDelete} />

      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default withStyles(styles)(MiniPalette);
