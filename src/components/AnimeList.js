import React from "react";
import Anime from "./Anime";
import {useSelector} from 'react-redux'

const AnimeList = () => {

  const data = useSelector(state => state.animeList.homeAnime)

  return (
    <div>
<h1>hi</h1> 
{
data.map(anime => {
  return <Anime key={anime.id} anime={anime}/>
})
}
</div>
  );
}
export default AnimeList;
