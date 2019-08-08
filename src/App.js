import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import NewPaletteForm from "./NewPaletteForm";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import "./App.css";

function App() {
  const [palettes, setPalettes] = useState(seedColors);
  const findPalette = id => {
    return palettes.find(palette => {
      return palette.id === id;
    });
  };

  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette]);
  };

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={routeProps => (
          <NewPaletteForm
            savePalette={savePalette}
            {...routeProps}
            palettes={palettes}
          />
        )}
      />

      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />

      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList palettes={palettes} {...routeProps} />
        )}
      />

      <Route
        exact
        path="/palette/:id"
        render={routeProps => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
    </Switch>
  );
}

export default App;
