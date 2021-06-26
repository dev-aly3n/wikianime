import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { charQuery } from "../chooks/queries";
import { Markup } from "interweave";
import AnimeList from "../components/AnimeList";
import { showMoreLessBtn } from "../chooks/simples";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CharacterDetail = ({ animeID, characterID, actorID }) => {
  const staffContentShowLess = useRef(null);
  const charContentShowLess = useRef(null);

  const history = useHistory();
  const modalCloseHandler = (e) => {
    if (e.target.classList.contains("modal-shadow") || e.target.classList.contains("close-modal-char-staff") ) {
      history.push(`/anime/${animeID}`);
      //managing 2 scrollbar
      document.body.style.overflow = "auto";

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
    "show-more-btn to-blue-50 hover:bg-blue-50 hover:bg-opacity-60"
  );

  //character desciption
  showMoreLessBtn(
    charContentShowLess,
    "show-more-btn to-red-50 hover:bg-red-50 hover:bg-opacity-60"
  );

      //managing 2 scrollbar
document.body.style.overflow = "hidden";




  
  return (
    <div
      className="modal-shadow character-page-shadow flex justify-center overflow-y-scroll"
      onClick={modalCloseHandler}
    >
      <div className="character-page-container absolute rounded-md flex flex-col md:flex-row w-full ssm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-7/12 bg-yellow-50  overscroll-contain ">





      <span
       className="close-modal-char-staff absolute top-2 right-14 text-5xl text-gray-500 hover:text-gray-900 cursor-pointer z-50"
      >
      <FontAwesomeIcon className="fixed close-modal-char-staff" icon={faTimesCircle} />
      </span>




        <div className="w-full md:w-1/2 flex flex-col h-full ">
          <div className="flex">
            <img
              src={character.image.large}
              className="w-44 h-64 object-cover border-2 border-red-100 ml-2 mt-2 rounded-lg shadow-md"
            />
            <div className="flex flex-col mx-1 mt-2 justify-around text-base rounded-lg bg-red-50 w-full p-2 shadow-lg">
              <h1>
                <strong> Name:</strong> <br />
                {character.name.full}
              </h1>
              <p>
                <strong>Age:</strong>
                <br />
                {character.age} years
              </p>
              <p>
                <strong>Date of Birth:</strong>
                <br />
                {character.dateOfBirth.day}{" "}
                {monthNames[character.dateOfBirth.month - 1]}
              </p>
              <p>
                <strong>Gender:</strong>
                <br />
                {character.gender}
              </p>
            </div>
          </div>
          <div>
            <div
              className="text-base mx-1 my-2 rounded-lg bg-red-50 px-3 pt-3 shadow-lg"
              ref={charContentShowLess}
            >
              <Markup content={character.description} />
            </div>
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
          </div>
        </div>


        <div className="w-full md:w-1/2 flex flex-col h-full">
          <div className="flex justify-between">
            <div className="flex flex-col mx-1 mt-2 justify-around text-base rounded-lg bg-blue-50 w-full p-2 shadow-lg">
              <h1>
                <strong> Name:</strong> <br />
                {staff.name.full}
              </h1>
              <p>
                <strong>Age:</strong>
                <br />
                {staff.age} years
              </p>
              <p>
                <strong>Date of Birth:</strong>
                <br />
                {staff.dateOfBirth.day}{" "}
                {monthNames[staff.dateOfBirth.month - 1]}
              </p>
              <p>
                <strong>Gender:</strong>
                <br />
                {staff.gender}
              </p>
            </div>
            <img
              src={staff.image.large}
              className="w-44 h-64 object-cover border-2 border-blue-100 mr-2 mt-2 rounded-lg shadow-md"
            />
          </div>
          <div>
            <div
              className="text-base mx-1 my-2 rounded-lg bg-blue-50 px-3 pt-3 shadow-lg"
              ref={staffContentShowLess}
            >
              <Markup content={staff.description} />
            </div>
            <div className=" text-base mx-1 my-2 rounded-lg bg-blue-50 p-3 shadow-lg ssm:px-20 md:p-1">
            <h3 className="font-semibold text-xl ">Actor media</h3>
              {
                <AnimeList
                  allAnimeData={staffAnimeList}
                  colsInRow={3}
                  initialQuantity={3}
                  keyParam={"staffMedia"}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
