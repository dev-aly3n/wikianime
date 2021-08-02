import React, { useRef, useEffect, useState } from "react";
import { menuSearchQuery } from "../chooks/queries";
import { useLazyQuery } from "@apollo/client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchAnime from "../components/SearchAnime";

const SearchList = () => {
  const [searchValue, setSearchValue] = useState("");
  // const [searchData, setSearchData] = useState([]);
  let searchData = [];

  const searchChangeHandler = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  const submitSearchHandler = () => {
    // getSearchAnim
  };

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      getSearchAnime({ variables: { search: searchValue } });
    }, 700);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchValue]);

  const [getSearchAnime, { loading, error, data }] =
    useLazyQuery(menuSearchQuery);

    if(error){
      return error.message
    }

  if (data) {
    searchData = data.Page.media;
    console.log(searchData);
  }

  return (
    <div className=" relative z-50 h-10 w-48 focus-within:w-64
     transition-all duration-1000   flex justify-center items-center border-0 rounded-3xl bg-indigo-800 ">

      <form className=" w-full h-full flex justify-between items-center z-50">
      <span className="text-gray-500 cursor-pointer hover:text-indigo-200 bg-indigo-800 rounded-l-3xl
          text-2xl h-full w-10 pl-3 pr-2 pt-px flex justify-center items-center"><FontAwesomeIcon  icon={faSearch} /></span>
        <input className="bg-indigo-800 h-full w-full focus:outline-none focus:bg-indigo-200 px-1 rounded-r-3xl"
         type="text" value={searchValue} placeholder={"Search..."} onChange={searchChangeHandler} />
      </form>


      {(searchData.length >= 1) && <div className="absolute w-full left-0 top-5 bg-indigo-900 z-40">
        <div className="flex flex-col items-start justify-start mt-7 text-white ">
      {searchData.map(anime=> {
        return (<SearchAnime key={anime.id} anime={anime} />)
      })}
        </div>
        </div>}
  
    </div>
  );
};

export default SearchList;
