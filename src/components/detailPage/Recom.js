import { Markup } from "interweave";
import { useHistory } from "react-router-dom";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import useProgressBar from '../../utils/useProgressBar';

const Recom = ({ recom, widthParam }) => {
  const recMedia = recom.node ? recom.node.mediaRecommendation : recom.media;

  const rating = recom.node ? recom.node.rating : recom.rating;

  const history = useHistory();

  const animeCardClickHandler = (e) => {
    e.preventDefault();

    useProgressBar(30);


    setTimeout(() => {
      history.push(`/anime/${recMedia.id}`);
    }, 500);
  };
  return (
    <motion.a
      draggable={true}
      href={`/anime/${recMedia.id}`}
      onClick={animeCardClickHandler}
      className={` ${
        widthParam ? "w-full ssm:w-8/12 sm:w-11/12 my-3" : "w-60 mx-3"
      }  recom-container`}
    >
      <div className="recom-detail">
        <img loading="lazy" width={160} height={224} alt="" src={recMedia.coverImage.large} style={{backgroundColor:recMedia.coverImage.color}} />
        <div className="recom-info">
          <p className="line-clamp-4">
            <b>Title:</b>
            <br />{" "}
            {recMedia.title.english
              ? recMedia.title.english
              : recMedia.title.romaji}
          </p>
          {recMedia.format && (
            <p>
              <b>Format:</b>
              <br /> {recMedia.format.toLowerCase()}
            </p>
          )}
          {recMedia.source && (
            <p>
              <b>Source:</b>
              <br /> {recMedia.source.toLowerCase()}
            </p>
          )}
          {recMedia.status && (
            <p>
              <b>Status:</b>
              <br /> {recMedia.status.toLowerCase()}
            </p>
          )}
        </div>
      </div>
      {recMedia.description && (
        <div className="recom-desc line-clamp-5">
          <b>Description:</b> <Markup content={recMedia.description} />
        </div>
      )}
      <div className="recom-rating">
        {rating !== undefined &&
          (rating <= 0 ? (
            <div className="red-rate">
              {rating} <FontAwesomeIcon icon={faThumbsDown} />
            </div>
          ) : (
            <div className="green-rate">
              +{rating} <FontAwesomeIcon icon={faThumbsUp} />
            </div>
          ))}
      </div>
    </motion.a>
  );
};

export default Recom;
