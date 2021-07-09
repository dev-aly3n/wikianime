import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const Popularity = ({ popularity }) => {

  let popularityRange = 100 - ((popularity / 400000) * 100).toFixed(0);
  if (popularityRange > 94) {
    popularityRange = 94;
  }
  if (popularityRange < 0) {
    popularityRange = 0;
  }
  
  return (
    <div className="relative w-10/12 ssm:w-6/12 sm:w-11/12 block mx-auto">
      <div className="bg-gray-600 rounded-2xl pr-3 h-3 relative overflow-hidden shadow-3xl ">
        <div
          style={{ left: -popularityRange + "%" }}
          className="bg-gradient-to-tr from-yellow-400 to-red-500 font-semibold absolute w-full h-full "
        ></div>
      </div>
      <FontAwesomeIcon
        style={{ left: 94.8 - popularityRange + "%" }}
        className="absolute text-yellow-400 text-2xl -top-2"
        icon={faFire}
      />
    </div>
  );
};

export default Popularity;
