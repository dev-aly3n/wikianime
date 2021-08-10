import React, { useState } from "react";
import Top from "./Top";
import { motion } from "framer-motion";

const TopList = ({ allAnimeData, initialQuantity, keyParam }) => {
  const [showMore, setShowMore] = useState({
    stream: initialQuantity,
  });

  const streamShowMoreHandler = (e) => {
    if (showMore.stream > 30) {
      setShowMore({ ...showMore, stream: showMore.stream + 999 });
      e.target.style.display = "none";
    } else {
      setShowMore({ ...showMore, stream: showMore.stream + 10 });
    }
    if (showMore.stream + 10 >= allAnimeData.length) {
      e.target.style.display = "none";
    }
  };

  // maintain the array for duplicate elements
  let counterAnime = [];
  let trimedAllAnimeData = allAnimeData.filter((anime) => {
    let anim = anime.id !== undefined ? anime : anime.node;
    if (!counterAnime.includes(anim.id)) {
      counterAnime.push(anim.id);
      if (anime !== undefined) {
        return anime;
      }
    }
  });

  return (
    <motion.div className="top-list-container">
      <div className="anime-list-container">
        <motion.div className="anime-list">
          {trimedAllAnimeData.map((anime, index) => {
            //check where the data come from node or media
            const animeData = anime.id !== undefined ? anime : anime.node;
            if (index <= showMore.stream - 1) {
              return (
                <Top
                  key={`${keyParam}-${animeData.id}`}
                  anime={animeData}
                  rank={index + 1}
                />
              );
            }
          })}
        </motion.div>
      </div>
      {allAnimeData.length > initialQuantity && (
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
export default TopList;
