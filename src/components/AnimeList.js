import React,{useState}  from "react";
import Anime from "./Anime";
import {motion} from 'framer-motion';

const AnimeList = ({allAnimeData}) => {

  const [showMore, setShowMore] = useState({
    stream: 11 
  });

  const streamShowMoreHandler = (e) => {
    if(showMore.stream>30){
      setShowMore({stream: showMore.stream+999})
      e.target.remove();
    } else{
    setShowMore({stream: showMore.stream+10})
    }
  if(showMore.stream+10 >= allAnimeData.length){
    e.target.remove();
  }
  }

  return (
    <motion.div className="pb-10">
      <div className="anime-list-container">
      <motion.div className="anime-list">
        {allAnimeData.map((anime,index) => {
          //check where the data come from node or media
          const animeData = anime.id!==undefined ? anime : anime.node;
          if (index <= showMore.stream) {
          return <Anime key={animeData.id} anime={animeData} />;
          }
        })}
      </motion.div>
      </div>
      {allAnimeData.length>12 &&
      <button onClick={streamShowMoreHandler} className="stream-show-more-btn">Load More</button>
      }
    </motion.div>
  );
};
export default AnimeList;
