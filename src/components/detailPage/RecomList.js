import React, { useState, useRef, useEffect } from "react";
import Recom from "./Recom";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecomList = ({ allRecom, initialQuantity, keyParam }) => {
  const isSmallDevice = document.documentElement.clientWidth <= 768;
  const magicNum1 = 250;
  const magicNum2 = isSmallDevice ? 264 : 264 * 2;
  const magicNum3 = 275;
  const rightLeftScroll = useRef(null);
  const wastefulCover = useRef(null);

  const [showMore, setShowMore] = useState({
    recommend: initialQuantity,
  });

  const rightScrollHandler = () => {
    let recLeft = rightLeftScroll.current.scrollLeft;
    let recWidth = rightLeftScroll.current.scrollWidth;

    if ((Math.round(recLeft) - magicNum1) % magicNum2 !== 0) {
      recLeft = Math.round((Math.round(recLeft) - magicNum1) / magicNum2);
      recLeft = recLeft * magicNum2 + magicNum1;
      rightLeftScroll.current.scrollTo({
        top: 0,
        left: recWidth === recLeft ? recLeft + magicNum3 : recLeft + magicNum2,
        behavior: "smooth",
      });
      if (
        isSmallDevice
          ? showMore.recommend < allRecom.length + 1
          : showMore.recommend < allRecom.length + 3
      ) {
        const newRecommend = isSmallDevice
          ? showMore.recommend + 1
          : showMore.recommend + 3;
        setShowMore({ recommend: newRecommend });
      }
    } else {
      rightLeftScroll.current.scrollTo({
        top: 0,
        left: recLeft === 0 ? recLeft + magicNum1 : recLeft + magicNum2,
        behavior: "smooth",
      });

      if (
        isSmallDevice
          ? showMore.recommend < allRecom.length + 1
          : showMore.recommend < allRecom.length + 3
      ) {
        const newRecommend = isSmallDevice
          ? showMore.recommend + 1
          : showMore.recommend + 3;
        setShowMore({ recommend: newRecommend });
      }
    }
  };
  const leftScrollHandler = () => {
    let recLeft = rightLeftScroll.current.scrollLeft;
    let recWidth = rightLeftScroll.current.scrollWidth;
    if ((Math.round(recLeft) - magicNum1) % magicNum2 !== 0) {
      recLeft = Math.round((Math.round(recLeft) - magicNum1) / magicNum2);
      recLeft = recLeft * magicNum2 + magicNum1;
      rightLeftScroll.current.scrollTo({
        top: 0,
        left: recWidth === recLeft ? recLeft - magicNum3 : recLeft - magicNum2,
        behavior: "smooth",
      });
    } else {
      rightLeftScroll.current.scrollTo({
        top: 0,
        left: recWidth === recLeft ? recLeft - magicNum3 : recLeft - magicNum2,
        behavior: "smooth",
      });
    }
  };

  const recTouchHandler = () => {
    let recLeft = rightLeftScroll.current.scrollLeft;
    let recWidth = rightLeftScroll.current.scrollWidth;

    if (recLeft / recWidth < 0.5) {
      if (
        isSmallDevice
          ? showMore.recommend < allRecom.length + 1
          : showMore.recommend < allRecom.length + 3
      ) {
        // const newRecommend = isSmallDevice
        //   ? showMore.recommend + 1
        //   : showMore.recommend + 3;
        setShowMore({ recommend: allRecom.length });
      }
    }
    if ((Math.round(recLeft) - magicNum1) % magicNum2 !== 0 && recLeft !== 0) {
      recLeft = Math.round((Math.round(recLeft) - magicNum1) / magicNum2);
      recLeft = recLeft * magicNum2 + magicNum1;
      rightLeftScroll.current.scrollTo({
        top: 0,
        left: recLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const recSlider = rightLeftScroll.current;
    let isDown = false;
    let startx, scrollLeft;
    recSlider.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDown = true;
      startx = e.pageX - recSlider.offsetLeft;
      scrollLeft = recSlider.scrollLeft;
    });
    recSlider.addEventListener("mouseleave", () => {
      isDown = false;
      wastefulCover.current.style.display="none";

    });
    recSlider.addEventListener("mouseup", () => {
      isDown = false;

          
      
      wastefulCover.current.style.display="none";
      
      setShowMore({ recommend: allRecom.length });
    });
    recSlider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - recSlider.offsetLeft;
      const walk = (x - startx)*1.5;
      recSlider.scrollLeft = scrollLeft - walk;
      wastefulCover.current.style.display="block";
      

    });
  }, [rightLeftScroll.current]);
  

  return (
    
      <div className=" recommendation-parent relative block mx-auto overflow-hidden rounded-md">
        <div
          className="recommendation flex justify-between items-center h-96  overflow-x-auto"
          ref={rightLeftScroll}
          onTouchEnd={recTouchHandler}
        >
          <div className="flex flex-row mx-5 md:mx-10 relative">
            {allRecom.map((recom, index) => {
              if (index <= showMore.recommend - 1) {
                const id = (recom.node ? recom.node.mediaRecommendation.id : recom.media.id);
                return <Recom key={keyParam + id + index} recom={recom} />;
              }
            })}
            <div ref={wastefulCover} className="wasteful-cover absolute top-0 left-0 h-full w-full opacity-0 hidden cursor-pointer"></div>

          </div>
        </div>
        <button
          onClick={leftScrollHandler}
          className="absolute left-0 top-0 h-full w-12 bg-gradient-to-l from-transparent to-gray-200 hover:to-gray-400
        focus:outline-none group"
        >
          <FontAwesomeIcon
            className=" text-4xl transform rotate-180 text-gray-600 active:scale-y-95"
            icon={faChevronCircleRight}
          />
        </button>
        <button
          onClick={rightScrollHandler}
          className="absolute right-0 top-0 h-full w-12 bg-gradient-to-r from-transparent to-gray-200 hover:to-gray-400
        focus:outline-none"
        >
          <FontAwesomeIcon
            className="text-4xl text-gray-600 transform active:scale-y-95"
            icon={faChevronCircleRight}
          />
        </button>
      </div>
    
  );
};

export default RecomList;
