import React from "react";
import Stream from "./Stream";
import {motion} from 'framer-motion';

const StreamList = ({allEpisode}) => {

  return (
    <motion.div>
      <div className="anime-list-container">
      <motion.div className="anime-list">
        {allEpisode.map((episode) => {
          return <Stream key={episode.title} episode={episode} />;
        })}
      </motion.div>
      </div>
    </motion.div>
  );
};
export default StreamList;
