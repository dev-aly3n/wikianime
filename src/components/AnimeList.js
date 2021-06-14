import React from "react";
import Anime from "./Anime";
// import { useSelector } from "react-redux";
import {motion} from 'framer-motion';

const AnimeList = ({allAnimeData}) => {
  // const data = useSelector((state) => state.animeList.homeAnime);
console.log(allAnimeData);



  return (
    <motion.div>
      <h2>Popular</h2>
      <div className="anime-lists-container">
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
