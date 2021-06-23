import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedCharActions } from "../../store/selectedCharSlice"

const Character = ({ char }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const characterClickHandler = () => {
    dispatch(selectedCharActions.selectChar(char.node.id))
  };

  return (
    <Link
      to={`${location.pathname}/character/${char.node.id}`}
      onClick={characterClickHandler}
      className="flex flex-row justify-around bg-indigo-50 h-16 my-1 w-72 mx-2 rounded-md shadow-md overflow-hidden cursor-pointer"
    >
      <div className="overflow-hidden w-16">
        <img src={char.node.image.medium} alt="" className="w-full" />
      </div>
      <div
        className="w-2/3  flex flex-col font-bold"
        style={{ fontSize: "9px" }}
      >
        <div className="flex justify-between w-full h-full">
          <div className="m-1">{char.node.name.full}</div>
          <div className="m-1 text-right">{char.voiceActors[0].name.full}</div>
        </div>
        <div className="flex justify-between  w-full h-full items-end">
          <div className="m-1">{char.role.toLowerCase()}</div>
          <div className="m-1 text-right">{char.voiceActors[0].languageV2}</div>
        </div>
      </div>
      <div className="overflow-hidden w-16">
        <img src={char.voiceActors[0].image.medium} alt="" className="w-full" />
      </div>
    </Link>
  );
};

export default Character;
