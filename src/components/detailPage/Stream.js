import React from "react";
import { motion } from "framer-motion";

const Stream = ({ episode }) => {
  return (
    <motion.a
      href={episode.url}
      target="_blank"
      rel="noopener noreferrer"
      className="anime-card-container hover-card-num-1"
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
      <img loading="lazy" height={224} alt="" src={episode.thumbnail} />
      <h3 className="text-sm line-clamp-2 px-2">{episode.title}</h3>
    </motion.a>
  );
};

export default Stream;
