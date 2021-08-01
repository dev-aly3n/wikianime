import React,{useState, useEffect, useCallback} from "react";
import AirSlide from "./AirSlide";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AiringSlider = ({ allAiring, keyParam }) => {
const [slideNum, setSlideNum] = useState(0);
const [isAutoPlayOn, setIsAutoPlayOn] = useState(true);

const onGrabbingSlider = useCallback(
  () => {
    setIsAutoPlayOn(false);
  },
  [setIsAutoPlayOn],
)


  // maintain the array for duplicate elements
  let counterAnime =[];
  let trimedallAiring = allAiring.filter(anime => {;
    if(!counterAnime.includes(anime.media.id)){
      counterAnime.push(anime.media.id);
      if(anime.media!==undefined & anime.media.bannerImage !==null){
      return anime;
      }
    }
  })


  const rightHandler = () => {
    setIsAutoPlayOn(false);

      setTimeout(() => {
          if(slideNum===7){
              setSlideNum(0);
            } else {
                setSlideNum(slideNum + 1);
            }
        }, 200);

  }

  const leftHandler = () => {
    setIsAutoPlayOn(false);
      setTimeout(() => {
          
          if(slideNum===0){
              setSlideNum(7);
            } else {
                setSlideNum(slideNum - 1);
            }
        }, 200);
  }
  

  useEffect(() => {
    if(isAutoPlayOn) {
const autoSlidePlay = setTimeout(() => {
  if(slideNum===7){
    setSlideNum(0);
  } else {
      setSlideNum(slideNum + 1);
  }
}, 4000);
    return () => {
      clearTimeout(autoSlidePlay);
    }
  }
  }, [slideNum])
  return (
      <div  className="flex flex-col justify-start items-center relative bg-indigo-900">
          {trimedallAiring.map((airing, index) => {
            if(index === slideNum) {
              return (

                <AirSlide onGrabbingSlider={onGrabbingSlider} key={`${keyParam}-${airing.media.id}`}  airing={airing.media} />

              );
            }
          })}

          <button
                  onClick={leftHandler}

          className="absolute left-0 top-0 h-full w-12 
        focus:outline-none"
        >
          <FontAwesomeIcon
            className=" text-4xl transform rotate-180 text-gray-500"
            icon={faChevronCircleRight}
          />
        </button>
        <button
        onClick={rightHandler}
          className="absolute right-0 top-0 h-full w-12 
        focus:outline-none"
        >
          <FontAwesomeIcon
            className="text-4xl text-gray-500"
            icon={faChevronCircleRight}
          />
        </button>
      </div>
  );
};
export default AiringSlider;
