import { useApolloClient, gql } from "@apollo/client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { filterQuery } from "../chooks/queries";
import { useLazyQuery } from "@apollo/client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopList from "../components/homePage/TopList";
import {useHistory} from 'react-router-dom';

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
    history.push(`/search/${e.target.value}`)
    let path = history.location.pathname;
    path = path.split("/search/")[1];
    setSearchValue(path);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
  }


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


  useEffect(() => {
    if(path ===""){
      path = "attack on titan";
    }
    setTimeout(() => {
      setIsLoading(true)
    }, 800);
    setTimeout(() => {
      getSearchAnime({ variables: { search: path } });

      setIsLoading(false)
    }, 1500);
  }, []);


  const [getSearchAnime, { error, data }] = useLazyQuery(filterQuery);

  if (error) {
    return error.message;
  }

  if (data) {
      console.log(data);
    searchData = data.filter.media;
  }

  return (
    <div className="flex flex-col justify-center items-center pt-24 mx-auto bg-indigo-50 w-full">
      <div className="flex justify-center items-center h-14 w-full">
        <form onSubmit={searchSubmitHandler} className=" w-full ssm:w-10/12 xl:w-8/12 mx-1 ssm:mx-auto h-full flex justify-between items-center">
          <span
            className=" text-gray-500 cursor-pointer hover:text-indigo-200 bg-indigo-900 rounded-l-3xl
          text-2xl h-full w-10 pl-3 pr-2 pt-px flex justify-center items-center"
          >
            <FontAwesomeIcon
              className="text-white"
              icon={faSearch}
              onClick={() => searchBoxRef.current.focus()}
            />
          </span>
          <input
            ref={searchBoxRef}
            className=" bg-indigo-800 h-full w-full focus:outline-none focus:bg-indigo-200 px-1 rounded-r-3xl
          text-indigo-50 focus:text-indigo-900"
            type="text"
            value={path}
            placeholder={"Search..."}
            onChange={searchChangeHandler}
          />
        </form>
      </div>

        <div className=" w-full top-5 rounded-b-xl " style={{minHeight:"700px"}}>
          <div className=" w-full flex flex-col items-start justify-start mt-7">
            {searchData.length === 0 && (
              <p className=" px-2 mx-auto text-sm mt-5">
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
                    class="m-auto text-2xl text-indigo-900 text-center"
                  >
                    Sorry! We couldn't find what looking for! <br/>
                    Try another one!
                  </motion.p>
                )}
              </p>
            )}
            {isLoading && (
              <div class=" lds-dual-ring mx-auto"></div>
            )}
            {!isLoading && (
              <div className="w-full ssm:w-10/12 xl:w-8/12 mx-auto">
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
