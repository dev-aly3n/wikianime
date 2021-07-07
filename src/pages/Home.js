import React from "react";
import { useQuery } from "@apollo/client";
import { homeQuery } from "../chooks/queries";
import AnimeList from "../components/AnimeList";
import AiringList from "../components/homePage/AiringList";

const Home = () => {
  // const dispatch = useDispatch();

  const hQuery = homeQuery;
  const { loading, error, data } = useQuery(hQuery);

  if (loading) {
    console.log("loading");
    return null;
  }

  if (error) {
    console.log(error.message);
    return `Error! ${error}`;
  }
  const trending = data.trending.media;
  const airing = data.airing.airingSchedules;

  console.log(airing);
  return (
    <div>
      <div className="home-grid-container rounded-full">
      <div className="h-header">
      
      </div>
      <div className="h-sidebar bg-green-400">
      {airing[0] && <div>
        <AiringList allAiring={airing} keyParam={"airing"} />
      </div>}
      </div>
      <div className="h-trending">
        <AnimeList
          allAnimeData={trending}
          colsInRow={4}
          initialQuantity={8}
          keyParam={"homeAnime"}
        />
        </div>
      </div>
    </div>
  );
};

export default Home;
