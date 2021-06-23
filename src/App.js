import React from "react";
import Home from "./pages/Home";
import AnimeDetail from './pages/AnimeDetail';

import { Switch, Route } from "react-router-dom";

function App() {
  //// jsx
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path={["/anime/:animeID","/anime/:animeID/character/:charID"]}>
          <AnimeDetail />
        </Route>
      </Switch>
    </div>
  );
}
//
export default App;
