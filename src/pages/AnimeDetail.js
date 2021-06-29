import React from "react";
import { useQuery } from "@apollo/client";
import { useLocation, useParams } from "react-router-dom";
import { Markup } from "interweave";
import { hexToRgbA, secondsToDhms } from "../chooks/simples";
import AnimeList from "../components/AnimeList";
import StreamList from "../components/detailPage/StreamList";
import CircleRate from "../components/detailPage/CircleRate";
import Popularity from "../components/detailPage/Popularity";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExternalLinks from "../components/detailPage/ExternalLinks";
import Rank from "../components/detailPage/Rank";
import { detailQuery } from "../chooks/queries";
import Trailer from "../components/detailPage/Trailer";
import CharacterList from "../components/detailPage/CharacterList";
import CharacterDetail from "./CharacterDetail";
import ReviewList from '../components/detailPage/ReviewList'

const AnimeDetail = () => {
  document.body.style.overflow = "auto";

  const params = useParams();
  const id = params.animeID;
  const location = useLocation();
  const charID = location.pathname.split("/");
  const isCharacterPage = charID[3] === "character";

  const selectAnimeQuery = detailQuery;
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
  const aData = data.Media;
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

    console.log(aData.reviews)
  return (
    <div>
      {isCharacterPage && (
        <CharacterDetail
          animeID={charID[2]}
          characterID={charID[4]}
          actorID={charID[6]}
        />
      )}

      <div className="detail-grid-container">
        <div className="d-header" style={{ backgroundImage: `url(${banner})` }}>
          <div className="banner-inside">
            <h1
              className="detail-title leading-normal"
              style={{ backgroundColor: `${animeColor50}` }}
            >
              {title}
            </h1>
          </div>
        </div>
        <div className="d-sidebar px-2 bg-gray-100 shadow-inner">
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
              ` | ${secondsToDhms(aData.duration * 60, "dhm")}`}
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
          <div className="d-ranking ">
            <div className="text-center font-bold">Ranking</div>
            <hr />
            <ul>
              {rankings.map((rank) => {
                return <Rank key={rank.id} rank={rank} />;
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
                        className="bg-purple-100 p-1 rounded-2xl my-1 mx-0.5 shadow-inner text-sm"
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
          {characters && (
            <div className="d-relate  rounded-lg my-3">
              <div className="text-center font-bold mt-2 text-lg">
                Characters
              </div>

              <hr />
              <CharacterList
                characters={characters}
                mangaStaffID={aData.staff.edges[0].node.id}
                animeID={id}
              />
            </div>
          )}
          {externalLinks[0] && (
            <div>
              <div className="text-center font-bold mt-2">Links</div>
              <hr />
              <ul>
                {externalLinks.map((link) => {
                  return <ExternalLinks key={link.id} link={link} />;
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="d-main relative shadow-sm">
          <div className="absolute right-0 top-0 -mt-16">
            <CircleRate rate={aData.meanScore} size={5}  />
          </div>
          <div className="absolute right-24 top-0 -mt-16">
            <CircleRate rate={favouritesRange} symbol={faHeart} size={5}  />
          </div>
          <div className="mt-5 ">
            <Markup content={description} />
          </div>
          <br />
          <br />
          {aData.trailer && <Trailer embedId={aData.trailer.id} />} <br />
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
          <div className="d-relate bg-purple-50  md:p-10 rounded-lg shadow-md">
            <div className="text-left  text-2xl font-semibold p-4 md:p-0">
              Relations
            </div>
            <hr />
            <AnimeList
              allAnimeData={relations}
              colsInRow={4}
              initialQuantity={4}
              keyParam={"relate"}
            />
          </div>
        )}
          <div className="d-watch ">
        {streamingEpisodes[0] && (
          <div className="bg-purple-50 ssm:p-10 rounded-lg shadow-md">
            <div className="text-left text-2xl font-semibold py-5 pl-4">Stream Watch</div>
            <hr />
            <StreamList
              allEpisode={streamingEpisodes}
              colsInRow={4}
              initialQuantity={4}
              keyParam={"stream"}
            />
            </div>
        )}

        {reviews[0] &&
        <div className="bg-purple-50 md:p-5 rounded-lg shadow-md my-5">
        <div className="text-left text-2xl font-semibold ml-5 mt-5 py-5">Reviews</div>
            <hr />
          <ReviewList allReviewData={reviews} initialQuantity={2} keyParam={"review"} />
        </div>
        }
          </div>
        <div className="d-footer">6</div>
      </div>
    </div>
  );
};

export default AnimeDetail;
