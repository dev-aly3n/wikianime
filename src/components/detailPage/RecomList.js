import React, { useState, useRef, useEffect } from "react";
import Recom from "./Recom";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { recomListQuery } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const RecomList = ({ allRecom, animeID, initialQuantity, keyParam }) => {
  const isSmallDevice = document.documentElement.clientWidth <= 768;
  const magicNum1 = 250;
  const magicNum2 = isSmallDevice ? 264 : 264 * 2;
  const magicNum3 = 275;
  const rightLeftScroll = useRef(null);
  const wastefulCover = useRef(null);

  const [showMore, setShowMore] = useState({
    recommend: initialQuantity,
  });

  let id;
  if (animeID) {
    id = animeID;
  } else {
    id = 16498;
  }
  const { loading, error, data } = useQuery(recomListQuery, {
    variables: {
      id: id,
    },
  });

  if (loading) {
    return null;
  }

  if (error) {
    console.log(error.message);
    return `Error! ${error}`;
  }

  let allRecomData;
  if (allRecom) {
    allRecomData = allRecom;
  } else {
    allRecomData = data.Media.recommendations.edges;
  }

  let isDown = false;
  let startx, scrollLeft;

  const recSliderMouseDownHandler = (e) => {
    e.preventDefault();
    isDown = true;
    startx = e.pageX - rightLeftScroll.current.offsetLeft;
    scrollLeft = rightLeftScroll.current.scrollLeft;
  };

  const recSliderMouseLeaveHandler = () => {
    isDown = false;
    wastefulCover.current.style.display = "none";
  };

  const recSliderMouseUpHandler = () => {
    isDown = false;

    wastefulCover.current.style.display = "none";

    setShowMore({ recommend: allRecomData.length });
  };

  const recSliderMouseMoveHandler = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - rightLeftScroll.current.offsetLeft;
    const walk = (x - startx) * 1.5;
    rightLeftScroll.current.scrollLeft = scrollLeft - walk;
    wastefulCover.current.style.display = "block";
  };

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
          ? showMore.recommend < allRecomData.length + 1
          : showMore.recommend < allRecomData.length + 3
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
          ? showMore.recommend < allRecomData.length + 1
          : showMore.recommend < allRecomData.length + 3
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
          ? showMore.recommend < allRecomData.length + 1
          : showMore.recommend < allRecomData.length + 3
      ) {
        setShowMore({ recommend: allRecomData.length });
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

  return (
    <React.Fragment>
      {allRecomData.length > 0 && (
        <div>
          <h4 className="recom-list-title">Recommendations</h4>
          <div className="recommendation-parent">
            <div
              className="recommendation"
              ref={rightLeftScroll}
              onTouchEnd={recTouchHandler}
              onMouseDown={recSliderMouseDownHandler}
              onMouseLeave={recSliderMouseLeaveHandler}
              onMouseUp={recSliderMouseUpHandler}
              onMouseMove={recSliderMouseMoveHandler}
            >
              <div>
                {allRecomData.map((recom, index) => {
                  if (index <= showMore.recommend - 1) {
                    const id = recom.node
                      ? recom.node.mediaRecommendation.id
                      : recom.media.id;
                    return <Recom key={keyParam + id + index} recom={recom} />;
                  }
                })}
                <div ref={wastefulCover} className="wasteful-cover"></div>
              </div>
            </div>
            <button
              onClick={leftScrollHandler}
              className="left-0 bg-gradient-to-l"
            >
              <FontAwesomeIcon
                className="font-icon-recom-list rotate-180"
                icon={faChevronCircleRight}
              />
            </button>
            <button
              onClick={rightScrollHandler}
              className="right-0 bg-gradient-to-r"
            >
              <FontAwesomeIcon
                className="font-icon-recom-list"
                icon={faChevronCircleRight}
              />
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default RecomList;
