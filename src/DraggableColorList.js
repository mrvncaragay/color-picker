import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer(({ colors, handleDelete }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, index) => (
        <DraggableColorBox
          index={index}
          key={color.name}
          color={color}
          handleDelete={() => handleDelete(color.name)}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
