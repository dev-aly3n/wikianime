//libs
import { useHistory } from "react-router-dom";
import { useApolloClient, gql } from "@apollo/client";
//components
import { Markup } from "interweave";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Recom = ({ recom, widthParam }) => {
  const history = useHistory();
  const client = useApolloClient();

  //check to see that this components render in home page or detail page
  // optional chaning and nullish coalescing oprator myObj?.prop ?? "default"
  //... by this way we check if recom.node is undefined or nall and if yes then read data fom recom.media
  const recMedia = recom.node?.mediaRecommendation ?? recom.media;
  const rating = recom.node?.rating ?? recom.rating;

  //showing progress bar on click
  const animeCardClickHandler = (e) => {
    e.preventDefault();
    client.writeQuery({
      query: gql`
        query WriteIsLoading {
          loadingbar {
            isLoading
          }
        }
      `,
      data: {
        // Contains the data to write
        loadingbar: {
          __typename: "LoadingBar",
          isLoading: 30,
        },
      },
    });

    //we set timeout to show the progressbar before routing , if we push immediately it doesn't show progressbar
    setTimeout(() => {
      history.push(`/anime/${recMedia.id}`);
    }, 500);
  };

  //to remove extra data from description
  let description = recMedia.description;
  description = description.substring(0, 300);
  return (
    <motion.a
      style={{ scrollSnapAlign: "start" }}
      draggable={true}
      href={`/anime/${recMedia.id}`}
      onClick={animeCardClickHandler}
      className={` ${
        widthParam ? "w-full ssm:w-8/12 sm:w-11/12 my-3" : "w-60 mx-3"
      }  recom-container `}
    >
      <div className="recom-detail">
        <img
          loading="lazy"
          width={160}
          height={224}
          alt=""
          src={recMedia.coverImage.large}
          style={{ backgroundColor: recMedia.coverImage.color }}
        />
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
          <b>Description:</b> <Markup content={description} />
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
