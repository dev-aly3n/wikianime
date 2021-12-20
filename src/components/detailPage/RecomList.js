//libs
import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
//components
import Recom from "./Recom";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//helpers & queries
import { recomListQuery } from "../../utils/queries";
// import Errors from '../../pages/Errors';

const RecomList = ({ allRecom, animeID, initialQuantity, keyParam }) => {
  const rightLeftScroll = useRef(null);
  const wastefulCover = useRef(null);
  const [showMore, setShowMore] = useState({
    recommend: initialQuantity,
  });

  //check to see if we are in small device or large one to decide how many data should load
  const isSmallDevice = document.documentElement.clientWidth <= 768;

  //check to see if we are in home page or detail page and bcs this will throwing error for us, so we mock it
  //... to get the data of id 7 if we are in home page but we dont show this data
  let id;
  if (animeID) {
    id = animeID;
  } else {
    id = 7;
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
    //we comented next line bcs it show the Errors page in middle of the oter pages, we just ignore this error if happened
    // return <Errors errMsg={error.message} />;
    return null;
  }

  //we check to see if the data come from the parent or from the graphql request
  let allRecomData;
  if (allRecom) {
    allRecomData = allRecom;
  } else {
    allRecomData = data.Media.recommendations.edges;
  }

  // START of slider : isdown check the mouse key down , startx is the scrill left at the beggining of mouse key down and scroll left is the current scroll left
  let isDown = false;
  let startx, scrollLeft;

  //on mouse down we set startx and scrollLeft , then we update scrollLeft later but we dont update startx bcs it is constant from a click down to click up
  const recSliderMouseDownHandler = (e) => {
    e.preventDefault();
    isDown = true;
    startx = e.pageX - rightLeftScroll.current.offsetLeft;
    scrollLeft = rightLeftScroll.current.scrollLeft;
  };

  //we put wastfullCover to avoid triger click action . bcs click happen wen we mouse down and mouse up on the same object
  //... so this 0 opacity cover help us to don't mouse up at the same object
  const recSliderMouseLeaveHandler = () => {
    isDown = false;
    wastefulCover.current.style.display = "none";
  };

  //we put wastfullCover to avoid triger click action . bcs click happen wen we mouse down and mouse up on the same object
  //... so this 0 opacity cover help us to don't mouse up at the same object
  // we also update the state, we load all the data if user dragging the slider
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

  //in scroll handler btn we use our magic number to manage the scroll by using math.round
  //...we also load more data if user click on the right button. the number of new data is depend on size of the device
  const rightScrollHandler = () => {
    let recLeft = rightLeftScroll.current.scrollLeft;
    rightLeftScroll.current.scrollTo({
      top: 0,
      left: recLeft + 200,
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
  };

  //like the right handler but we dont load new data as it make sense
  const leftScrollHandler = () => {
    let recLeft = rightLeftScroll.current.scrollLeft;
    rightLeftScroll.current.scrollTo({
      top: 0,
      left: recLeft - 200,
      behavior: "smooth",
    });
  };

  //in touch handler we do same thing. maybe we need to clean this mess and make another function to use in all event listeners
  //.
  //..
  //...
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
  };

  const snapStyle = isSmallDevice
    ? {
        scrollSnapType: "x mandatory",
        scrollPaddingInline: "50px",
      }
    : {};
    
  return (
    <React.Fragment>
      {allRecomData.length > 0 && (
        <div>
          <h4 className="recom-list-title">Recommendations</h4>
          <div className="recommendation-parent">
            <div
              style={snapStyle}
              className="recommendation"
              ref={rightLeftScroll}
              onTouchEnd={recTouchHandler}
              onMouseDown={recSliderMouseDownHandler}
              onMouseLeave={recSliderMouseLeaveHandler}
              onMouseUp={recSliderMouseUpHandler}
              onMouseMove={recSliderMouseMoveHandler}
            >
              <div>
                {allRecomData
                  .filter((_, index) => showMore.recommend - 1 >= index)
                  .map((recom, index) => {
                    const id = recom.node
                      ? recom.node.mediaRecommendation.id
                      : recom.media.id;
                    return <Recom key={keyParam + id + index} recom={recom} />;
                  })}
                <div ref={wastefulCover} className="wasteful-cover"></div>
              </div>
            </div>
            <button
              onClick={leftScrollHandler}
              className="left-0 bg-gradient-to-l"
            >
              <FontAwesomeIcon
                className="font-icon-recom-list transform rotate-180"
                icon={faChevronCircleRight}
              />
            </button>
            <button
              onClick={rightScrollHandler}
              className="right-0 bg-gradient-to-r"
            >
              <FontAwesomeIcon
                className="font-icon-recom-list transform"
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
