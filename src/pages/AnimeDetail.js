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
import ReviewList from "../components/detailPage/ReviewList";
import RecomList from "../components/detailPage/RecomList";
import { useApolloClient, gql } from "@apollo/client";
import Loading from "./Loading";

const AnimeDetail = () => {
  const client = useApolloClient();
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
        isLoading: 80,
      },
    },
  });

  document.body.style.overflow = "auto";

  const params = useParams();
  const id = Number(params.animeID);
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
    return <Loading />;
  }

  if (error) {
    console.log(error.message);
    return `Error! ${error}`;
  }
  console.log(data);

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
  const isOneDate =
    endDate.year === startDate.year &&
    endDate.month === startDate.month &&
    endDate.day === startDate.day;

  return (
    <React.Fragment>
      {isCharacterPage && (
        <CharacterDetail
          animeID={charID[2]}
          characterID={charID[4]}
          actorID={charID[6]}
        />
      )}

      <div className="detail-grid-container detail-page-container">
        <div className="d-header" style={{ backgroundImage: `url(${banner})` }}>
          <div className="banner-inside">
            <h1
              className="detail-title"
              style={{ backgroundColor: `${animeColor30}` }}
            >
              {title}
            </h1>
          </div>
        </div>
        <div className="d-sidebar">
          <img
            className="detail-cover-image"
            style={{ borderColor: `${animeColor30}` }}
            src={coverImage.large}
          />
          <h2>{title}</h2>
          <div className="format-side-detail">{aData.format}</div>
          <div className="detail-side-info">
            {aData.season && aData.season.toLowerCase()}{" "}
            {aData.seasonYear && aData.seasonYear}
            {aData.episodes && ` | ${aData.episodes} Episodes `}
            {aData.duration &&
              ` | ${secondsToDhms(aData.duration * 60, "dhm")}`}
            {aData.volumes && `${aData.volumes} Volumes | `}
            {aData.chapters && `${aData.chapters} Chapters`}
          </div>
          <div className="detail-side-genres-container">
            {genres.map((gen) => {
              return <div key={gen}>#{gen}</div>;
            })}
          </div>
          <h4>Date</h4> <hr />
          <div className="detail-side-date">
            <span>
              {" "}
              {`${startDate.year}${
                startDate.month
                  ? "/" + startDate.month + "/" + startDate.day
                  : ""
              }`}
            </span>
            {!isOneDate && <div>-</div>}
            {!isOneDate && (
              <span>
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
            <div className="detail-side-airing">
              <h4>Airing</h4> <hr />
              <div>
                Episode {nextAiringEpisode.episode}
                <span>
                  <FontAwesomeIcon icon={faClock} />{" "}
                  {secondsToDhms(nextAiringEpisode.timeUntilAiring, "dhm")}
                </span>
              </div>
            </div>
          )}
          {popularity !== undefined && (
            <div className="detail-side-pop">
              <h4>Popularity</h4>
              <Popularity popularity={popularity} />
            </div>
          )}
          <div className="d-ranking ">
            <h4>Ranking</h4>
            <hr />
            <ul>
              {rankings.map((rank) => {
                return <Rank key={rank.id} rank={rank} />;
              })}
            </ul>
          </div>
          {studios[0] && (
            <div>
              <h4>Studios</h4>
              <hr />
              <div className="detail-side-studios">
                {studios.map((st) => {
                  if (st.isMain) {
                    return <span key={st.node.id}>{st.node.name}</span>;
                  }
                })}
              </div>
            </div>
          )}
          {studios[0] && (
            <div className="detail-side-producers">
              <h4>Producers</h4>
              <hr />
              <div>
                {studios.map((st) => {
                  if (!st.isMain) {
                    return <span key={st.node.id}>{st.node.name}</span>;
                  }
                })}
              </div>
            </div>
          )}
          <h4>Source</h4>
          <hr />
          <div className="detail-side-source">{aData.source}</div>
          {characters && (
            <div>
              <h4>Characters</h4>
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
              <h4>Links</h4>
              <hr />
              <ul>
                {externalLinks.map((link) => {
                  return <ExternalLinks key={link.id} link={link} />;
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="d-main">
          <div className="detail-main-score">
            <CircleRate rate={aData.meanScore} size={5} />
          </div>
          <div className="detail-main-fav">
            <CircleRate rate={favouritesRange} symbol={faHeart} size={5} />
          </div>
          <div className="detail-main-desc">
            <Markup content={description} />
          </div>
          <br />
          <br />
          {aData.trailer && <Trailer embedId={aData.trailer.id} />} <br />
          <h4>tags:</h4>
          <div className="detail-main-tag">
            {tags &&
              tags.map((tag, index) => {
                if (index < 6) {
                  return (
                    <span key={tag.name}>
                      <span>{tag.name}</span>
                      <span>{tag.rank}%</span>
                    </span>
                  );
                }
              })}
          </div>
        </div>

        {relations[0] && (
          <div className="d-relate">
            <h4>Relations</h4>
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
            <div className="detail-watch-stream">
              <h4>Stream Watch</h4>
              <hr />
              <StreamList
                allEpisode={streamingEpisodes}
                colsInRow={4}
                initialQuantity={4}
                keyParam={"stream"}
              />
            </div>
          )}

          {reviews[0] && (
            <div className="detail-watch-reviews">
              <h4>Reviews</h4>
              <hr />
              <ReviewList
                allReviewData={reviews}
                initialQuantity={2}
                keyParam={"review"}
              />
            </div>
          )}
        </div>
        <div className="d-recom">
          <RecomList animeID={id} keyParam={"recom"} initialQuantity={7} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AnimeDetail;
