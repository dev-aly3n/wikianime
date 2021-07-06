import {Markup} from 'interweave';
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { detailQuery } from "../../chooks/queries";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Recom = ({recom}) => {
    const recMedia = recom.mediaRecommendation;


    const history = useHistory();
  const selectAnimeQuery = detailQuery;

  const [getAnime, { error, data }] = useLazyQuery(selectAnimeQuery);
  if (error) {
    console.log(error.message);
    return `Error! ${error}`;
  }
  if (data) {
    //using set time out just BCS React is being bitch about to pushing to another page during getting the data
    //the error was :  Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
    setTimeout(() => {
      history.push(`/anime/${recMedia.id}`);
    }, 1);
  }

  const animeCardClickHandler = (e) => {
    e.preventDefault();
    getAnime({ variables: { id: recMedia.id } });
  }

  console.log(recom);
    return(
        <div
        draggable={true}

        onClick={animeCardClickHandler}
         className="w-60 flex flex-col bg-purple-50 mx-3 overflow-hidden rounded shadow-xl cursor-pointer
        transform  hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 relative">
        <div className="flex flex-row">
        <img className="h-56 w-40 object-fill rounded" src={recMedia.coverImage.large} />
        <div className="flex flex-col items-start justify-between ml-1 text-sm h-56 pt-2 break-words">
            <p className="line-clamp-4 break-words"><b>Title:</b><br/> {recMedia.title.english? recMedia.title.english : recMedia.title.romaji}</p>
           {recMedia.format && <p><b>Format:</b><br/> {recMedia.format.toLowerCase()}</p> }
            {recMedia.source && <p><b>Source:</b><br/> {recMedia.source.toLowerCase()}</p>}
            {recMedia.status && <p><b>Status:</b><br/> {recMedia.status.toLowerCase()}</p>}
        </div>
        </div>
        {recMedia.description&& <div className="flex flex-row line-clamp-5 text-sm mx-2 my-2 break-words">
        <b>Description:</b> <Markup content={recMedia.description} />
        </div> }
        <div className="absolute top-0 left-0">
            { recom.rating &&
                (recom.rating < 0 ?  
                <div className="bg-red-500 text-white text-base px-1 rounded-br-md">{recom.rating}  <FontAwesomeIcon icon={faThumbsDown} /></div>
                :
                <div className="bg-green-500 text-white text-base px-1 rounded-br-md">+{recom.rating} <FontAwesomeIcon icon={faThumbsUp} /></div>
                )
            }
        </div>
        </div>
    );
}

export default Recom;