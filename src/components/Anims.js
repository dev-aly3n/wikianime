import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Anims = () => {
  return (
    <Query variables={{id:25}}
      query={gql`
        query ($id: Int, $page: Int, $perPage: Int, $search: String) {
          Page(page: $page, perPage: $perPage) {
            pageInfo  {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media(id: $id, search: $search) {
              id 
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
          return <p>loading...</p>;}
        if (error) {
          return <p>wtf is error {error.message}</p>;}
        if (data) {
          console.log(data);
          return <p>{data.Page.media[0].id}</p>;}
      }}
    </Query>
  );
};

export default Anims;
