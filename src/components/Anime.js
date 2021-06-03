import React from 'react';


const Anime = ({anime}) => {

    return(
        <div>
            <h1>id: {anime.id}</h1>
            <img src={anime.coverImage.medium} alt=''></img>
        </div>
    );
}

export default Anime;