import React from "react";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

function App() {
  const findPalette = id => {
    return seedColors.find(palette => {
      return palette.id === id;
    });
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList palettes={seedColors} {...routeProps} />
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

      <Route
        exact
        path="/palette/:paletteId/:colorID"
        render={() => <SingleColorPalette />}
      />
    </Switch>

    //{/* <Palette palette={generatePalette(seedColors[4])} />; */}
  );
}

export default App;
