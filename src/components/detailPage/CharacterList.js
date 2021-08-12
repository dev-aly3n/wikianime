import React, { useState } from "react";
import Character from "./Character";
import { motion } from "framer-motion";

const CharacterList = ({ characters, animeID, mangaStaffID }) => {
  const [showMore, setShowMore] = useState({
    stream: 5,
  });

  const streamShowMoreHandler = (e) => {
    if (showMore.stream > 20) {
      setShowMore({ stream: showMore.stream + 999 });
      e.target.remove();
    } else {
      setShowMore({ stream: showMore.stream + 10 });
    }
    if (showMore.stream + 10 >= characters.length) {
      e.target.remove();
    }
  };

  return (
    <div className="char-list-container">
      <motion.div>
        {characters
          .filter((_, index) => index < showMore.stream)
          .map((char) => {
            return (
              <Character
                key={char.node.id}
                char={char}
                animeID={animeID}
                mangaStaffID={mangaStaffID}
              />
            );
          })}
      </motion.div>
      {characters.length > 4 && (
        <button
          onClick={streamShowMoreHandler}
          className="stream-show-more-btn"
        >
          Load More
        </button>
      )}
    </div>
  );
};
export default CharacterList;
