import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { homeAnimeData } from "../store/animeListSlice";
import AnimeList from "../components/AnimeList";

const Home = () => {
  const dispatch = useDispatch();

  const homeQuery = gql`
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(id: $id, search: $search) {
          id
          coverImage {
            large
            color
          }
          title {
            romaji
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(homeQuery, {
    variables: {
      perPage: 9,
    },
  });

  if (loading) {
    console.log("loading");
  }

  if (error) {
    console.log(error.message);
  }

  useEffect(() => {
    if (data) {
      dispatch(homeAnimeData(data));
    }
  }, [data, dispatch]);

  return (
    <div>
      <AnimeList />
    </div>
  );
};

export default Home;
