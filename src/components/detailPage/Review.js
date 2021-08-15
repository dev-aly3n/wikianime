import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Markup } from "interweave";
import CircleRate from "./CircleRate";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { showMoreLessBtn } from "../../utils/helpers";
import { decode } from "html-entities";

const Review = ({ review }) => {
  let reviewText = review.body;

  let reg1 = /\[(.*?)\]\((.*?)\)/g;
  reviewText = reviewText.replace(reg1, "<a href='$2'>$1</a>");
  let reg3 = /src='(.*?)'|src="(.*?)"/g;
  reviewText = reviewText.replace(reg3, " src='$1' loading='lazy' height='270' ");

  let reg2 = /<pre>/;
  if (reg2.test(reviewText)) {
    reviewText = decode(reviewText);
    reviewText = reviewText.replaceAll(/__|\*|<\/?code>|<\/?pre>/g, "");
  }


  const reviewContentShowLess = useRef(null);

  let date = new Date(review.createdAt * 1000);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDay();
  date = `${year}/${month}/${day}`;

  useEffect(() => {
    showMoreLessBtn(
      reviewContentShowLess,
      "show-more-btn to-indigo-50 hover:bg-indigo-50 hover:bg-opacity-60",
      150
    );
  }, [reviewContentShowLess]);

  let rate;
  if (review.rating >= 100) {
    rate = 100;
  } else {
    rate = review.rating;
  }

  return (
    <motion.div
      className="review-card-container "
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
      <div className="reviewer-container">
        <div>
          <div className="review-user-info">
            <img loading="lazy" width={80} height={80} alt="" src={review.user.avatar.medium} />
            <h4>{review.user.name}</h4>
          </div>
          <div className="review-rate">
            <div className="review-score">
              <CircleRate rate={review.score} size={4} />
              <br />
            </div>
            <div className="review-popularity">
              <CircleRate rate={rate} symbol={faHeart} size={4} />

              <p>this review</p>
              <p>
                <strong>{review.ratingAmount}</strong> rates
              </p>
            </div>
          </div>
        </div>

        <div className="review-date">
          {date}
        </div>
      </div>
      {review.body ? (
        <div
          className="description-character-markup review-body"
          ref={reviewContentShowLess}
        >
          <Markup content={reviewText} />
        </div>
      ) : (
        <div className="description-character-markup review-summary">
          <Markup content={review.summary} />
        </div>
      )}
    </motion.div>
  );
};

export default Review;
