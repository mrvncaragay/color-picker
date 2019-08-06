import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import NewPaletteForm from "./NewPaletteForm";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={routeProps => (
                  <div className="page">
                    <NewPaletteForm
                      savePalette={savePalette}
                      {...routeProps}
                      palettes={palettes}
                    />
                  </div>
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
                  <div className="page">
                    <PaletteList palettes={palettes} {...routeProps} />
                  </div>
                )}
              />

              <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                  <div className="page">
                    <Palette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)
                      )}
                    />
                  </div>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />

    //{/* <Palette palette={generatePalette(seedColors[4])} />; */}
  );
}

export default App;
