import React,{useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { unKnownPng } from "../../utils/helpers";
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
      className="char-container"
    >
      <div className="char-image">
        <img src={char.node.image.medium} alt=""/>
      </div>
      <div
        className="char-staff-info"
        style={{ fontSize: "9px" }}
      >
        <div className="char-name">
          <span>{char.node.name.full}</span>
          <span>
            {staffID !== mangaStaffID ? char.voiceActors[0].name.full : ""}
          </span>
        </div>
        <div className="char-role">
          <span>{char.role.toLowerCase()}</span>
          <span>
            {staffID !== mangaStaffID ? char.voiceActors[0].languageV2 : ""}
          </span>
        </div>
      </div>
      <div className="staff-image">
        <img
          src={
            staffID !== mangaStaffID
              ? char.voiceActors[0].image.medium
              : unKnownPng
          }
          alt=""
        />
      </div>
    </Link>
  );
};

export default Character;
