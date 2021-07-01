import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Markup } from "interweave";
import CircleRate from "./CircleRate";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { showMoreLessBtn } from "../../chooks/simples";
import {decode} from 'html-entities';

const Review = ({ review }) => {
  let reviewText = review.body;

  let reg1 = /\[(.*?)\]\((.*?)\)/g;
  reviewText = reviewText.replace(reg1, "<a href='$2'>$1</a>");

  let reg2 = /<pre>/;
  if (reg2.test(reviewText)){
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
      className="review-card-container mb-4 rounded-md flex flex-col"
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
      <div className=" flex bg-indigo-100 px-3 pt-2 rounded-md shadow-lg relative">
        <div className="flex flex-row justify-between items-end mt-2 w-full">
          <div className=" flex flex-col justify-center items-center mr-1">
            <img
              className=" w-20 h-20 object-cover rounded-full border-2 border-gray-500 shadow-2xl"
              src={review.user.avatar.medium}
            />
            <h4 className="text-xs md:text-base font-medium md:-mt-1">
              {review.user.name}
            </h4>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col justify-center items-center mx-1">
              <CircleRate rate={review.score} size={4} />
              <br />
            </div>
            <div className="flex flex-col justify-center items-center">
              <CircleRate rate={rate} symbol={faHeart} size={4} />
              
              <p
                style={{ fontSize: "7px" }}
                className="font-semibold text-center absolute -mt-7 text-white"
              >
                this review
              </p>
              <p
                style={{ fontSize: "10px" }}
                className="font-medium text-center"
              >
                <strong>{review.ratingAmount}</strong> rates
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm absolute top-3 md:top-3 right-0 rounded-l-lg bg-indigo-500 text-white px-2">
          {date}
        </div>
      </div>
      {review.body ? (
        <div
          className="description-character-markup text-base mx-1 mt-0.5 rounded-lg bg-blue-50 px-6 py-3 shadow-xl
          "
          ref={reviewContentShowLess}
        >
          <Markup content={reviewText} />
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
