//libs
import React from "react";
import { useQuery } from "@apollo/client";
import { useLocation, useParams } from "react-router-dom";
import { useApolloClient, gql } from "@apollo/client";
//components
import AnimeList from "../components/AnimeList";
import StreamList from "../components/detailPage/StreamList";
import CircleRate from "../components/detailPage/CircleRate";
import Popularity from "../components/detailPage/Popularity";
import ExternalLinks from "../components/detailPage/ExternalLinks";
import Rank from "../components/detailPage/Rank";
import Trailer from "../components/detailPage/Trailer";
import CharacterList from "../components/detailPage/CharacterList";
import CharacterDetail from "./CharacterDetail";
import ReviewList from "../components/detailPage/ReviewList";
import RecomList from "../components/detailPage/RecomList";
import Loading from "./Loading";
import Errors from "./Errors";
import { Markup } from "interweave";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";
//helpers and queries
import { hexToRgbA, secondsToDhms } from "../utils/helpers";
import { detailQuery } from "../utils/queries";

const AnimeDetail = () => {
  const params = useParams();
  const location = useLocation();

  //for cloasing the progress bar on load
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

  //bcs of scroll behinde of the modal back to normal when modal close
  document.body.style.overflow = "auto";

  //check if we are in the character page or not
  const id = Number(params.animeID);
  const charID = location.pathname.split("/");
  const isCharacterPage = charID[3] === "character";

  const { loading, error, data } = useQuery(detailQuery, {
    variables: {
      id: id,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Errors errMsg={error.message} />;
  }

  const aData = data.Media;
  const title = aData.title.english ? aData.title.english : aData.title.romaji;
  const description = aData.description;
  const startDate = aData.startDate;
  const endDate = aData.endDate;
  const banner = aData.bannerImage;
  const characters = aData.characters.edges;
  const coverImage = aData.coverImage;
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
  const popularity = aData.popularity;

  //to passing it to the circular rate component we need to make it a number between 0 to 100
  let favouritesRange = ((aData.favourites / 30000) * 100).toFixed(0);
  if (favouritesRange > 100) {
    favouritesRange = 100;
  }
  if (favouritesRange < 1) {
    favouritesRange = 1;
  }
  //to check it the start date and end date are same or not (for movies we dont need to show both dates)
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
        <div
          className="d-header"
          style={{
            backgroundImage: `url(${
              banner ?? process.env.PUBLIC_URL + "/media/defaultheader.png"
            })`,
          }}
        >
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
          width={270}
          height={400}
            alt=""
            className="detail-cover-image "
            style={{
              borderColor: `${animeColor30}`,
              backgroundColor: coverImage.color,
            }}
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
          {rankings[0] && (
            <div className="d-ranking ">
              <h4>Ranking</h4>
              <hr />
              <ul>
                {rankings.map((rank) => {
                  return <Rank key={rank.id} rank={rank} />;
                })}
              </ul>
            </div>
          )}
          {studios[0] && (
            <div>
              <h4>Studios</h4>
              <hr />
              <div className="detail-side-studios">
                {studios
                  .filter((e) => e.isMain)
                  .map((st) => {
                    return <span key={st.node.id}>{st.node.name}</span>;
                  })}
              </div>
            </div>
          )}
          {studios[0] && (
            <div className="detail-side-producers">
              <h4>Producers</h4>
              <hr />
              <div>
                {studios
                  .filter((e) => !e.isMain)
                  .map((st) => {
                    return <span key={st.node.id}>{st.node.name}</span>;
                  })}
              </div>
            </div>
          )}
          {aData.source && (
            <div>
              <h4>Source</h4>
              <hr />
              <div className="detail-side-source">{aData.source}</div>
            </div>
          )}
          {characters[0] && (
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
              tags
                .filter((_, index) => index < 6)
                .map((tag) => {
                  return (
                    <span key={tag.name}>
                      <span>{tag.name}</span>
                      <span>{tag.rank}%</span>
                    </span>
                  );
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
