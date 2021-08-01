import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const Stream = ({ episode }) => {
  //   const history = useHistory();

  //       history.push(`/anime/${anime.id}`);

  return (
    <motion.a
      href={episode.url}
      target="_blank"
      rel="noopener noreferrer"
      className="anime-card-container hover-card-num-1"
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
      <img src={episode.thumbnail}></img>
      <h3 className="text-sm line-clamp-2 px-2">{episode.title}</h3>
    </motion.a>
  );
};

export default Stream;
