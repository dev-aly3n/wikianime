import React, { useState } from "react";
import Anime from "./Anime";
import { motion } from "framer-motion";

const AnimeList = ({ allAnimeData, initialQuantity, colsInRow, keyParam }) => {
  const [showMore, setShowMore] = useState({
    stream: initialQuantity,
  });

  let gridColsTemp = `grid-cols-2 ssm:grid-cols-${colsInRow - 1} lg:grid-cols-${
    colsInRow - 1
  } xl:grid-cols-${colsInRow}`;

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
    return false;
  });

  return (
    <motion.div className="pb-10">
      <div className="anime-list-container">
        <motion.div className={`anime-list ${gridColsTemp}`}>
          {trimedAllAnimeData
            .filter((_, index) => index <= showMore.stream - 1)
            .map((anime) => {
              //check where the data come from node or media
              const animeData = anime.id !== undefined ? anime : anime.node;
              return (
                <Anime key={`${keyParam}-${animeData.id}`} anime={animeData} />
              );
            })}
        </motion.div>
      </div>
      {allAnimeData.length > initialQuantity && (
        <button
          onClick={streamShowMoreHandler}
          className="stream-show-more-btn"
        >
          Load More
        </button>
      )}
    </motion.div>
  );
};
export default AnimeList;
