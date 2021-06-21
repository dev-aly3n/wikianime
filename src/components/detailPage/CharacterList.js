import React,{useState} from "react";
import Character from "./Character";
import { motion } from "framer-motion";

const CharacterList = ({ characters }) => {

  const [showMore, setShowMore] = useState({
    stream: 5
  });

  const streamShowMoreHandler = (e) => {
    if(showMore.stream>20){
      setShowMore({stream: showMore.stream+999})
      e.target.remove();
    } else{
    setShowMore({stream: showMore.stream+10})
    }
  if(showMore.stream+10 >= characters.length){
    e.target.remove();
  }
  }

  return (
      <div className="pb-10">
    <motion.div className="flex flex-row flex-wrap">
    {characters.map((char,index) => {
        if(index <showMore.stream){
    return <Character key={char.node.id} char={char} />
        }
    })}
    </motion.div>
    {characters.length>4 &&
      <button onClick={streamShowMoreHandler} className="stream-show-more-btn">Load More</button>
      }
    </div>
  );
};
export default CharacterList;
