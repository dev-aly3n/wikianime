//libs
import React, { useState, useEffect, useCallback } from "react";
//components
import AirSlide from "./AirSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

const AiringSlider = ({ allAiring, keyParam }) => {
  const [slideNum, setSlideNum] = useState(0);
  const [isAutoPlayOn, setIsAutoPlayOn] = useState(true);
  let autoSlidePlay;

  //callback for grabbing to stop the autoplay if user grab the slider
  const onGrabbingSlider = useCallback(() => {
    setIsAutoPlayOn(false);
    clearTimeout(autoSlidePlay);
    // eslint-disable-next-line
  }, [setIsAutoPlayOn]);

  // maintain the array for duplicate elements and also those whose haven't any banner image
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

  //set timeout to make it smoother to change the slide and set the slide to 0 if we are at the last one
  const rightHandler = () => {
    setIsAutoPlayOn(false);

    setTimeout(() => {
      if (slideNum === 7) {
        setSlideNum(0);
      } else {
        setSlideNum(slideNum + 1);
      }
    }, 200);
  };

  const leftHandler = () => {
    setIsAutoPlayOn(false);
    setTimeout(() => {
      if (slideNum === 0) {
        setSlideNum(7);
      } else {
        setSlideNum(slideNum - 1);
      }
    }, 200);
  };

  //autoplay for slide, we reset the autoplay if user click on left or right button
  useEffect(() => {
    if (isAutoPlayOn) {
      // eslint-disable-next-line
      autoSlidePlay = setTimeout(() => {
        if (slideNum === 7) {
          setSlideNum(0);
        } else {
          setSlideNum(slideNum + 1);
        }
      }, 7000);
      return () => {
        clearTimeout(autoSlidePlay);
      };
    }
  }, [slideNum, isAutoPlayOn]);
  return (
    <div className="airing-slider-container">
      {trimedallAiring
        .filter((_, index) => index === slideNum)
        .map((airing) => {
          return (
            <AirSlide
              onGrabbingSlider={onGrabbingSlider}
              key={`${keyParam}-${airing.media.id}`}
              airing={airing.media}
            />
          );
        })}

      <button onClick={leftHandler} className="left-0">
        <FontAwesomeIcon
          className="icon-btn transform rotate-180"
          icon={faChevronCircleRight}
        />
      </button>
      <button onClick={rightHandler} className="right-0">
        <FontAwesomeIcon className="icon-btn" icon={faChevronCircleRight} />
      </button>
    </div>
  );
};
export default AiringSlider;
