import React, { useState } from "react";
import Review from "./Review";
import { motion } from "framer-motion";

const ReviewList = ({ allReviewData, initialQuantity, keyParam }) => {
  const [showMore, setShowMore] = useState({
    stream: initialQuantity,
  });

  const streamShowMoreHandler = (e) => {
    if (showMore.stream > 30) {
      setShowMore({ ...showMore, stream: showMore.stream + 999 });
      e.target.style.display = "none";
    } else {
      setShowMore({ ...showMore, stream: showMore.stream + 10 });
    }
    if (showMore.stream + 10 >= allReviewData.length) {
      e.target.style.display = "none";
    }
  };

  return (
    <motion.div className="pb-10">
      <div className="anime-list-container">
        <motion.div className={`flex flex-col`}>
          {allReviewData.map((review, index) => {
            //check where the data come from node or media
            if (index <= showMore.stream - 1) {
              return (
                <Review key={`${keyParam}-${review.node.id}`} review={review.node} />
              );
            }
          })}
        </motion.div>
      </div>

      {allReviewData.length > initialQuantity && (
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
export default ReviewList;
