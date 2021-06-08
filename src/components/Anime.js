import React from 'react';
import { S_Container } from '../styles/styles';
import {motion} from 'framer-motion';

const Anime = ({anime}) => {
    return(
        <S_Container animate={{opacity:1 , transition: {duration: 5}}} initial={{opacity:0}}>
            <h1>id: {anime.id}</h1>
            <img src={anime.coverImage.medium} alt=''></img>
        </S_Container>
    );
}

export default Anime;