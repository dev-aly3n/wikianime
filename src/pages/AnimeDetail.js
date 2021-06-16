import React, { useState, useCallback } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Markup } from "interweave";
import { hexToRgbA } from "../chooks/simples";
import AnimeList from "../components/AnimeList";
import StreamList from "../components/StreamList";

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

  let aData = data.Page.media[0];
  let title = aData.title.english ? aData.title.english : aData.title.romaji;
  console.log(aData);
  let description = aData.description;
  let startDate = aData.startDate;
  let endDate = aData.endDate;
  let banner = aData.bannerImage;
  let characters = aData.characters.edges;
  let coverImage = aData.coverImage;
  let animeColor50 = hexToRgbA(coverImage.color, 0.5);
  let animeColor30 = hexToRgbA(coverImage.color, 0.3);
  let externalLinks = aData.externalLinks;
  let genres = aData.genres;
  let rankings = aData.rankings;
  let relations = aData.relations.edges;
  let reviews = aData.reviews.edges;
  let streamingEpisodes = aData.streamingEpisodes;

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
          <div className="w-max px-3 py-1 font-semibold rounded-2xl block mx-auto">
             {aData.episodes} Episodes | {(Math.floor(aData.duration / 60) ===0 ? "" : Math.floor(aData.duration / 60) + "h") + (" " + Math.floor(aData.duration % 60)).slice(-2) +"min"}
          </div>
          <div className="flex flex-wrap justify-start py-2">
            {genres.map(gen => {
              return <div className="bg-purple-100 p-1 rounded-2xl m-1 shadow-inner">#{gen}</div>
            })}
          </div>
          <div className="text-center font-bold">Date</div> <hr/>
          <div className="flex justify-evenly font-medium text-gray-700 my-2">
            <span className="bg-gray-200 p-1 rounded-xl"> {`${startDate.year}${startDate.month ? "/" + startDate.month +"/"+ startDate.day: ""}`}</span>
            <span className="p-1">to</span> 
             <span className="bg-gray-200 p-1 rounded-xl">{`${endDate.year}${endDate.month ? "/" + endDate.month +"/"+ endDate.day: ""}`}</span>
          </div>



          {/* <div>{title}</div>
            <div>{title}</div> */}

          <div className="d-ranking ">
            <div className="text-center font-bold">Ranking</div>
            <hr />
            {rankings.map((rank) => {
              let bgRank,bgBorder,rankRound;
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
                <div
                  key={rank.id}
                  className={`rank ${bgRank} ${rank.allTime? `border-r-4  ${bgBorder} `:""} min-w-max pr-3 py-1 rounded-3xl my-1 overflow-hidden`}
                >
                  <span className={`${rankRound} pr-1 py-7 pl-7 font-semibold -ml-6`}>
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
                </div>
              );
            })}
          </div>
        </div>

        <div className="d-main">
          <Markup content={description} />
        </div>

        <div className="d-relate">
          <AnimeList allAnimeData={relations} />
        </div>
{streamingEpisodes[0] &&
  <div className="d-watch">
          <StreamList allEpisode={streamingEpisodes} />
        </div>
}
        <div className="d-footer">6</div>
      </div>
    </div>
  );
};

export default AnimeDetail;
