import React from 'react';

const Anime = ({anime}) => {


    const animeClickHandler = () => {
        console.log(anime.id);
    }

    return(
        <div onClick={animeClickHandler} className="anime-card-container" style={{backgroundImage:`url(${anime.coverImage.large})`}}
         animate={{opacity:1 , transition: {duration: 5}}} initial={{opacity:0}}>
         <div className="card-inside">

            <h3 className="text-lg font-normal mb-0 h-16 text-white">{anime.title.romaji}</h3>
         </div>
            
        </div>
    );
}

export default Anime;