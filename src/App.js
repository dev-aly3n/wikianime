import React from "react";
import Home from "./pages/Home";
import AnimeDetail from './pages/AnimeDetail';
import Header from "./pages/Header";
import { Switch, Route } from "react-router-dom";
import ScrollToTop from "./pages/ScrollToTop";

function App() {

  //// jsx
  return (
    <div className="app">
    <Header />
    <ScrollToTop />
    <main>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path={["/anime/:animeID","/anime/:animeID/character/:charID/actor/:actorID"]}>
          <AnimeDetail />
        </Route>
      </Switch>
      </main>
    </div>
  );
}
export default App;
