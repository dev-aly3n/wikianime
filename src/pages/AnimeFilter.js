//libs
import React, { useRef, useEffect, useState } from "react";
import { useApolloClient, gql, useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
//components
import TopList from "../components/homePage/TopList";
import Errors from "./Errors";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//helpers and queries
import { filterQuery } from "../utils/queries";

const AnimeFilter = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const searchBoxRef = useRef(null);
  let searchData = [];
  let path = history.location.pathname;
  path = path.split("/search/")[1];

  //for hiding the progress bar on load
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

  //to push the search query in to the address of the page to if someone has a copy of link, then he can see the search results
  //... and of course if the user click on the backward button of browser then he can see the same result
  //...we alsoe make the input onder the control of states
  const searchChangeHandler = (e) => {
    history.push(`/search/${e.target.value}`);
    let path = history.location.pathname;
    path = path.split("/search/")[1];
    setSearchValue(path);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
  };

  //to avoid sending request in every key down, we use a timeout, so if user doesn't type anything for 700 milliseconds then we send request
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

  //if we open the filter page the path is "" so we use a default one "attack on titan"
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
    return <Errors errMsg={error.message} />;
  }

  if (data) {
    searchData = data.filter.media;
  }
  
//we have unusable rendering here
//.
//..
//...

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
