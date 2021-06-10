import React from 'react';
import {useDispatch} from 'react-redux';
import {gql, useLazyQuery} from '@apollo/client'
import {motion} from 'framer-motion'
import {selectedAnimeData} from '../store/animeListSlice';

const Anime = ({anime}) => {

    const dispatch = useDispatch();

    const selectAnimeQuery = gql`
    query ($id: Int) {
        Page {
          media(id: $id) {
            id
            coverImage {
              large
              color
            }
            title {
              romaji
            }
          }
        }
      }
  `;

  const [getAnime, {error, data}] = useLazyQuery(selectAnimeQuery);
  if (error){
      console.log(error.message);
  }
  if(data){
dispatch(selectedAnimeData(data));
}


    return(
        <motion.div onClick={()=>getAnime({variables:{id:anime.id}})} className="anime-card-container"
         style={{backgroundImage:`url(${anime.coverImage.large})`}}
         animate={{opacity:1 , transition: {duration: 2}}} initial={{opacity:0}}>

         <div className="card-inside">

            <h3 className="text-lg font-normal mb-0 h-16 text-white">{anime.title.romaji}</h3>
         </div>
            
        </motion.div>
    );
}

export default Anime;