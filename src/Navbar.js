import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import { Select, MenuItem } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "rc-slider/assets/index.css";
import { withStyles } from "@material-ui/styles";

// Component styles
import styles from "./styles/NavbarStyles";

const Navbar = ({
  level,
  changeLevel,
  changeFormat,
  showAllColors,
  classes
}) => {
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  const handleChangeFormat = e => {
    setOpen(true);
    setFormat(e.target.value);
    changeFormat(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header className={classes.Navbar}>
      <div className={classes.logo}>
        <Link to="/"> Color picker</Link>
      </div>

      {showAllColors && (
        <div>
          <span>Level: {level}</span>
          <div className={classes.slider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              onAfterChange={changeLevel}
              step={100}
            />
          </div>
        </div>
      )}

      <div className={classes.selectContainer}>
        <Select value={format} onChange={handleChangeFormat}>
          <MenuItem value="hex">HEX - #fffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
        </Select>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format Changed To {format.toUpperCase()}</span>
        }
        ContentProps={{ "aria-describedby": "message-id" }}
        onClose={handleClose}
        action={[
          <IconButton
            onClick={handleClose}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </header>
  );
};

export default withStyles(styles)(Navbar);
