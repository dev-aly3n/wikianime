import React, { useState, useCallback } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Markup } from "interweave";
import { hexToRgbA } from "../chooks/simples";
import AnimeList from "../components/AnimeList";
import StreamList from "../components/StreamList";

import CircleRate from "../components/CircleRate";
import Popularity from "../components/Popularity";

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
  const popularity = aData.popularity;
  let popularityRange = 100 - ((popularity / 600000) * 100).toFixed(0);
  if(popularityRange>94){
    popularityRange = 94;
  }

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
            {aData.season && aData.season.toLowerCase()} {aData.seasonYear} |{" "}
            {aData.episodes} Episodes |{" "}
            {(Math.floor(aData.duration / 60) === 0
              ? ""
              : Math.floor(aData.duration / 60) + "h") +
              (" " + Math.floor(aData.duration % 60)).slice(-2) +
              "min"}
          </div>
          <div>
            {popularity && (
              <div>
                <div className="text-center font-bold my-2">Popularity</div>
                <Popularity popularityRange={popularityRange} />
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-start py-2">
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
          <div className="text-center font-bold">Date</div> <hr />
          <div className="flex justify-evenly font-medium text-gray-700 my-2">
            <span className="bg-gray-200 p-1 rounded-xl">
              {" "}
              {`${startDate.year}${
                startDate.month
                  ? "/" + startDate.month + "/" + startDate.day
                  : ""
              }`}
            </span>
            <span className="p-1">to</span>
            <span className="bg-gray-200 p-1 rounded-xl">{`${endDate.year}${
              endDate.month ? "/" + endDate.month + "/" + endDate.day : ""
            }`}</span>
          </div>
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
          <div className="text-center font-bold mt-2">Studios</div>
          <hr />
          <div className="flex flex-wrap justify-start py-2">
            {studios &&
              studios.map((st) => {
                return (
                  <div
                    key={st.node.id}
                    className="bg-purple-100 p-1 rounded-2xl m-1 shadow-inner text-sm"
                  >
                    {st.node.name}
                  </div>
                );
              })}
          </div>
        </div>

        <div className="d-main relative">
          <div className="absolute right-0 top-0 -mt-16">
            <CircleRate rate={aData.meanScore} />
          </div>
          <div className="mt-5">
            <Markup content={description} />
          </div>
          <br />
          <br />
          <div>tags:</div>
          <div className="flex flex-wrap">
            {tags &&
              tags.map((tag) => {
                return (
                  <span
                    className="bg-purple-100 p-1 rounded-2xl m-1 shadow-inner  text-xs "
                    key={tag.name}
                  >
                    {tag.name}#{tag.rank}{" "}
                  </span>
                );
              })}
          </div>
        </div>

        <div className="d-relate">
          <AnimeList allAnimeData={relations} />
        </div>
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
