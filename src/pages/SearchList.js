import React, { useRef, useEffect, useState, useCallback } from "react";
import { menuSearchQuery } from "../chooks/queries";
import { useLazyQuery } from "@apollo/client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchAnime from "../components/SearchAnime";

const SearchList = () => {
  const [searchValue, setSearchValue] = useState("");
  // const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  let searchData = [];
 const expandingSearch = useCallback(
    () => {
      setIsExpanded(false)
    },
    [setIsExpanded],
  )
  const searchChangeHandler = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  const submitSearchHandler = () => {
    // getSearchAnim
  };

  useEffect(() => {
    const windowClickOutOfSearch = (e) => {
      if(e.target.classList.contains('search-click')){
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    }
    window.addEventListener('click', windowClickOutOfSearch);

  }, []);

  useEffect(() => {
    setIsLoading(true);
    setIsExpanded(true);
    const searchTimer = setTimeout(() => {
      setIsLoading(false);
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
  }

  return (
    <div className="search-click relative z-50 h-10 w-48 focus-within:w-64
     transition-all duration-1000 flex justify-center items-center border-0 rounded-3xl bg-indigo-800 ">

      <form className="search-click w-full h-full flex justify-between items-center z-50">
      <span className="search-click text-gray-500 cursor-pointer hover:text-indigo-200 bg-indigo-800 rounded-l-3xl
          text-2xl h-full w-10 pl-3 pr-2 pt-px flex justify-center items-center"><FontAwesomeIcon className="search-click"  icon={faSearch} /></span>
        <input className="search-click bg-indigo-800 h-full w-full focus:outline-none focus:bg-indigo-200 px-1 rounded-r-3xl"
         type="text" value={searchValue} placeholder={"Search..."} onChange={searchChangeHandler} />
      </form>


      {isExpanded && <div className="search-click absolute w-full left-0 top-5 bg-indigo-900 z-40" style={{minHeight:"120px"}}>
        <div className="search-click flex flex-col items-start justify-start mt-7 text-white ">
       {isLoading && <div class="search-click lds-dual-ring mx-auto"></div>}
      {!isLoading && searchData.map(anime=> {
        return (<SearchAnime key={anime.id} anime={anime} />)
      })}
        </div>
        </div>}
  
    </div>
  );
};

export default SearchList;
