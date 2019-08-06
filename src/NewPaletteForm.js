import React, { useState } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { arrayMove } from "react-sortable-hoc";

// Shared Component
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },

  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

const NewPaletteForm = ({ palettes, classes, savePalette, history }) => {
  const [defaultData] = useState({
    MAX_COLORS: 20
  });
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(palettes[0].colors);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor, newName) => {
    const newC = {
      color: newColor,
      name: newName
    };
    setColors([...colors, newC]);
  };

  const handdleSavePalette = newPaletteName => {
    const paletteName = newPaletteName.toLowerCase().replace(/ /g, "-");
    const newPalette = {
      id: paletteName,
      paletteName: newPaletteName,
      colors
    };
    savePalette(newPalette);
    history.push("/");
  };

  const handleDelete = colorName => {
    const newColors = colors.filter(color => color.name !== colorName);
    setColors([...newColors]);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newColors = arrayMove(colors, oldIndex, newIndex);
    setColors([...newColors]);
  };

  const clearColor = () => {
    setColors([]);
  };

  const randomColor = () => {
    const allColors = palettes.map(p => p.colors).flat();
    const rand = Math.floor(Math.random() * colors.length);
    setColors([...colors, allColors[rand]]);
  };

  const paletteFull = colors.length >= defaultData.MAX_COLORS;

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handdleSavePalette={handdleSavePalette}
        palettes={palettes}
      />

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>

        <div>
          <Button variant="contained" color="secondary" onClick={clearColor}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={randomColor}
            disabled={paletteFull}
          >
            Random Color
          </Button>
        </div>

        <ColorPickerForm
          colors={colors}
          paletteFull={paletteFull}
          addNewColor={addNewColor}
        />
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          handleDelete={handleDelete}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
