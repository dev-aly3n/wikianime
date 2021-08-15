//libs
import React, { useEffect, useRef } from "react";
import { useApolloClient, gql } from "@apollo/client";
//helpers & queries
import { unKnownPng } from "../../utils/helpers";
//components
import { Link } from "react-router-dom";

const Character = ({ char, animeID, mangaStaffID }) => {
  const client = useApolloClient();
  const linkRef = useRef(null);
  //bcs manga hasn't any voice actore, we see if it is manga, then we replace the voice actore by the creator of manga
  let charID, staffID;
  charID = char.node.id;
  if (char.voiceActors[0] === undefined) {
    staffID = mangaStaffID;
  } else {
    staffID = char.voiceActors[0].id;
  }

  useEffect(() => {
    linkRef.current.addEventListener("click", charClickHandler);
    // eslint-disable-next-line
  }, []);

  //showing the progress bar for loading new page
  const charClickHandler = () => {
    client.writeQuery({
      query: gql`
        query WriteIsLoading {
          loadingbar {
            isLoading
          }
        }
      `,
      data: {
        // Contains the data to write
        loadingbar: {
          __typename: "LoadingBar",
          isLoading: 30,
        },
      },
    });
  };

  return (
    <Link
      ref={linkRef}
      to={`/anime/${animeID}/character/${charID}/actor/${staffID}`}
      className="char-container"
    >
      <div className="char-image">
        <img
          loading="lazy"
          width={64}
          height={64}
          src={char.node.image.medium}
          alt=""
        />
      </div>
      <div className="char-staff-info" style={{ fontSize: "9px" }}>
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
          loading="lazy"
          width={64}
          height={64}
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
