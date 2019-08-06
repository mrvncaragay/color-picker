import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem"
  },
  colorNameInput: {
    width: "100%",
    heigth: "70px"
  }
};

const ColorPickerForm = ({ colors, classes, paletteFull, addNewColor }) => {
  const [color, setColor] = useState("teal");
  const [newName, setNewName] = useState("");

  const updateColor = color => {
    setColor(color.hex);
  };

  const handleChangeColor = e => {
    setNewName(e.target.value);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule("isColorUnique", () =>
      colors.every(({ color: col }) => col !== color)
    );
  }, [color, colors]);

  return (
    <div>
      <ChromePicker
        className={classes.picker}
        color={color}
        onChangeComplete={updateColor}
      />

      <ValidatorForm
        onSubmit={() => {
          addNewColor(color, newName);
          setNewName("");
        }}
      >
        <TextValidator
          value={newName}
          className={classes.colorNameInput}
          placeholder="Color Name"
          onChange={handleChangeColor}
          margin="normal"
          variant="filled"
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
          className={classes.addColor}
          style={{ backgroundColor: paletteFull ? "gray" : color }}
          disabled={paletteFull}
        >
          {paletteFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default withStyles(styles)(ColorPickerForm);
