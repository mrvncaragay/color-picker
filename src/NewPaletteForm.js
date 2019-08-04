import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { arrayMove } from "react-sortable-hoc";

// Shared Component
import DraggableColorList from "./DraggableColorList";

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
  const [open, setOpen] = useState(true);
  const [color, setColor] = useState("teal");
  const [colors, setColors] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPaletteName, setPaletteName] = useState("");

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

  const handleChangePalette = e => {
    setPaletteName(e.target.value);
  };

  const handdleSavePalette = () => {
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

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule("isColorUnique", value =>
      colors.every(({ color: col }) => col !== color)
    );

    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== newPaletteName.toLowerCase()
      )
    );
  }, [color, colors, newPaletteName, palettes]);

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
            Persistent drawer
          </Typography>

          <ValidatorForm onSubmit={handdleSavePalette}>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              onChange={handleChangePalette}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter a Palette name", "Palette already used!"]}
            />

            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
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
          <Button variant="contained" color="secondary">
            Clear Palette
          </Button>
          <Button variant="contained" color="primary">
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
            style={{ backgroundColor: color }}
          >
            Add Color
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
