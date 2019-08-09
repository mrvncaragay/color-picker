import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";

// Component styles
import styles from "./styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement(
  ({ color, classes, handleDelete }) => {
    return (
      <div className={classes.root} style={{ backgroundColor: color.color }}>
        <div className={classes.boxContent}>
          <span>{color.name}</span>
          <span>
            <DeleteIcon className={classes.deleteIcon} onClick={handleDelete} />
          </span>
        </div>
      </div>
    );
  }
);

export default withStyles(styles)(DraggableColorBox);
