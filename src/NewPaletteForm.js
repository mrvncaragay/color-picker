import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { arrayMove } from "react-sortable-hoc";

// Shared Component
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
    marginRight: theme.spacing(2)
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
  const [color, setColor] = useState("teal");
  const [colors, setColors] = useState(palettes[0].colors);
  const [newName, setNewName] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateColor = color => {
    setColor(color.hex);
  };

  const addNewColor = () => {
    const newColor = {
      color: color,
      name: newName
    };
    setColors([...colors, newColor]);
    setNewName("");
  };

  const handleChangeColor = e => {
    setNewName(e.target.value);
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

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule("isColorUnique", value =>
      colors.every(({ color: col }) => col !== color)
    );
  }, [color, colors]);

  return (
    <div className={classes.root}>
      <PaletteFormNav
        classes={classes}
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

        <ChromePicker color={color} onChangeComplete={updateColor} />

        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={newName}
            onChange={handleChangeColor}
            validators={["required", "isColorUnique", "isColorNameUnique"]}
            errorMessages={[
              "Enter a color name",
              "Color already used!",
              "Color name must be unique."
            ]}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ backgroundColor: paletteFull ? "gray" : color }}
            disabled={paletteFull}
          >
            {paletteFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
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
