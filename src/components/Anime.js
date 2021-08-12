import React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import CircleRate from "./detailPage/CircleRate";
import { useApolloClient, gql } from "@apollo/client";

const Anime = ({ anime }) => {
  const client = useApolloClient();
  const history = useHistory();

  const animeCardClickHandler = (e) => {
    e.preventDefault();

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
          isLoading: 30,
        },
      },
    });

    setTimeout(() => {
      history.push(`/anime/${anime.id}`);
    }, 500);
  };

  return (
    <motion.a
      href={`/anime/${anime.id}`}
      onClick={animeCardClickHandler}
      className="anime-card-container group hover-card-num-1"
      animate={{ opacity: 1, transition: { duration: 1 } }}
      initial={{ opacity: 0 }}
    >
      {anime.averageScore !== undefined && (
        <div
          className="anime-circle-rate transform translate-x-4 -translate-y-4 
    group-hover:translate-y-0.5 group-hover:-translate-x-0.5 "
        >
          <CircleRate rate={anime.averageScore} size={4} />
        </div>
      )}

      <img alt="" src={anime.coverImage.large}></img>
      <div
        className="anime-info
       "
      >
        <div className=" bg-yellow-300 ">{anime.format}</div>
        <div className=" bg-green-300 ">{anime.source}</div>
        <div className=" bg-red-300 ">{anime.status}</div>
      </div>
      <h3 className="line-clamp-2">
        {anime.title.english !== null
          ? anime.title.english
          : anime.title.romaji}
      </h3>
    </motion.a>
  );
};

export default Anime;
