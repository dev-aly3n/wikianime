import { useApolloClient, gql } from "@apollo/client";

const useProgressBar = (percentage) => {
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
        isLoading: percentage,
      },
    },
  });
};

export default useProgressBar;
