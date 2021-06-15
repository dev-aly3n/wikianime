import React,{useState} from "react";
import Stream from "./Stream";
import { motion } from "framer-motion";

const StreamList = ({ allEpisode }) => {

  const [showMore, setShowMore] = useState({
    stream: 3 
  });

  const streamShowMoreHandler = (e) => {
    if(showMore.stream>20){
      setShowMore({stream: showMore.stream+999})
      e.target.remove();
    } else{
    setShowMore({stream: showMore.stream+10})
    }
  if(showMore.stream+10 >= allEpisode.length){
    e.target.remove();
  }
  }

  return (
    <motion.div className="pb-10">
      <div className="anime-list-container">
        <motion.div className="anime-list">
          {allEpisode.map((episode, index) => {
            if (index <= showMore.stream) {
              return <Stream key={episode.title} episode={episode} />;
            }
          })}
        </motion.div>
      </div>
      <button onClick={streamShowMoreHandler} className="stream-show-more-btn">Load More</button>
    </motion.div>
  );
};
export default StreamList;
