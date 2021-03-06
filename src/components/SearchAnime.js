//libs
import { useApolloClient, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

const SearchAnime = ({ anime, emptySearchValue }) => {
  const history = useHistory();
  const client = useApolloClient();

  //for showing progress bar on click
  const animeCardClickHandler = (e) => {
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
      emptySearchValue();
      history.push(`/anime/${anime.id}`);
    }, 500);
  };

  return (
    <a
      href={`/anime/${anime.id}`}
      onClick={animeCardClickHandler}
      className=" search-anime-container"
    >
      <img alt="" src={anime.coverImage.medium} />
      <h4 className="line-clamp-2 mx-2">
        {anime.title.english ? anime.title.english : anime.title.romaji}
      </h4>
    </a>
  );
};

export default SearchAnime;
