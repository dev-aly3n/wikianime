import React from "react";
import { useDispatch } from "react-redux";
import { gql, useLazyQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { selectedAnimeData } from "../store/animeListSlice";
import { useHistory } from "react-router-dom";

const Anime = ({ anime }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const selectAnimeQuery = gql`
    query ($id: Int) {
      Page {
        media(id: $id) {
          id
          coverImage {
            large
            color
          }
          title {
            romaji
          }
        }
      }
    }
  `;

  const [getAnime, { error, data }] = useLazyQuery(selectAnimeQuery);
  if (error) {
    console.log(error.message);
  }
  if (data) {
    dispatch(selectedAnimeData(data));
    //using set time out just BCS React is being bitch about to pushing to another page during getting the data
    //the error was :  Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
    setTimeout(() => {
      history.push(`/anime/${anime.id}`);
    }, 100);
  }

  const animeCardClickHandler = () => {
    getAnime({ variables: { id: anime.id } });
  };

  return (
    <motion.div
      onClick={animeCardClickHandler}
      className="anime-card-container"
      style={{ backgroundImage: `url(${anime.coverImage.large})` }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
      <div className="card-inside">
        <h3 className="text-lg font-normal mb-0 h-16 text-white">
          {anime.title.romaji}
        </h3>
      </div>
    </motion.div>
  );
};

export default Anime;
