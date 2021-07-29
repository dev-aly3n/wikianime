import React from "react";
import Home from "./pages/Home";
import AnimeDetail from "./pages/AnimeDetail";
import Header from "./pages/Header";
import { Switch, Route } from "react-router-dom";
import ScrollToTop from "./pages/ScrollToTop";
import Footer from "./pages/Footer";

function App() {
  //// jsx
  return (
    <div className="app all-grid-container">
      <header className="all-nav">
        <Header />
      </header>
      <ScrollToTop />
      <main className="all-main">
        <Switch>
          <Route path={["/", "/wikianime"]} exact>
            <Home />
          </Route>
          <Route
            path={[
              "/anime/:animeID",
              "/anime/:animeID/character/:charID/actor/:actorID",
            ]}
          >
            <AnimeDetail />
          </Route>
        </Switch>
      </main>
      <footer className="all-footer">
        <Footer />
      </footer>
    </div>
  );
}
export default App;
