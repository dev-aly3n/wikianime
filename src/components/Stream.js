import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const Stream = ({ episode }) => {
//   const history = useHistory();

//       history.push(`/anime/${anime.id}`);



  const episodeCardClickHandler = () => {
      console.log(episode);
  };



  return (
    <motion.div
      onClick={episodeCardClickHandler}
      className="anime-card-container"
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
    <img src={episode.thumbnail} ></img>
        <h3 className="text-sm line-clamp-2 px-2">
          {episode.title}
        </h3>
    </motion.div>
  );
};

export default Stream;
