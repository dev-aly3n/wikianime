//libs
import React, { useState } from "react";
//components
import Stream from "./Stream";
import { motion } from "framer-motion";

const StreamList = ({ allEpisode, colsInRow, initialQuantity, keyParam }) => {
  const [showMore, setShowMore] = useState({
    stream: initialQuantity,
  });

  //manage columns in diferent size (we cant do this in css bcs we change grid templates for mobile and tablet)
  let gridColsTemp = `grid-cols-2 ssm:grid-cols-${colsInRow - 1} lg:grid-cols-${
    colsInRow - 1
  } xl:grid-cols-${colsInRow}`;

  const streamShowMoreHandler = (e) => {
    if (showMore.stream > 20) {
      setShowMore({ stream: showMore.stream + 999 });
      e.target.remove();
    } else {
      setShowMore({ stream: showMore.stream + 10 });
    }
    if (showMore.stream + 10 >= allEpisode.length) {
      e.target.remove();
    }
  };

  return (
    <motion.div className="pb-10">
      <div className="anime-list-container">
        <div className={`anime-list ${gridColsTemp}`}>
          {allEpisode
            .filter((_, index) => index <= showMore.stream - 1)
            .map((episode) => {
              return (
                <Stream
                  key={`${keyParam}-${episode.title}`}
                  episode={episode}
                />
              );
            })}
        </div>
      </div>
      {allEpisode.length > initialQuantity && (
        <button
          onClick={streamShowMoreHandler}
          className="stream-show-more-btn "
        >
          Load More
        </button>
      )}
    </motion.div>
  );
};
export default StreamList;
