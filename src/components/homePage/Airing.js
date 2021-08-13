import React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { secondsToDhms } from "../../utils/helpers";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useApolloClient, gql } from "@apollo/client";

const Airing = ({ airing }) => {
  const history = useHistory();
  const client = useApolloClient();

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

    setTimeout(() => {
      history.push(`/anime/${airing.id}`);
    }, 500);
  };

  return (
    <motion.a
      onClick={animeCardClickHandler}
      href={`/anime/${airing.id}`}
      className="airing-container group"
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
      <div>
        <img
          loading="lazy"
          height={96}
          alt=""
          className="transform group-hover:scale-110"
          src={airing.bannerImage}
        />
        <div className="group-hover:bg-opacity-60">
          <h3>
            {airing.title.english ? airing.title.english : airing.title.romaji}
          </h3>
          <p>
            <span>Episode {airing.nextAiringEpisode.episode} </span>
            <span className="">
              <FontAwesomeIcon icon={faClock} />{" "}
              {secondsToDhms(airing.nextAiringEpisode.timeUntilAiring, "dhm")}
            </span>
          </p>
        </div>
      </div>
    </motion.a>
  );
};

export default Airing;
