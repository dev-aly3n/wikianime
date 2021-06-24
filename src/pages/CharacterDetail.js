import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {charQuery} from '../chooks/queries';

const CharacterDetail = ({ animeID,characterID,actorID }) => {
  const history = useHistory();
  const modalCloseHandler = (e) => {
    if (e.target.classList.contains("modal-shadow")) {
      history.push(`/anime/${animeID}`);
    }
  };

  const { loading, error, data } = useQuery(charQuery, {
    variables: {
      char_id: characterID,
      staff_id: actorID
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
console.log(data);

  return (
    <div
      className="modal-shadow character-page-shadow flex justify-center "
      onClick={modalCloseHandler}
    >
      <div className="character-page-container rounded-md w-7/12 overflow-hidden"></div>
    </div>
  );
};

export default CharacterDetail;
