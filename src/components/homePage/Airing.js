import React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { secondsToDhms } from "../../chooks/simples";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useApolloClient,gql } from '@apollo/client';


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
      }`,
      data: { // Contains the data to write
        loadingbar: {
          __typename: 'LoadingBar',
          isLoading: 30
        },
      }
    });
        
    setTimeout(() => {
      history.push(`/anime/${airing.id}`);
    }, 500);

  };

  return (
    <motion.a
      onClick={animeCardClickHandler}
      href={`/anime/${airing.id}`}
      className="cursor-pointer group "
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
      <div className="flex flex-col relative h-24 justify-center items-center
       overflow-hidden max-w-sm">


        <img className="h-full w-full object-cover transform transition-all duration-1500 group-hover:scale-110" src={airing.bannerImage} />


        <div className="absolute bg-gray-900 bg-opacity-75 w-full h-full flex flex-col justify-evenly items-center
         text-white group-hover:bg-opacity-60">
          <h3 className="mx-2 line-clamp-1 text-base font-semibold text-yellow-400">
            {airing.title.english ? airing.title.english : airing.title.romaji}
          </h3>
          <p className="flex justify-around w-full text-sm">
            <span>Episode {airing.nextAiringEpisode.episode}{" "}</span>
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
