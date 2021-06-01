import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Anime from "./Anime";

const AnimeList = () => {
  return (
    <Query
      query={gql`
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
                medium
                color
              }
              title {
                romaji
              }
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <p>loading...</p>;
        }
        if (error) {
          return <p>wtf is error {error.message}</p>;
        }
        if (data.Page.media) {
          return data.Page.media.map((anim) => {
            return <Anime anim={anim} key={anim.id} />;
          });
        }
      }}
    </Query>
  );
};

export default AnimeList;
