import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const PaletteMetaForm = ({ handdleSavePalette, palettes, handleHideForm }) => {
  const [open] = React.useState(true);
  const [newPaletteName, setPaletteName] = useState("");

  const handleChangePalette = e => {
    setPaletteName(e.target.value);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== newPaletteName.toLowerCase()
      )
    );
  }, [newPaletteName, palettes]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleHideForm}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Please enter a name for your new beautiful Palette. Make sure it's
          unique!
        </DialogTitle>
        <ValidatorForm onSubmit={() => handdleSavePalette(newPaletteName)}>
          <DialogContent>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              fullWidth
              margin="normal"
              onChange={handleChangePalette}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter a Palette name", "Palette already used!"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleHideForm} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default PaletteMetaForm;
