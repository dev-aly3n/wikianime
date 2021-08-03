import React from "react";
import { useHistory } from "react-router-dom";
import { secondsToDhms } from "../../chooks/simples";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Markup } from "interweave"
import { useApolloClient,gql } from '@apollo/client';


const AirSlide = ({ airing, onGrabbingSlider }) => {
  const history = useHistory();
  const client = useApolloClient();

  const animeCardClickHandler = (e) => {
    e.preventDefault();
    
    client.writeQuery({
      query: gql`
      query WriteIsLoading {
        loadingbar {
          isLoading
        }
      }`,
      data: { // Contains the data to write
        loadingbar: {
          __typename: 'LoadingBar',
          isLoading: 30
        },
      }
    });
        
    setTimeout(() => {
      history.push(`/anime/${airing.id}`);
    }, 500);

  };

  return (
    <div className="relative h-110 w-full text-white group overflow-hidden anni cursor-grab active:cursor-grabbing"
    onMouseDown={()=>onGrabbingSlider()} onTouchStart={()=>onGrabbingSlider()}>
      <img className="h-full w-full object-cover transform group-hover:scale-110 transition-all duration-3000" src={airing.bannerImage} />
      <div className="w-full h-full absolute top-0 left-0 bg-opacity-60 animate-none group-hover:bg-opacity-80 transition-all duration-3000 bg-black flex justify-center md:justify-start items-center ">
      <div className="flex flex-col md:ml-16 lg:ml-56 w-40 transform group-hover:scale-95 hover:skew-x-3 transition-all duration-3000">
      <a onClick={animeCardClickHandler} href={`/anime/${airing.id}`}>
      <img
       className="h-56 w-40 cursor-pointer" src={airing.coverImage.large} />
      </a>
      </div>
      <div className=" h-56 w-56 ml-2 flex flex-col justify-between items-start  text-white">
      <a href={`/anime/${airing.id}`} onClick={animeCardClickHandler}>
      <h3 onClick={animeCardClickHandler} className=" line-clamp-1 cursor-pointer font-extrabold hover:text-blue-500 transition-all">{airing.title.english ? airing.title.english : airing.title.romaji}</h3>
      </a>
      {airing.format && <p><b>Format:</b><br/> {airing.format.toLowerCase()}</p> }
      {airing.source && <p><b>Source:</b><br/> {airing.source.toLowerCase()}</p>}
      {airing.genres && <p><b>Genres:</b><br/> {airing.genres.map((genre,index)=>{
        if(index<=2){
       return <span key={genre} className="mr-1 bg-indigo-100 rounded-md text-gray-800 px-1 text-xs font-medium">{genre}</span>
        }
      })}</p>}
      <p className="text-indigo-200">
      <span ><b>Next airing:</b> <br/> Episode {airing.nextAiringEpisode.episode}{" "}</span>
            <span className="">
              <FontAwesomeIcon icon={faClock} />{" "}
              {secondsToDhms(airing.nextAiringEpisode.timeUntilAiring, "dhm")}
            </span>
      </p>
      </div>
      <div className="w-64 hidden md:flex md:line-clamp-6 justify-center items-center lg:ml-16">
        <Markup content={airing.description} />
      </div>
      </div>


    </div>
  );
};

export default AirSlide;
