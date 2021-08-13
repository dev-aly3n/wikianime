import { Link } from "react-router-dom";
import { useApolloClient, gql } from "@apollo/client";

const Error404 = () => {
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
  return (
    <div className="error-404-container">
      <img alt="" src={process.env.PUBLIC_URL + "/media/error404.gif"} />
      <p style={{ lineHeight: 1.9 }}>
        Sorry! we couldn't find that page. <br />
        Try searching or
        <Link to="/" className="go-back-link">
          {" "}
          go back to home page!
        </Link>{" "}
      </p>
    </div>
  );
};

export default Error404;
