import React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import CircleRate from "../detailPage/CircleRate";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Markup } from "interweave";
import { useApolloClient, gql } from "@apollo/client";

const Top = ({ anime, rank }) => {
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
      history.push(`/anime/${anime.id}`);
    }, 500);
  };

  let description = anime.description;
  description = description.substring(0, 300);

  return (
    <div className="top-container group">
      <motion.a
        href={`/anime/${anime.id}`}
        onClick={animeCardClickHandler}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        initial={{ opacity: 0 }}
      >
        <img src={anime.coverImage.large} />

        <div className="top-info-container">
          <div className="top-status">
            <h3>
              {anime.title.english ? anime.title.english : anime.title.romaji}
            </h3>
            <div className="top-information">
              {anime.format && <p>{anime.format.toLowerCase()}</p>}
              {anime.source && <p>{anime.source.toLowerCase()}</p>}
              {anime.status && <p>{anime.status.toLowerCase()}</p>}
              <p>
                {anime.season ? anime.season.toLowerCase() : ""}{" "}
                {anime.seasonYear ? anime.seasonYear : ""}
              </p>
            </div>
            <div className="top-tag-container">
              {anime.tags.map((tag, index) => {
                if (index <= 2) {
                  return <span key={tag.name}>{tag.name}</span>;
                }
              })}
            </div>
          </div>
          <div className="top-desc">
            <Markup content={description} />
          </div>

          <div className="top-rate-score transform translate-x-4 -translate-y-4 group-hover:translate-y-0.5 group-hover:-translate-x-0.5">
            <CircleRate size={4} rate={anime.averageScore} />
          </div>
          <div
            className="top-rate-popularity transform translate-x-4 translate-y-4 
    group-hover:-translate-y-0.5 group-hover:-translate-x-0.5"
          >
            <div className="relative">
              <CircleRate
                size={4}
                rate={((anime.popularity / 300000) * 100).toFixed(0)}
                symbol={faHeart}
              />
              <p
                className="absolute top-4 left-3 text-white"
                style={{ fontSize: "9px" }}
              >
                popularity
              </p>
            </div>
          </div>
        </div>
      </motion.a>
      <span>{rank}</span>
    </div>
  );
};

export default Top;
