import React, { useState } from "react";
import Review from "./Review";
import { motion } from "framer-motion";

const ReviewList = ({ allReviewData, initialQuantity, keyParam }) => {
  const [showMore, setShowMore] = useState({
    review: initialQuantity,
  });

  const reviewShowMoreHandler = (e) => {
    if (showMore.review > 100) {
      setShowMore({ ...showMore, review: showMore.review + 999 });
      e.target.style.display = "none";
    } else {
      setShowMore({ ...showMore, review: showMore.review + 3 });
    }
    if (showMore.review + 3 >= allReviewData.length) {
      e.target.style.display = "none";
    }
  };

  return (
    <motion.div className="pb-10">
      <div className="anime-list-container w-full ssm:w-11/12 sm:w-full md:w-11/12">
        <motion.div className={`flex flex-col`}>
          {allReviewData.map((review, index) => {
            //check where the data come from node or media
            if (index <= showMore.review - 1) {
              return (
                <Review key={`${keyParam}-${review.node.id}`} review={review.node} />
              );
            }
          })}
        </motion.div>
      </div>

      {allReviewData.length > initialQuantity && (
        <button
          onClick={reviewShowMoreHandler}
          className="stream-show-more-btn"
        >
          Load More
        </button>
      )}
    </motion.div>
  );
};
export default ReviewList;
