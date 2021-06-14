import React from "react";
import Anime from "./Anime";
import {motion} from 'framer-motion';

const AnimeList = ({allAnimeData}) => {

  return (
    <motion.div>
      <div className="anime-list-container">
      <motion.div className="anime-list">
        {allAnimeData.map((anime) => {
          //check where the data come from node or media
          const animeData = anime.id!==undefined ? anime : anime.node;
          return <Anime key={animeData.id} anime={animeData} />;
        })}
      </motion.div>
      </div>
    </motion.div>
  );
};
export default AnimeList;
