import React from "react";

const PaletteFooter = ({ palette }) => {
  return (
    <footer className="Palette-footer">
      {palette.paletteName}
      <span className="emoji"> {palette.emoji} </span>
    </footer>
  );
};

export default PaletteFooter;
