//libs
import React, { useRef, useEffect } from "react";
import { decode } from "html-entities";
//components
import { motion } from "framer-motion";
import { Markup } from "interweave";
import CircleRate from "./CircleRate";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
//helpers and queries
import { showMoreLessBtn, unKnownPng } from "../../utils/helpers";

const Review = ({ review }) => {
  const reviewContentShowLess = useRef(null);

  //the review's body are a pure shit . so we need to clean it first
  //...we use reg1 any header like [__header__] to an a tag
  //...we use reg3 to add lazy loading to images
  //...we use reg2 to decode markdowns and remove <pre></pre> and <code></code> tags bcs they make problem for page styles
  let reviewText = review.body;
  let reg1 = /\[(.*?)\]\((.*?)\)/g;
  reviewText = reviewText.replace(reg1, "<a href='$2'>$1</a>");
  let reg3 = /src='(.*?)'|src="(.*?)"/g;
  reviewText = reviewText.replace(
    reg3,
    " src='$1' loading='lazy' height='270' "
  );
  let reg2 = /<pre>/;
  if (reg2.test(reviewText)) {
    reviewText = decode(reviewText);
    reviewText = reviewText.replaceAll(/__|\*|<\/?code>|<\/?pre>/g, "");
  }

  let date = new Date(review.createdAt * 1000);
  date = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;

  useEffect(() => {
    showMoreLessBtn(
      reviewContentShowLess,
      "show-more-btn showMoreReviewBtn",
      150
    );
  }, [reviewContentShowLess]);

  //bcs we show rate as a percent of 100 so we need to remove anything more than 100
  let rate;
  if (review.rating >= 100) {
    rate = 100;
  } else {
    rate = review.rating;
  }

  // I saw an avatar that it has 404 error.
  //...so we can use this to see if the avatars have error then we replace the src with our default avatar
  const avatarErrorHandler = (e) => {
    e.target.onerror = null;
    e.target.src = unKnownPng;
  };

  return (
    <motion.div
      className="review-card-container "
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
      <div className="reviewer-container">
        <div>
          <div className="review-user-info">
            <img
              loading="lazy"
              width={80}
              height={80}
              alt=""
              src={review.user.avatar.medium}
              onError={avatarErrorHandler}
            />
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

        <div className="review-date">{date}</div>
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
