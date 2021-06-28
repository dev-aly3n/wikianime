import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Markup } from "interweave";
import CircleRate from "./CircleRate";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { showMoreLessBtn } from "../../chooks/simples";

const Review = ({ review }) => {
  const reviewContentShowLess = useRef(null);

  let date = new Date(review.createdAt * 1000);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDay();
  date = `${year}/${month}/${day}`;

  const animeCardClickHandler = (e) => {
    e.preventDefault();
  };

  showMoreLessBtn(
    reviewContentShowLess,
    "show-more-btn to-indigo-50 hover:bg-indigo-50 hover:bg-opacity-60",
    150
  );

  let rate;
  if (review.rating >= 100) {
    rate = 100;
  } else {
    rate = review.rating;
  }

  return (
    <motion.div
      onClick={animeCardClickHandler}
      className="review-card-container my-4 rounded-md flex flex-col"
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
      <div className=" flex bg-indigo-100 px-3 pt-1 rounded-md shadow-lg relative">
        <div className="flex flex-row justify-between items-center mt-2">
          <div className=" flex flex-col justify-center items-center">
            <img
              className=" w-20 h-20 object-cover rounded-full border-2 border-gray-500 shadow-2xl"
              src={review.user.avatar.medium}
            />
            <h4 className="text-xs md:text-base font-bold md:-mt-1">{review.user.name}</h4>
          </div>
          <div className="flex flex-col justify-center items-center">
            <CircleRate rate={review.score} size={4} />
<br/>
          </div>
          <div className="flex flex-col justify-center items-center">
            <CircleRate rate={rate} symbol={faHeart} size={4} />
            <p className="text-xs font-medium -mt-2 text-center">
              {review.ratingAmount} rates to this review
            </p>
          </div>
        </div>
        <div className="text-sm absolute top-0 ssm:top-3 right-0  rounded-l-lg bg-indigo-500 text-white px-2">
          {date}
        </div>
      </div>
      {review.body ? (
        <div
          className="description-character-markup text-base mx-3 mt-0.5 rounded-lg bg-blue-50 px-3 pt-3 shadow-xl"
          ref={reviewContentShowLess}
        >
          <Markup content={review.body} />
        </div>
      ) : (
        <div className="description-character-markup text-base mx-1 my-2 rounded-lg bg-blue-50 px-3 pt-3 shadow-lg">
          <Markup content={review.summary} />
        </div>
      )}
    </motion.div>
  );
};

export default Review;
