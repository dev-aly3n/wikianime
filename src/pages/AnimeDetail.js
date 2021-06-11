import React from "react";
import {useSelector} from 'react-redux'

const AnimeDetail = () => {

// const params = useParams();
// const id = params.animeID;

const anime = useSelector(state => state.animeList.selected)

  return (
    <div>
  
    </div>
  );
};

export default AnimeDetail;
