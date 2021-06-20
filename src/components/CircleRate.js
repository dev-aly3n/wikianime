import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CircleRate = ({ rate,simbol }) => {

  let grad,bg;
if(rate===null) {
rate = 0;
}
 if(rate<=25){
    bg= 'bg-red-500';
    grad = `linear-gradient(${(rate / 100) * 360 + 90}deg, transparent 50%, rgb(212, 212, 212) 50%), linear-gradient(90deg, rgb(212, 212, 212) 50%, transparent 50%)`;
} else if (rate < 50) {
    bg= 'bg-yellow-500';
    grad = `linear-gradient(${
      (rate / 100) * 360 + 90
    }deg, transparent 50%, rgb(212, 212, 212) 50%), linear-gradient(90deg, rgb(212, 212, 212) 50%, transparent 50%)`;
  } else if (rate === 50) {
    bg= 'bg-yellow-300';
    grad = `linear-gradient(90deg, rgb(212, 212, 212) 50%, transparent 50%)`;
  } else if (rate === 100) {
    bg= 'bg-green-600'
    grad = "none";
  } else if(rate<=75){
    bg= 'bg-green-300';
    grad = `linear-gradient(${
        (rate-50)/100*360 + 90
    }deg, transparent 50%, rgba(110,231,183,1) 50%), linear-gradient(90deg, rgb(212, 212, 212) 50%, transparent 50%)`;
  } else {
    bg= 'bg-green-500';
    grad = `linear-gradient(${
     (rate-50)/100*360 + 90
    }deg, transparent 50%, rgba(16,185,129,1) 50%), linear-gradient(90deg, rgb(212, 212, 212) 50%, transparent 50%)`;
  }

  console.log(rate);
  return (
    <div>
      <div
        style={{ backgroundImage: grad }}
        className={`pie1 relative flex justify-center items-center m-2 ${bg}`}
      >
        <div className="pie2 bg-white absolute flex flex-col justify-center items-center text-xl font-semibold">
        {simbol ? 
        <span className="absolute top-0 right-px">
        <FontAwesomeIcon icon={simbol} className="text-6xl text-red-500 absolute top-0.5 right-px" />
        <span className="text-white text-lg absolute top-4 right-3">{rate}%</span>
        </span>
         :
        <span className="flex flex-col justify-center items-center">
        <span className="text-xs font-thin h-2 text-gray-400">score</span>
          <span>{rate}%</span>
          </span>
        }

        </div>
      </div>
    </div>
  );
};

export default CircleRate;
