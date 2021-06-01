import React from 'react';


const Anime = ({anim}) => {
        
    
    return (
        <div>
            <h1>id : {anim.id}</h1>
            <h2 style={{backgroundColor:`${anim.coverImage.color}`}}>name : {anim.title.romaji}</h2>
            <img src={anim.coverImage.medium}></img>
        </div>
    )
}

export default Anime;