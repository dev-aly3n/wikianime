import React,{useEffect, useRef} from "react";
import { useLazyQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedCharActions } from "../../store/selectedCharSlice";
import { unKnownPng } from "../../chooks/simples";
import { useApolloClient,gql } from '@apollo/client';


const Character = ({ char, animeID, mangaStaffID }) => {
  const client = useApolloClient();
  const linkRef = useRef(null);
  let charID, staffID;
  charID = char.node.id;
  if (char.voiceActors[0] === undefined) {
    staffID = mangaStaffID;
  } else {
    staffID = char.voiceActors[0].id;
  }

  useEffect(() => {
    
    linkRef.current.addEventListener('click', charClickHandler)
  }, []);
  
  const charClickHandler = () => {
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
  }

  return (
    <Link ref={linkRef}
      to={`/anime/${animeID}/character/${charID}/actor/${staffID}`}
      className="flex flex-row justify-around bg-indigo-50 h-16 my-1 mx-2 rounded-md shadow-md overflow-hidden
       cursor-pointer w-full hover:scale-105 active:scale-100 active:shadow-inner hover-card-num-1"
    >
      <div className="overflow-hidden w-16">
        <img src={char.node.image.medium} alt="" className="w-full h-full" />
      </div>
      <div
        className="w-2/3  flex flex-col font-bold"
        style={{ fontSize: "9px" }}
      >
        <div className="flex justify-between w-full h-full">
          <div className="m-1">{char.node.name.full}</div>
          <div className="m-1 text-right">
            {staffID !== mangaStaffID ? char.voiceActors[0].name.full : ""}
          </div>
        </div>
        <div className="flex justify-between  w-full h-full items-end">
          <div className="m-1">{char.role.toLowerCase()}</div>
          <div className="m-1 text-right">
            {staffID !== mangaStaffID ? char.voiceActors[0].languageV2 : ""}
          </div>
        </div>
      </div>
      <div className="overflow-hidden w-16">
        <img
          src={
            staffID !== mangaStaffID
              ? char.voiceActors[0].image.medium
              : unKnownPng
          }
          alt=""
          className="w-full h-full"
        />
      </div>
    </Link>
  );
};

export default Character;