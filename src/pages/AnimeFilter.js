import { useApolloClient, gql } from "@apollo/client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { filterQuery } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopList from "../components/homePage/TopList";
import { useHistory } from "react-router-dom";

const AnimeFilter = () => {
  const client = useApolloClient();
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
        isLoading: 80,
      },
    },
  });

  const history = useHistory();
  const searchBoxRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let searchData = [];
  let path = history.location.pathname;
  path = path.split("/search/")[1];

  const searchChangeHandler = (e) => {
    history.push(`/search/${e.target.value}`);
    let path = history.location.pathname;
    path = path.split("/search/")[1];
    setSearchValue(path);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
  };

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

  useEffect(() => {
    if (path === "") {
      // eslint-disable-next-line
      path = "attack on titan";
    }
    setTimeout(() => {
      setIsLoading(true);
    }, 800);
    setTimeout(() => {
      getSearchAnime({ variables: { search: path } });

      setIsLoading(false);
    }, 1500);
    
  }, []);

  const [getSearchAnime, { error, data }] = useLazyQuery(filterQuery);

  if (error) {
    return error.message;
  }

  if (data) {
    searchData = data.filter.media;
  }

  return (
    <div className="anime-filter-container">
      <div className="anime-filter-form">
        <form onSubmit={searchSubmitHandler}>
          <span>
            <FontAwesomeIcon
              className="text-white"
              icon={faSearch}
              onClick={() => searchBoxRef.current.focus()}
            />
          </span>
          <input
            ref={searchBoxRef}
            type="text"
            value={path}
            placeholder={"Search..."}
            onChange={searchChangeHandler}
          />
        </form>
      </div>

      <div className="filter-result-container">
        <div>
          {searchData.length === 0 && (
            <div>
              {searchValue === "" ? (
                ""
              ) : isLoading ? (
                ""
              ) : (
                <motion.p
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.1, delay: 2 },
                  }}
                  initial={{ opacity: 0 }}
                >
                  Sorry! We couldn't find what looking for! <br />
                  Try another one!
                </motion.p>
              )}
            </div>
          )}
          {isLoading && <div className=" lds-dual-ring"></div>}
          {!isLoading && (
            <div className="filter-anime-top-list-container">
              <TopList
                allAnimeData={searchData}
                initialQuantity={8}
                keyParam={"top100"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeFilter;
