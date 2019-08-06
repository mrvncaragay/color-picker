import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// Shared Component
import PaletteMetaForm from "./PaletteMetaForm";

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirecton: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 20,
    marginLeft: 12
  },

  navBtns: {
    marginRight: "1rem",
    marginLeft: "auto",
    "& a": {
      textDecoration: "none"
    }
  },
  button: {
    margin: "0 0.5rem"
  }
});

const PaletteFormNav = ({
  classes,
  open,
  palettes,
  handleDrawerOpen,
  handdleSavePalette
}) => {
  const [formShowing, setFormShowing] = useState(false);

  const handleShowForm = () => {
    setFormShowing(true);
  };

  const handleHideForm = () => {
    setFormShowing(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="default"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
          <div className={classes.navBtns}>
            <Link to="/">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowForm}
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </Toolbar>
        {formShowing && (
          <PaletteMetaForm
            handdleSavePalette={handdleSavePalette}
            palettes={palettes}
            handleHideForm={handleHideForm}
          />
        )}
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(PaletteFormNav);
