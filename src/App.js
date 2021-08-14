import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { gql } from "@apollo/client";

import Header from "./pages/Header";
import ScrollToTop from "./pages/ScrollToTop";
import Footer from "./pages/Footer";
import ProgressBar from "./pages/ProgressBar";
import Loading from "./pages/Loading";
import Errors from "./pages/Errors";
const Home = React.lazy(() => import("./pages/Home"));
const AnimeDetail = React.lazy(() => import("./pages/AnimeDetail"));
const AnimeFilter = React.lazy(() => import("./pages/AnimeFilter"));
const Error404 = React.lazy(() => import("./pages/Error404"));

function App() {
  const client = useApolloClient();
  client.writeQuery({
    query: gql`
      query WriteIsLoading {
        loadingbar {
          isLoading
        }
      }
    `,
    data: {
      // Contains the data to write
      loadingbar: {
        __typename: "LoadingBar",
        isLoading: 0,
      },
    },
  });

  //// jsx
  return (
    <div className="app all-grid-container">
      <ProgressBar />
      <header className="all-nav">
        <Header />
      </header>
      <ScrollToTop />
      <main className="all-main">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path={["/", "/wikianime"]} exact>
              <Home />
            </Route>
            <Route path={"/anime/:animeID"}>
              <AnimeDetail />
            </Route>
            <Route path={"/search/"}>
              <AnimeFilter />
            </Route>
            <Route path={"/anime/:animeID/character/:charID/actor/:actorID"}>
              <AnimeDetail />
            </Route>
            <Route path="/error">
            <Errors />
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </Suspense>
      </main>
      <footer className="all-footer">
        <Footer />
      </footer>
    </div>
  );
}
export default App;
