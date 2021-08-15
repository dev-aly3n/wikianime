//components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const Popularity = ({ popularity }) => {
  //pop range is negativ so we manage it from 100 to 0 not 0 to 100 and we see if it is less than 6 set it to 6 percentage.
  //... it help us to show the fire even if the media is not popular
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
