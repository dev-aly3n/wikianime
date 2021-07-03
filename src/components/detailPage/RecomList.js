import React, { useState, useRef, useEffect } from "react";
import Recom from "./Recom";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecomList = ({ allRecom, initialQuantity }) => {
  const isSmallDevice = document.documentElement.clientWidth <= 768;
  const magicNum1 = 250;
  const magicNum2 = isSmallDevice ? 264 : 264 * 2;
  const magicNum3 = 275;
  const rightLeftScroll = useRef(null);

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
        const newRecommend = isSmallDevice
          ? showMore.recommend + 1
          : showMore.recommend + 3;
        setShowMore({ recommend: newRecommend });
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
      isDown = true;
      startx = e.pageX - recSlider.offsetLeft;
      scrollLeft = recSlider.scrollLeft;
    });
    recSlider.addEventListener("mouseleave", () => {
      isDown = false;
    });
    recSlider.addEventListener("mouseup", () => {
      isDown = false;
    });
    recSlider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - recSlider.offsetLeft;
      const walk = x - startx;
      recSlider.scrollLeft = scrollLeft - walk;
    });
  }, [rightLeftScroll.current]);
  const recMouseUpHandler = () => {
    let recLeft = rightLeftScroll.current.scrollLeft;
    let recWidth = rightLeftScroll.current.scrollWidth;
    if (recLeft / recWidth < 0.5) {
      if (showMore.recommend < allRecom.length + 3) {
        const newRecommend = showMore.recommend + 3;
        setShowMore({ recommend: newRecommend });
      }
    }
  };



  return (
    <div className=" recommendation-parent relative block mx-auto rounded-md overflow-hidden">
      <div
        className="recommendation flex justify-between items-center h-96  overflow-x-auto"
        ref={rightLeftScroll}
        onTouchEnd={recTouchHandler}
        onMouseUp={recMouseUpHandler}
      >
        <div className="flex flex-row mx-5 md:mx-10">
          {allRecom.map((recom, index) => {
            if (index <= showMore.recommend - 1) {
              return <Recom key={"rec" + recom.node.id} recom={recom.node} />;
            }
          })}
        </div>
      </div>
      <button
        onClick={leftScrollHandler}
        className="absolute left-0 top-0 h-full w-12 bg-gradient-to-l from-transparent to-gray-200 hover:to-gray-400
        focus:outline-none"
      >
        <FontAwesomeIcon
          className=" text-4xl transform rotate-180 text-gray-600"
          icon={faChevronCircleRight}
        />
      </button>
      <button
        onClick={rightScrollHandler}
        className="absolute right-0 top-0 h-full w-12 bg-gradient-to-r from-transparent to-gray-200 hover:to-gray-400
        focus:outline-none"
      >
        <FontAwesomeIcon
          className="text-4xl text-gray-600"
          icon={faChevronCircleRight}
        />
      </button>
    </div>
  );
};

export default RecomList;
