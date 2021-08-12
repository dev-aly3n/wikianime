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
    <motion.div className="review-list-container">
      <div className="anime-list-container">
        <div>
          {allReviewData
            .filter((_, index) => index <= showMore.review - 1)
            .map((review) => {
              return (
                <Review
                  key={`${keyParam}-${review.node.id}`}
                  review={review.node}
                />
              );
            })}
        </div>
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
