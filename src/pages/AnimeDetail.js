import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { Markup } from "interweave";
import { hexToRgbA, secondsToDhms } from "../chooks/simples";
import AnimeList from "../components/AnimeList";
import StreamList from "../components/StreamList";
import CircleRate from "../components/CircleRate";
import Popularity from "../components/Popularity";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AnimeDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const id = params.animeID;

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
          season
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
                  large
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
          studios {
            edges {
              isMain
              node {
                name
                siteUrl
                id
              }
            }
          }
          tags {
            name
            rank
          }
          popularity
          meanScore
          source
          chapters
          volumes
          favourites
          nextAiringEpisode {
            timeUntilAiring
            episode
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(selectAnimeQuery, {
    variables: {
      id: id,
    },
  });

  if (loading) {
    console.log("loading");
    return null;
  }

  if (error) {
    console.log(error.message);
    return `Error! ${error}`;
  }

  const aData = data.Page.media[0];
  const title = aData.title.english ? aData.title.english : aData.title.romaji;
  const description = aData.description;
  const startDate = aData.startDate;
  const endDate = aData.endDate;
  const banner = aData.bannerImage;
  const characters = aData.characters.edges;
  const coverImage = aData.coverImage;
  const animeColor50 = hexToRgbA(coverImage.color, 0.5);
  const animeColor30 = hexToRgbA(coverImage.color, 0.3);
  const externalLinks = aData.externalLinks;
  const genres = aData.genres;
  const rankings = aData.rankings;
  const relations = aData.relations.edges;
  const reviews = aData.reviews.edges;
  const streamingEpisodes = aData.streamingEpisodes;
  const studios = aData.studios.edges;
  const tags = aData.tags;
  const nextAiringEpisode = aData.nextAiringEpisode;
  let favouritesRange = ((aData.favourites / 30000) * 100).toFixed(0);
  if (favouritesRange > 100) {
    favouritesRange = 100;
  }
  if (favouritesRange < 1) {
    favouritesRange = 1;
  }
  const popularity = aData.popularity;
  let popularityRange = 100 - ((popularity / 400000) * 100).toFixed(0);
  if (popularityRange > 94) {
    popularityRange = 94;
  }
  if (popularityRange < 0) {
    popularityRange = 0;
  }
  const isOneDate =
    endDate.year === startDate.year &&
    endDate.month === startDate.month &&
    endDate.day === startDate.day;

  console.log(aData);
  return (
    <div>
      <div className="detail-grid-container">
        <div className="d-header" style={{ backgroundImage: `url(${banner})` }}>
          <div className="banner-inside">
            <h1
              className="detail-title "
              style={{ backgroundColor: `${animeColor50}` }}
            >
              {title}
            </h1>
          </div>
        </div>
        <div className="d-sidebar px-2 bg-gray-100">
          <img
            className="detail-cover-image"
            style={{ borderColor: `${animeColor30}` }}
            src={coverImage.large}
          ></img>
          <div className="block mx-auto py-2 text-xl font-semibold">
            {title}
          </div>
          <div className="w-max px-3 block mx-auto py-1 font-semibold rounded-2xl bg-gray-100 shadow-inner">
            {aData.format}
          </div>
          <div className="w-max px-3 py-1 font-semibold rounded-2xl block mx-auto text-xs">
            {aData.season && aData.season.toLowerCase()}{" "}
            {aData.seasonYear && aData.seasonYear}
            {aData.episodes && ` | ${aData.episodes} Episodes `}
            {aData.duration &&
              ` | ${
                (Math.floor(aData.duration / 60) === 0
                  ? ""
                  : Math.floor(aData.duration / 60) + "h") +
                (" " + Math.floor(aData.duration % 60)).slice(-2)
              }min`}
            {aData.volumes && `${aData.volumes} Volumes | `}
            {aData.chapters && `${aData.chapters} Chapters`}
          </div>
          <div className="flex flex-wrap justify-start my-1">
            {genres.map((gen) => {
              return (
                <div
                  key={gen}
                  className="bg-purple-100 p-1 rounded-2xl m-1 shadow-inner text-sm"
                >
                  #{gen}
                </div>
              );
            })}
          </div>
          <div className="text-center font-bold my-1">Date</div> <hr />
          <div className="flex justify-evenly font-medium text-gray-700 my-2">
            <span className="bg-gray-200 p-1 rounded-xl">
              {" "}
              {`${startDate.year}${
                startDate.month
                  ? "/" + startDate.month + "/" + startDate.day
                  : ""
              }`}
            </span>
            {!isOneDate && <span className="p-1 text">-</span>}
            {!isOneDate && (
              <span className="bg-gray-200 p-1 rounded-xl">
                {endDate.year
                  ? endDate.year +
                    (endDate.month
                      ? "/" + endDate.month + "/" + endDate.day
                      : "")
                  : "Present"}
              </span>
            )}
          </div>
          {nextAiringEpisode && (
            <div>
              <div className="text-center font-bold my-1 text-blue-400">
                Airing
              </div>{" "}
              <hr />
              <div className="px-2 py-1 text-blue-400 font-medium">
                Episode {nextAiringEpisode.episode}
                <span className="float-right">
                  <FontAwesomeIcon icon={faClock} />{" "}
                  {secondsToDhms(nextAiringEpisode.timeUntilAiring, "dhm")}
                </span>
              </div>
            </div>
          )}
          {popularity && (
            <div className="mb-3">
              <div className="text-center font-bold my-1">Popularity</div>
              <Popularity popularityRange={popularityRange} />
            </div>
          )}
          {/* <div>{title}</div>
            <div>{title}</div> */}
          <div className="d-ranking ">
            <div className="text-center font-bold">Ranking</div>
            <hr />
            <ul>
              {rankings.map((rank) => {
                let bgRank, bgBorder, rankRound;
                if (rank.context.includes("most popular")) {
                  bgRank = "bg-green-200";
                  bgBorder = "border-green-600";
                  rankRound = "bg-green-400";
                } else {
                  bgRank = "bg-yellow-200";
                  bgBorder = "border-yellow-600";
                  rankRound = "bg-yellow-400";
                }
                return (
                  <li
                    key={rank.id}
                    className={`rank ${bgRank} ${
                      rank.allTime ? `border-r-4 border-l-4 ${bgBorder} ` : ""
                    } min-w-max rounded-2xl pr-3 py-1  my-1 overflow-hidden`}
                  >
                    <span
                      className={`${rankRound} pr-1 py-7 pl-7 font-semibold -ml-6`}
                    >
                      #{rank.rank}
                    </span>
                    {" " + rank.context}
                    <span
                      className={`bg-gray-200 ${
                        rank.year ? "p-1" : ""
                      } text-gray-800 rounded-xl text-xs font-bold float-right`}
                    >
                      {rank.year ? ` ${rank.year}` : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          {studios[0] && (
            <div>
              <div className="text-center font-bold mt-2">Studios</div>
              <hr />
              <div className="flex flex-wrap justify-center py-2">
                {studios.map((st) => {
                  if (st.isMain) {
                    return (
                      <div
                        key={st.node.id}
                        className="bg-purple-100 p-1 rounded-2xl m-1 shadow-inner text-sm"
                      >
                        {st.node.name}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
          {studios[0] && (
            <div>
              <div className="text-center font-bold mt-2">Producers</div>
              <hr />
              <div className="flex flex-wrap justify-center py-2">
                {studios.map((st) => {
                  if (!st.isMain) {
                    return (
                      <div
                        key={st.node.id}
                        className="bg-purple-100 p-1 rounded-2xl m-1 shadow-inner text-sm"
                      >
                        {st.node.name}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
          <div className="text-center font-bold mt-2">Source</div>
          <hr />
          <div className="bg-purple-100 p-1 rounded-2xl m-1 shadow-inner text-xs mx-auto max-w-min">
            {aData.source}
          </div>
          {externalLinks && (
            <div>
              <div className="text-center font-bold mt-2">Links</div>
              <hr />
              <ul>
                {externalLinks.map((link) => {
                  let bg;
                  switch (link.site) {
                    case "Twitter":
                    case "Hulu":
                    case "Funimation":
                      bg = "blue";
                      break;
                    case "Official Site":
                      bg = "green";
                      break;
                    case "Youtube":
                    case "Tubi TV":
                    case "Netflix":
                      bg = "red";
                      break;
                    case "Crunchyroll":
                    case "VRV":
                      bg = "purple";
                      break;
                    case "AnimeLab":
                    case "Amazon":
                      bg = "yellow";
                      break;
                    default:
                      bg = "gray";
                  }
                  return (
                    <li key={link.id}>
                      <a
                        className={`block text-center py-2 my-3 text-base font-medium  bg-${bg}-300
                 hover:bg-${bg}-500 active:bg-${bg}-600 active:text-white
     shadow-lg rounded-sm active:shadow-inner `}
                        href={link.url}
                      >
                        {link.site}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="d-main relative">
          <div className="absolute right-0 top-0 -mt-16">
            <CircleRate rate={aData.meanScore} />
          </div>
          <div className="absolute right-24 top-0 -mt-16">
            <CircleRate rate={favouritesRange} simbol={faHeart} />
          </div>

          <div className="mt-5">
            <Markup content={description} />
          </div>
          <br />
          <br />
          <div>tags:</div>
          <div className="flex flex-wrap">
            {tags &&
              tags.map((tag, index) => {
                if (index < 6) {
                  return (
                    <div
                      className="bg-purple-100 p-1 rounded-2xl m-1 shadow-inner  text-xs "
                      key={tag.name}
                    >
                      <span className="float-left mr-4">{tag.name}</span>
                      <span className="float-right">{tag.rank}%</span>
                    </div>
                  );
                }
              })}
          </div>
        </div>

        {relations[0] && (
          <div className="d-relate">
            <AnimeList allAnimeData={relations} />
          </div>
        )}
        {streamingEpisodes[0] && (
          <div className="d-watch">
            <StreamList allEpisode={streamingEpisodes} />
          </div>
        )}
        <div className="d-footer">6</div>
      </div>
    </div>
  );
};

export default AnimeDetail;
