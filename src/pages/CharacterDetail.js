import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import { selectedCharActions } from "../store/selectedCharSlice"

const CharacterDetail = ({id}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const selectedID = useSelector(state=>state.selectedChar)
    console.log(selectedID);
const modalCloseHandler = (e) =>{
if(e.target.classList.contains('modal-shadow')){
history.push(`/anime/${id}`)
dispatch(selectedCharActions.selectChar(undefined))
}
}
    return(
        <div className="modal-shadow character-page-shadow flex justify-center "
        onClick={modalCloseHandler}>
            <div className="character-page-container rounded-md w-7/12 overflow-hidden">

            </div>
        </div>
    );

}

export default CharacterDetail;