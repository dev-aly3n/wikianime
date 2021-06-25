import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { charQuery } from "../chooks/queries";
import { Markup } from "interweave";

const CharacterDetail = ({ animeID, characterID, actorID }) => {
  const history = useHistory();
  const modalCloseHandler = (e) => {
    if (e.target.classList.contains("modal-shadow")) {
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

  console.log(character);
  console.log(staff);

  return (
    <div
      className="modal-shadow character-page-shadow flex justify-center "
      onClick={modalCloseHandler}
    >
      <div className="character-page-container rounded-md w-7/12 overflow-y-auto bg-yellow-50 flex overscroll-contain">
        <div className="w-full  flex flex-col">
          <div className="flex">
            <img
              src={character.image.large}
              className="w-48 border-4 border-yellow-600 ml-2 mt-2 "
            />
            <div className="flex flex-col mt-3 ml-2 justify-around">
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
            <div className="text-base mx-3">
              <Markup content={character.description} />
            </div>
          </div>
        </div>





        <div className="w-full  flex flex-col bg-red-50 ">
          <div className="flex justify-between">
            <div className="flex flex-col mt-3 ml-2 justify-around">
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
              className="w-48 border-4 border-red-600 mr-2 mt-2 "
            />
          </div>
          <div>
            <div className="text-base mx-3">
              <Markup content={staff.description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
