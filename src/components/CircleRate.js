import React from "react";

const CircleRate = ({ rate }) => {

  let grad,bg;
if(rate<=25){
    bg= 'bg-red-500';
    grad = `linear-gradient(${(25 / 100) * 360 + 90}deg, transparent 50%, rgb(212, 212, 212) 50%), linear-gradient(90deg, rgb(212, 212, 212) 50%, transparent 50%)`;
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

  return (
    <div>
      <div
        style={{ backgroundImage: grad }}
        className={`pie1 relative flex justify-center items-center m-2 ${bg} bg-green-300`}
      >
        <div className="pie2 bg-white absolute flex flex-col justify-center items-center text-xl font-semibold">
          <span className="text-xs font-thin h-2 text-gray-400">score</span>
          <span>{rate}%</span>
        </div>
      </div>
    </div>
  );
};

export default CircleRate;
