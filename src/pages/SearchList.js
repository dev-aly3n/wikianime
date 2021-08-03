import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { menuSearchQuery } from "../chooks/queries";
import { useLazyQuery } from "@apollo/client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchAnime from "../components/SearchAnime";

const SearchList = () => {
  const searchBoxRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  let searchData = [];

  const emptySearchValue = useCallback(() => {
    setSearchValue("");
  }, [setSearchValue]);
  const searchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const submitSearchHandler = () => {
    // getSearchAnim
  };

  useEffect(() => {
    const windowClickOutOfSearch = (e) => {
      if (e.target.classList.contains("search-click")) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };
    window.addEventListener("click", windowClickOutOfSearch);
    return () => {
      setIsExpanded(false);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const searchTimer = setTimeout(() => {
      getSearchAnime({ variables: { search: searchValue } });
      setIsLoading(false);
    }, 700);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchValue]);

  const [getSearchAnime, { error, data }] = useLazyQuery(menuSearchQuery);

  if (error) {
    return error.message;
  }

  if (data) {
    searchData = data.Page.media;
  }

  return (
    <div
      className="search-click relative z-50 h-10 w-48 focus-within:w-64
     transition-all duration-1000 flex justify-center items-center border-0 rounded-3xl bg-indigo-800 "
    >
      <form className="search-click w-full h-full flex justify-between items-center z-50">
        <span
          className="search-click text-gray-500 cursor-pointer hover:text-indigo-200 bg-indigo-800 rounded-l-3xl
          text-2xl h-full w-10 pl-3 pr-2 pt-px flex justify-center items-center"
        >
          <FontAwesomeIcon
            className="search-click"
            icon={faSearch}
            onClick={() => searchBoxRef.current.focus()}
          />
        </span>
        <input
          ref={searchBoxRef}
          onFocus={() => setIsExpanded(true)}
          className="search-click bg-indigo-800 h-full w-full focus:outline-none focus:bg-indigo-200 px-1 rounded-r-3xl"
          type="text"
          value={searchValue}
          placeholder={"Search..."}
          onChange={searchChangeHandler}
        />
      </form>

      {isExpanded && (
        <div
          className="search-click absolute w-full left-0 top-5 bg-indigo-900 z-40"
          style={{ minHeight: "120px" }}
        >
          <div className="search-click flex flex-col items-start justify-start mt-7 text-white ">
            {searchData.length === 0 && (
              <p className="m-auto mt-5">
                {searchValue === "" ? (
                  "Search anything you want..."
                ) : isLoading ? (
                  ""
                ) : (
                  <motion.span
                    animate={{ opacity: 1, transition: { duration: 0.1, delay:1.5 } }}
                    initial={{ opacity: 0 }}
                    class="m-auto text-sm"
                  >
                    Sorry! We couldn't find what you want!
                  </motion.span>
                )}
              </p>
            )}
            {isLoading && (
              <div class="search-click lds-dual-ring mx-auto"></div>
            )}
            {!isLoading &&
              searchData.map((anime) => {
                return (
                  <SearchAnime
                    key={anime.id}
                    anime={anime}
                    emptySearchValue={emptySearchValue}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchList;
