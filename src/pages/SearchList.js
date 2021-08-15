//libs
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
//components
import SearchAnime from "../components/SearchAnime";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//helpers and queries
import { menuSearchQuery } from "../utils/queries";

const SearchList = () => {
  const history = useHistory();
  const searchBoxRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  let searchData = [];

  //a callback for child components to set the data to "" when user click on one of the search results
  const emptySearchValue = useCallback(() => {
    setSearchValue("");
  }, [setSearchValue]);
  const searchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();
    setIsExpanded(false);
    history.push(`/search/${searchValue}`);
    setSearchValue("");
  };

  //to close or expand the search box on click on window or search box
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

  //to add a delay for request to avoid request on every key down
  useEffect(() => {
    setIsLoading(true);
    const searchTimer = setTimeout(() => {
      getSearchAnime({ variables: { search: searchValue } });
      setIsLoading(false);
    }, 700);
    return () => {
      clearTimeout(searchTimer);
    };
    // eslint-disable-next-line
  }, [searchValue]);

  const [getSearchAnime, { error, data }] = useLazyQuery(menuSearchQuery);

  if (error) {
    console.log(error);
  }

  if (data) {
    searchData = data.Page.media;
  }

  return (
    <div className="search-click searchbox-container">
      <form onSubmit={submitSearchHandler} className="search-click">
        <span className="search-click">
          <FontAwesomeIcon
            className="search-click"
            icon={faSearch}
            onClick={() => searchBoxRef.current.focus()}
          />
        </span>
        <input
          ref={searchBoxRef}
          onFocus={() => setIsExpanded(true)}
          className="search-click "
          type="text"
          value={searchValue}
          placeholder={"Search..."}
          onChange={searchChangeHandler}
        />
      </form>

      {isExpanded && (
        <div className="search-click expanded-search-results">
          <div className="search-click">
            {searchData.length === 0 && (
              <p className="search-click">
                {searchValue === "" ? (
                  "Search anything you want..."
                ) : isLoading ? (
                  ""
                ) : (
                  <motion.span
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.1, delay: 2 },
                    }}
                    initial={{ opacity: 0 }}
                    className="search-click"
                  >
                    Sorry! We couldn't find what looking for!
                  </motion.span>
                )}
              </p>
            )}
            {isLoading && <div className="search-click lds-dual-ring"></div>}
            {!isLoading && (
              <div className="searchbox-result">
                {searchData.length > 0 && (
                  <Link
                    className="searchbox-result-link"
                    to={`/search/${searchValue}`}
                    onClick={() => setSearchValue("")}
                  >
                    See All Results
                  </Link>
                )}
                <div>
                  {searchData.map((anime) => {
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
        </div>
      )}
    </div>
  );
};

export default SearchList;
