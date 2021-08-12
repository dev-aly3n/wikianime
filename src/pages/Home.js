import React from 'react';
import { useQuery } from "@apollo/client";
import { homeQuery } from "../chooks/queries";
import AnimeList from "../components/AnimeList";
import AiringList from "../components/homePage/AiringList";
import HomeRec from "../components/homePage/HomeRec";
import TopList from "../components/homePage/TopList";
import RecomList from "../components/detailPage/RecomList";
import AiringSlider from "../components/homePage/AiringSlider";
import Loading from "./Loading";
import { useApolloClient, gql } from "@apollo/client";

const Home = ({ gridRef }) => {
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
        isLoading: 80,
      },
    },
  });

  const hQuery = homeQuery;
  const { loading, error, data } = useQuery(hQuery);

  if (loading) {
    console.log("loading");
    return <Loading />;
  }

  if (error) {
    console.log(error.message);
    return `Error! ${error}`;
  }
  const trending = data.trending.media;
  const airing = data.airing.airingSchedules;
  const allTime = data.allTime.media;
  const top100 = data.top100.media;

  const ioio = () => {
    // console.log(gridRef.current.offsetParent.scrollTop);
  };

  return (
    <React.Fragment>
      <div
        ref={gridRef}
        onWheel={ioio}
        className=" home-grid-container home-page-container"
      >
        <div className="h-header">
          {airing[0] && (
            <div>
              <AiringSlider allAiring={airing} keyParam={"airingSlider"} />
            </div>
          )}

          {data.homeRecom.recommendations[0] && (
            <div>
              <RecomList
                allRecom={data.homeRecom.recommendations}
                initialQuantity={7}
                keyParam={"recSlider"}
              />
            </div>
          )}
        </div>

        <div className="h-sidebar ">
          {data.homeRecom.recommendations[0] && (
            <div>
              <h3>Top Recommendations</h3>
              <HomeRec
                allRecom={data.homeRecom.recommendations}
                keyParam={"topRec"}
              />
            </div>
          )}

          {airing[0] && (
            <div>
              <h3>Airing Schedules</h3>
              <AiringList allAiring={airing} keyParam={"airing"} />
            </div>
          )}
        </div>
        <div className="h-trending">
          <h3>Trending</h3>
          <AnimeList
            allAnimeData={trending}
            colsInRow={4}
            initialQuantity={8}
            keyParam={"homeTrending"}
          />
        </div>
        <div className="h-alltime">
          <h3>Popular All Time</h3>
          <AnimeList
            allAnimeData={allTime}
            colsInRow={4}
            initialQuantity={8}
            keyParam={"homepopAllTime"}
          />
        </div>
        <div className="h-top100">
          <h3>Top 100</h3>
          <TopList
            allAnimeData={top100}
            initialQuantity={8}
            keyParam={"top100"}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
