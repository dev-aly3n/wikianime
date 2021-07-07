import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { charQuery } from "../chooks/queries";
import { Markup } from "interweave";
import AnimeList from "../components/AnimeList";
import { showMoreLessBtn, unKnownPng } from "../chooks/simples";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleRate from "../components/detailPage/CircleRate";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const CharacterDetail = ({ animeID, characterID, actorID }) => {
  const staffContentShowLess = useRef(null);
  const charContentShowLess = useRef(null);
  //if character hasn't any actor

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
    console.log("loading");
    return null;
  }

  if (error) {
    console.log(error.message);
    return `Error! ${error}`;
  }
  const character = data.Character;
  const staff = data.Staff;
  const charAnimeList = character.media.edges;
  const staffAnimeList = staff.staffMedia.edges;

  let charFavouritesRange = ((character.favourites / 30000) * 100).toFixed(0);
  let actorFavouritesRange = ((staff.favourites / 10000) * 100).toFixed(0);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // staff description
  showMoreLessBtn(
    staffContentShowLess,
    "show-more-btn to-blue-50 hover:bg-blue-50 hover:bg-opacity-60",
    250
  );

  //character desciption
  showMoreLessBtn(
    charContentShowLess,
    "show-more-btn to-red-50 hover:bg-red-50 hover:bg-opacity-60",
    250
  );

  //managing 2 scrollbar
  document.body.style.overflow = "hidden";

  return (
    <div
      className="character-page-shadow flex justify-center overflow-y-scroll"
      onClick={modalCloseHandler}
    >
      <div className="character-page-container z-50 absolute rounded-md flex flex-col md:flex-row w-full
       ssm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-7/12 bg-yellow-50  overscroll-contain ">
        <span className="modal-close absolute top-2 right-14 text-5xl text-gray-500 hover:text-gray-900 cursor-pointer z-50">
          <FontAwesomeIcon className="fixed modal-close" icon={faTimesCircle} />
        </span>

        <div className="w-full md:w-1/2 flex flex-col h-full ">
          <div className="flex">
            <div className="w-80 h-64 border-2 border-red-100 ml-2 mt-2 rounded-lg shadow-md relative overflow-hidden">
              <img
                src={character.image.large ? character.image.large : unKnownPng}
                className="w-full h-full object-cover block"
              />
              <div className="absolute bottom-0 left-0">
                <CircleRate rate={charFavouritesRange} symbol={faHeart} size={5} />
              </div>
            </div>
            <div className="flex flex-col mx-1 mt-2 justify-around text-base rounded-lg bg-red-50 w-full p-2 shadow-lg">
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
                className="description-character-markup text-base mx-1 my-2 rounded-lg bg-red-50 px-3 pt-3 shadow-lg"
                ref={charContentShowLess}
              >
                <Markup content={character.description} />
              </div>
            )}
            {charAnimeList[0] && (
              <div className="text-base mx-1 my-2 rounded-lg bg-red-50 p-3 shadow-lg ssm:px-20 md:p-1">
                <h3 className="font-semibold text-xl">Character media</h3>
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

        <div className="w-full md:w-1/2 flex flex-col h-full">
          <div className="flex justify-between">
            <div className="flex flex-col mx-1 mt-2 justify-around text-base rounded-lg bg-blue-50 w-full p-2 shadow-lg">
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
            <div className="w-80 h-64 border-2 border-red-100 mr-2 mt-2 rounded-lg shadow-md relative overflow-hidden">
              <img
                src={staff.image.large ? staff.image.large : unKnownPng}
                className="w-full h-full object-cover block"
              />
              <div className="absolute bottom-0 right-0">
                <CircleRate rate={actorFavouritesRange} symbol={faHeart} size={5} />
              </div>
            </div>
          </div>
          <div>
            {staff.description && (
              <div
                className="description-character-markup text-base mx-1 my-2 rounded-lg bg-blue-50 px-3 pt-3 shadow-lg"
                ref={staffContentShowLess}
              >
                <Markup content={staff.description} />
              </div>
            )}
            {staffAnimeList[0] && (
              <div className=" text-base mx-1 my-2 rounded-lg bg-blue-50 p-3 shadow-lg ssm:px-20 md:p-1">
                <h3 className="font-semibold text-xl ">Staff media</h3>
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
