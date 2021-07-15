import React from "react";
import { useLazyQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { detailQuery } from "../../chooks/queries";
import CircleRate from "../detailPage/CircleRate";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Top = ({ anime, rank }) => {
  const history = useHistory();
  const selectAnimeQuery = detailQuery;

  const [getAnime, { error, data }] = useLazyQuery(selectAnimeQuery);
  if (error) {
    console.log(error.message);
    return `Error! ${error}`;
  }
  if (data) {
    //using set time out just BCS React is being bitch about to pushing to another page during getting the data
    //the error was :  Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
    setTimeout(() => {
      history.push(`/anime/${anime.id}`);
    }, 1);
  }

  const animeCardClickHandler = (e) => {
    e.preventDefault();
    getAnime({ variables: { id: anime.id } });
  };

  return (
    <motion.a
      href={`/anime/${anime.id}`}
      onClick={animeCardClickHandler}
      className="h-40 group shadow-xl flex rounded overflow-hidden bg-blue-50 relative"
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
      <img src={anime.coverImage.large} className="w-24 h-40" />
      <div className="flex">
        <div className="flex flex-col mx-2 justify-around ssm:w-64">
          <h3 className="break-words line-clamp-2 font-semibold text-base">
            {rank}.
            {anime.title.english ? anime.title.english : anime.title.romaji}
          </h3>
          <div className="flex flex-wrap justify-between text-sm text-gray-500">
          <p>{anime.format.toLowerCase()}</p>
          <p>{anime.source.toLowerCase()}</p>
          <p>{anime.status.toLowerCase()}</p>
        <p>{anime.season? anime.season.toLowerCase():""} {anime.seasonYear? anime.seasonYear :""}</p>

          </div>
          <div className="flex flex-wrap">
            {anime.tags.map((tag, index) => {
              if (index <= 2) {
                return <span className="tag-names">{tag.name}</span>;
              }
            })}
          </div>
        </div>
        <div className="flex flex-col">


        </div>

        <div
          className="hidden ssm:block absolute top-0 right-0 transform translate-x-4 -translate-y-4 
    group-hover:translate-y-0.5 group-hover:-translate-x-0.5 transition-all duration-500"
        >
          <CircleRate size={4} rate={anime.averageScore} />
        </div>
        <div
          className="hidden ssm:block absolute right-0 bottom-0 transform translate-x-4 translate-y-4 
    group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 transition-all duration-500"
        >
          <div className="relative">
            <CircleRate
              size={4}
              rate={((anime.popularity / 300000) * 100).toFixed(0)}
              symbol={faHeart}
            />
            <p
              className="absolute top-4 left-3 text-white"
              style={{ fontSize: "9px" }}
            >
              popularity
            </p>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default Top;
