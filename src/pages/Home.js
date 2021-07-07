import { useQuery } from "@apollo/client";
import { homeQuery } from "../chooks/queries";
import AnimeList from "../components/AnimeList";
import AiringList from "../components/homePage/AiringList";
import HomeRec from '../components/homePage/HomeRec'

const Home = () => {

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

  console.log(data);
  return (
    <div className="">
      <div className="home-grid-container" >
      <div className="h-header">
      
      </div>

      <div className="h-sidebar bg-indigo-50 rounded shadow-lg">
      { data.homeRecom.recommendations[0] && 
      <div>
      <div className="text-center text-xl font-semibold py-3 mx-2">Top Recommendations</div>
      <HomeRec allRecom={data.homeRecom.recommendations} />
      </div>
      }
      
      {airing[0] && 
      <div className="mx-1">
      <div className="text-center text-xl font-semibold py-3 mx-2">Airing Schedules</div>
        <AiringList allAiring={airing} keyParam={"airing"} />
      </div>}

      </div>
      <div className="h-trending">
      <div className="text-left text-2xl font-semibold py-3 mx-3">Trending</div>
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
