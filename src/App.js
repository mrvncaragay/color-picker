import React from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";

function App() {
  return <Palette {...seedColors[5]} />;
}

export default App;
