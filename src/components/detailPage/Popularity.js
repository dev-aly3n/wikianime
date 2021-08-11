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
    <div className="popularity-container">
      <div>
        <div style={{ left: -popularityRange + "%" }}></div>
      </div>
      <FontAwesomeIcon
        style={{ left: 94.8 - popularityRange + "%" }}
        className="font-icon-pop"
        icon={faFire}
      />
    </div>
  );
};

export default Popularity;
