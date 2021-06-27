import React from "react";
import { useQuery } from "@apollo/client";
import { homeQuery } from "../chooks/queries";

// import { useDispatch } from "react-redux";
// import { homeAnimeData } from "../store/animeListSlice";
import AnimeList from "../components/AnimeList";

const Home = () => {
  // const dispatch = useDispatch();

  const hQuery = homeQuery;
  const { loading, error, data } = useQuery(hQuery, {
    variables: {
      perPage: 8,
    },
  });

  if (loading) {
    console.log("loading");
    return null;
  }

  if (error) {
    console.log(error.message);
    return `Error! ${error}`;
  }
console.log(data);
  return (
    <div>
      <AnimeList
        allAnimeData={data.Page.media}
        colsInRow={4}
        initialQuantity={8}
        keyParam={"homeAnime"}
      />
    </div>
  );
};

export default Home;
