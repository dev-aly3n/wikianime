import React from "react";
import Airing from "./Airing";
import { motion } from "framer-motion";

const AiringList = ({ allAiring, keyParam }) => {


  // maintain the array for duplicate elements
  let counterAnime =[];
  let trimedallAiring = allAiring.filter(anime => {;
    if(!counterAnime.includes(anime.media.id)){
      counterAnime.push(anime.media.id);
      if(anime.media!==undefined & anime.media.bannerImage !==null){
      return anime;
      }
    }
  })

  return (
    <motion.div className="pb-10">
      <div className="flex flex-col justify-start items-center">
        <motion.div >
          {trimedallAiring.map((airing,index) => {
            if(index <=7){
              return (
                <Airing key={`${keyParam}-${airing.media.id}`} airing={airing.media} />
              );
            }
            
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};
export default AiringList;
