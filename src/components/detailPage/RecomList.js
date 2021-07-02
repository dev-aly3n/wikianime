import React, { useState, useRef } from "react";
import Recom from './Recom';
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecomList = ({allRecom, initialQuantity}) => {
    const rightLeftScroll = useRef(null);
    
    const [showMore, setShowMore] = useState({
        recommend: (document.documentElement.clientWidth<768 ? 3 : initialQuantity),
        });

    const rightScrollHandler = () => {
       let recLeft = rightLeftScroll.current.scrollLeft;
       let recWidth = rightLeftScroll.current.offsetWidth;
       let slideChildren = rightLeftScroll.current.firstElementChild.children;
       if (showMore.recommend +1 < allRecom.length){
    //    slideChildren[(document.documentElement.clientWidth<768 ? showMore.recommend - 2:""  )].;
    if(document.documentElement.clientWidth<768){
        
    }
       }
        if(showMore.recommend < allRecom.length + 3){
        setShowMore(document.documentElement.clientWidth<768 ? {recommend: showMore.recommend + 1} :{recommend: showMore.recommend + 3})
    }
    console.log(document.documentElement.clientWidth);
    }
    const leftScrollHandler = () => {
       let recLeft = rightLeftScroll.current.scrollLeft;
       let recWidth = rightLeftScroll.current.offsetWidth;
       rightLeftScroll.current.scrollTo({top:0, left: recLeft - 500,
        behavior: 'smooth'})
    }

    return(
        <div className=" relative block mx-auto md:w-10/12 rounded-md overflow-hidden">
<div className="recommendation flex justify-between items-center h-96  overflow-x-auto"
ref={rightLeftScroll}>
<div className="flex flex-row mx-5 md:mx-10">
        {allRecom.map((recom, index) =>{
            if (index <= showMore.recommend - 1) {
    return <Recom key={"rec"+recom.node.id} recom={recom.node} />
            }
        })}
        </div>
        </div>
        <button onClick={leftScrollHandler} className="absolute left-0 top-0 h-full w-12 bg-gradient-to-l from-transparent to-gray-200 hover:to-gray-400
        focus:outline-none">
            <FontAwesomeIcon className=" text-4xl transform rotate-180 text-gray-600" icon={faChevronCircleRight} />
        </button>
        <button onClick={rightScrollHandler} className="absolute right-0 top-0 h-full w-12 bg-gradient-to-r from-transparent to-gray-200 hover:to-gray-400
        focus:outline-none">
        <FontAwesomeIcon className="text-4xl text-gray-600" icon={faChevronCircleRight} />

        </button>
        </div>
    );
}

export default RecomList;