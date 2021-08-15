//libs
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
//components
import AnimeList from "../components/AnimeList";
import CircleRate from "../components/detailPage/CircleRate";
import Errors from "./Errors";
import { Markup } from "interweave";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
//helpers and queries
import { charQuery } from "../utils/queries";
import { showMoreLessBtn, unKnownPng, monthNames } from "../utils/helpers";

const CharacterDetail = ({ animeID, characterID, actorID }) => {
  const staffContentShowLess = useRef(null);
  const charContentShowLess = useRef(null);
  const history = useHistory();

  const modalCloseHandler = (e) => {
    if (
      e.target.classList.contains("character-page-shadow") ||
      e.target.classList.contains("modal-close") ||
      e.target.parentElement.classList.contains("modal-close")
    ) {
      //managing 2 scrollbar
      document.body.style.overflow = "auto";
      history.push(`/anime/${animeID}`);
    }
  };

  const { loading, error, data } = useQuery(charQuery, {
    variables: {
      char_id: characterID,
      staff_id: actorID,
    },
  });

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <div className="character-page-shadow" onClick={modalCloseHandler}>
        <div className="character-page-container">
          <span className="modal-close ">
            <FontAwesomeIcon
              className="fixed modal-close"
              icon={faTimesCircle}
            />
          </span>
          <Errors errMsg={error.message} />
        </div>
      </div>
    );
  }
  const character = data.Character;
  const staff = data.Staff;
  const charAnimeList = character.media.edges;
  const staffAnimeList = staff.staffMedia.edges;

  //circular rate components need a number from 0 to 100 so we need to make it first
  let charFavouritesRange = ((character.favourites / 30000) * 100).toFixed(0);
  let actorFavouritesRange = ((staff.favourites / 10000) * 100).toFixed(0);

  // staff description
  showMoreLessBtn(
    staffContentShowLess,
    "show-more-btn staff-show-more-desc-btn",
    250
  );

  //character desciption
  showMoreLessBtn(
    charContentShowLess,
    "show-more-btn character-show-more-desc-btn",
    250
  );

  //managing 2 scrollbar
  document.body.style.overflow = "hidden";

  return (
    <div className="character-page-shadow" onClick={modalCloseHandler}>
      <div className="character-page-container">
        <span className="modal-close ">
          <FontAwesomeIcon className="fixed modal-close" icon={faTimesCircle} />
        </span>

        <div className="character-info">
          <div>
            <div className="character-image">
              <img
                alt=""
                src={character.image.large ? character.image.large : unKnownPng}
              />
              <div>
                <CircleRate
                  rate={charFavouritesRange}
                  symbol={faHeart}
                  size={5}
                />
              </div>
            </div>
            <div className="character-desc">
              <h1>
                <strong> Name:</strong> <br />
                {character.name.full}
              </h1>
              {character.age && (
                <p>
                  <strong>Age:</strong>
                  <br />
                  {character.age} years
                </p>
              )}
              {character.dateOfBirth.day && (
                <p>
                  <strong>Date of Birth:</strong>
                  <br />
                  {character.dateOfBirth.day}{" "}
                  {monthNames[character.dateOfBirth.month - 1]}
                </p>
              )}
              {character.gender && (
                <p>
                  <strong>Gender:</strong>
                  <br />
                  {character.gender}
                </p>
              )}
            </div>
          </div>

          <div>
            {character.description && (
              <div
                className="description-character-markup"
                ref={charContentShowLess}
              >
                <Markup content={character.description} />
              </div>
            )}
            {charAnimeList[0] && (
              <div className="character-media-list">
                <h3>Character media</h3>
                {
                  <AnimeList
                    allAnimeData={charAnimeList}
                    colsInRow={3}
                    initialQuantity={3}
                    keyParam={"charMedia"}
                  />
                }
              </div>
            )}
          </div>
        </div>

        <div className="staff-info">
          <div>
            <div className="staff-desc">
              <h1>
                <strong> Name:</strong> <br />
                {staff.name.full}
              </h1>
              {staff.age && (
                <p>
                  <strong>Age:</strong>
                  <br />
                  {staff.age} years
                </p>
              )}
              {staff.dateOfBirth.day && (
                <p>
                  <strong>Date of Birth:</strong>
                  <br />
                  {staff.dateOfBirth.day}{" "}
                  {monthNames[staff.dateOfBirth.month - 1]}
                </p>
              )}
              {staff.gender && (
                <p>
                  <strong>Gender:</strong>
                  <br />
                  {staff.gender}
                </p>
              )}
            </div>
            <div className="staff-image">
              <img
                alt=""
                src={staff.image.large ? staff.image.large : unKnownPng}
              />
              <div>
                <CircleRate
                  rate={actorFavouritesRange}
                  symbol={faHeart}
                  size={5}
                />
              </div>
            </div>
          </div>
          <div>
            {staff.description && (
              <div
                className="description-staff-markup"
                ref={staffContentShowLess}
              >
                <Markup content={staff.description} />
              </div>
            )}
            {staffAnimeList[0] && (
              <div className="staff-media-list">
                <h3>Staff media</h3>
                {
                  <AnimeList
                    allAnimeData={staffAnimeList}
                    colsInRow={3}
                    initialQuantity={3}
                    keyParam={"staffMedia"}
                  />
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
