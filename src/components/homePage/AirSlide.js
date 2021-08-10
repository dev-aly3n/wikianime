import React from "react";
import { useHistory } from "react-router-dom";
import { secondsToDhms } from "../../chooks/simples";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Markup } from "interweave";
import { useApolloClient, gql } from "@apollo/client";

const AirSlide = ({ airing, onGrabbingSlider }) => {
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
    <div
      className="air-slide-container anni group"
      onMouseDown={() => onGrabbingSlider()}
      onTouchStart={() => onGrabbingSlider()}
    >
      <img
        className="transform group-hover:scale-110 "
        src={airing.bannerImage}
      />
      <div className="group-hover:bg-opacity-80">
        <div className="air-slide-cover-image transform group-hover:scale-95 ">
          <a onClick={animeCardClickHandler} href={`/anime/${airing.id}`}>
            <img src={airing.coverImage.large} />
          </a>
        </div>
        <div className="air-slide-info">
          <a href={`/anime/${airing.id}`} onClick={animeCardClickHandler}>
            <h3 onClick={animeCardClickHandler}>
              {airing.title.english
                ? airing.title.english
                : airing.title.romaji}
            </h3>
          </a>
          {airing.format && (
            <p>
              <b>Format:</b>
              <br /> {airing.format.toLowerCase()}
            </p>
          )}
          {airing.source && (
            <p>
              <b>Source:</b>
              <br /> {airing.source.toLowerCase()}
            </p>
          )}
          {airing.genres && (
            <p>
              <b>Genres:</b>
              <br />{" "}
              {airing.genres.map((genre, index) => {
                if (index <= 2) {
                  return (
                    <span
                      key={genre}
                      className="air-slide-genres"
                    >
                      {genre}
                    </span>
                  );
                }
              })}
            </p>
          )}
          <p className="text-indigo-200">
            <span>
              <b>Next airing:</b> <br /> Episode{" "}
              {airing.nextAiringEpisode.episode}{" "}
            </span>
            <span className="">
              <FontAwesomeIcon icon={faClock} />{" "}
              {secondsToDhms(airing.nextAiringEpisode.timeUntilAiring, "dhm")}
            </span>
          </p>
        </div>
        <div className="air-slide-desc">
          <Markup content={airing.description} />
        </div>
      </div>
    </div>
  );
};

export default AirSlide;
