import React from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const Anime = ({ anime }) => {
  const history = useHistory();
  const selectAnimeQuery = gql`
    query SelectedAnImE($id: Int) {
      Page {
        media(id: $id) {
          id
          title {
            english
            romaji
          }
          description
          duration
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          coverImage {
            large
            color
          }
          bannerImage
          episodes
          seasonYear
          rankings {
            id
            context
            allTime
            rank
            year
          }
          format
          genres
          characters {
            edges {
              node {
                age
                gender
                name {
                  full
                }
                description
                image {
                  large
                }
              }
            }
          }
          streamingEpisodes {
            title
            thumbnail
            url
          }
          relations {
            edges {
              node {
                title {
                  english
                  romaji
                }
                id
                coverImage {
                  medium
                  color
                }
                source
              }
            }
          }
          reviews {
            edges {
              node {
                id
                user {
                  id
                  name
                  avatar {
                    medium
                  }
                }
                score
                summary
                body
              }
            }
          }
          externalLinks {
            id
            site
            url
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
    //using set time out just BCS React is being bitch about to pushing to another page during getting the data
    //the error was :  Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
    setTimeout(() => {
      history.push(`/anime/${anime.id}`);
    }, 1);
  }

  const animeCardClickHandler = () => {
    getAnime({ variables: { id: anime.id } });
  };






  return (
    <motion.div
      onClick={animeCardClickHandler}
      className="anime-card-container"
      animate={{ opacity: 1, transition: { duration: 2 } }}
      initial={{ opacity: 0 }}
    >
    <img src={anime.coverImage.large} ></img>
        <h3>
          {anime.title.english!==null ? anime.title.english : anime.title.romaji}
        </h3>
    </motion.div>
  );
};

export default Anime;
