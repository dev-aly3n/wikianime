//libs
import { useHistory } from "react-router-dom";
import { useApolloClient, gql } from "@apollo/client";

const Error404 = () => {
  const history = useHistory();
  const client = useApolloClient();

  //for hiding progress bar on load
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

  const goBackHomeHandler = (e) => {
    e.preventDefault();
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
          isLoading: 30,
        },
      },
    });

setTimeout(() => {
  history.push("/")
}, 200);
  }
  return (
    <div className="error-404-container">
      <img alt="" src={process.env.PUBLIC_URL + "/media/error404.gif"} />
      <p style={{ lineHeight: 1.9 }}>
        Sorry! we couldn't find that page. <br />
        Try searching or
        <a onClick={goBackHomeHandler} href="/" className="go-back-link">
          {" "}
          go back to home page!
        </a>{" "}
      </p>
    </div>
  );
};

export default Error404;
