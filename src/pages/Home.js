import React, {useRef} from "react";
import { useQuery } from "@apollo/client";
import { homeQuery } from "../chooks/queries";
import AnimeList from "../components/AnimeList";
import AiringList from "../components/homePage/AiringList";
import HomeRec from '../components/homePage/HomeRec';
import TopList from '../components/homePage/TopList';
import RecomList from '../components/detailPage/RecomList'
import AiringSlider from "../components/homePage/AiringSlider";

const Home = ({gridRef}) => {


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
  const allTime = data.allTime.media;
  const top100 = data.top100.media;

  const ioio = () => {
    // console.log(gridRef.current.offsetParent.scrollTop);
  }

  return (
    <React.Fragment>
      <div ref={gridRef} onWheel={ioio} className=" home-grid-container" >
      <div className="h-header">

      {airing[0] && 
      <div>
        <AiringSlider allAiring={airing} keyParam={"airingSlider"} />
      </div>}


      { data.homeRecom.recommendations[0] && 
      <div>
      <div className="text-left text-2xl text-gray-700 font-semibold py-1 mt-5 mx-2 ml-5 ssm:ml-20">Suggestions</div>
      <RecomList allRecom={data.homeRecom.recommendations} initialQuantity={7} keyParam={"recSlider"} />
      </div>
      }
      </div>

      <div className="h-sidebar bg-indigo-50 rounded shadow-lg">
      { data.homeRecom.recommendations[0] && 
      <div>
      <div className="text-center text-xl font-semibold py-3 mx-2">Top Recommendations</div>
      <HomeRec allRecom={data.homeRecom.recommendations} keyParam={"topRec"} />
      </div>
      }
      
      {airing[0] && 
      <div className="mx-1">
      <div className="text-center text-xl font-semibold py-3 mx-2">Airing Schedules</div>
        <AiringList allAiring={airing} keyParam={"airing"} />
      </div>}

      </div>
      <div className="h-trending bg-indigo-50 shadow-lg rounded">
      <div className="text-left text-2xl font-semibold py-3 mx-3">Trending</div>
        <AnimeList
          allAnimeData={trending}
          colsInRow={4}
          initialQuantity={8}
          keyParam={"homeTrending"}
        />
        </div>
      <div className="h-alltime bg-indigo-50 shadow-lg rounded">
      <div className="text-left text-2xl font-semibold py-3 mx-3">Popular All Time</div>
        <AnimeList
          allAnimeData={allTime}
          colsInRow={4}
          initialQuantity={8}
          keyParam={"homepopAllTime"}
        />
        </div>
      <div className="h-top100 bg-indigo-50 shadow-lg rounded">
      <div className="text-left text-2xl font-semibold py-3 mx-3">Top 100</div>
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
