import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { menuSearchQuery } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchAnime from "../components/SearchAnime";
import { Link, useHistory } from "react-router-dom";

const SearchList = () => {
  const history = useHistory();
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

  const submitSearchHandler = (e) => {
    e.preventDefault();
    setIsExpanded(false);
    history.push(`/search/${searchValue}`);
    setSearchValue("");
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
                    class="search-click"
                  >
                    Sorry! We couldn't find what looking for!
                  </motion.span>
                )}
              </p>
            )}
            {isLoading && <div class="search-click lds-dual-ring"></div>}
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
