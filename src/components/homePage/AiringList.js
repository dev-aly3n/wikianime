//components
import Airing from "./Airing";
import { motion } from "framer-motion";

const AiringList = ({ allAiring, keyParam }) => {
  // maintain the array for duplicate elements and also for those who hasn't banner image
  let counterAnime = [];
  let trimedallAiring = allAiring.filter((anime) => {
    if (!counterAnime.includes(anime.media.id)) {
      counterAnime.push(anime.media.id);
      if ((anime.media !== undefined) & (anime.media.bannerImage !== null)) {
        return anime;
      }
    }
    return false;
  });

  return (
    <motion.div className="airing-list-container">
      <div>
        <div>
          {trimedallAiring
            .filter((_, index) => index <= 7)
            .map((airing) => {
              return (
                <Airing
                  key={`${keyParam}-${airing.media.id}`}
                  airing={airing.media}
                />
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};
export default AiringList;
