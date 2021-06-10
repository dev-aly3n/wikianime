import React from "react";
import Anime from "./Anime";
import { useSelector } from "react-redux";
import {motion} from 'framer-motion';

const AnimeList = () => {
  const data = useSelector((state) => state.animeList.homeAnime);

  return (
    <motion.div className="anime-lists-container">
      <h2>Popular</h2>
      <motion.div className="anime-list">
        {data.map((anime) => {
          return <Anime key={anime.id} anime={anime} />;
        })}
      </motion.div>
    </motion.div>
  );
};
export default AnimeList;
