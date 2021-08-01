import React from "react";
import { useLazyQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { detailQuery } from "../chooks/queries";
import CircleRate from "./detailPage/CircleRate";
import { useApolloClient,gql } from '@apollo/client';


const Anime = ({ anime }) => {
  const client = useApolloClient();
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
    
    client.writeQuery({
      query: gql`
      query WriteIsLoading {
        loadingbar {
          isLoading
        }
      }`,
      data: { // Contains the data to write
        loadingbar: {
          __typename: 'LoadingBar',
          isLoading: 30
        },
      }
    });
        
    getAnime({ variables: { id: anime.id } });

  };

  return (
    <motion.a
      href={`/anime/${anime.id}`}
      onClick={animeCardClickHandler}
      className="anime-card-container group shadow-xl hover-card-num-1"
      animate={{ opacity: 1, transition: { duration: 1 } }}
      initial={{ opacity: 0 }}
    >
      {anime.averageScore !== undefined && (
        <div
          className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 
    group-hover:translate-y-0.5 group-hover:-translate-x-0.5 transition-transform duration-500"
        >
          <CircleRate rate={anime.averageScore} size={4} />
        </div>
      )}

      <img src={anime.coverImage.large}></img>
      <div
        className="absolute top-0 left-0 rounded-md font-medium flex flex-col 
       "
        style={{ fontSize: "9px" }}
      >
        <div className="max-w-min bg-yellow-300 text-black px-0.5 rounded-r-md my-px">
          {anime.format}
        </div>
        <div className="max-w-min bg-green-300 text-black px-0.5 rounded-r-md my-px">
          {anime.source}
        </div>
        <div className="max-w-min bg-red-300 text-black px-0.5 rounded-r-md my-px">
          {anime.status}
        </div>
      </div>
      <h3 className="text-lg h-11 line-clamp-2 ">
        {anime.title.english !== null
          ? anime.title.english
          : anime.title.romaji}
      </h3>
    </motion.a>
  );
};

export default Anime;
