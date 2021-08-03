import { useApolloClient,gql } from '@apollo/client';
import { useHistory } from "react-router-dom";


const SearchAnime = ({anime, emptySearchValue}) => {
  const history = useHistory();
  const client = useApolloClient();

  const animeCardClickHandler = (e) => {
    e.preventDefault();
    
    client.writeQuery({
      query: gql`
      query WriteIsLoading {
        loadingbar {
          isLoading
        }
      }`,
      data: { // Contains the data to write
        loadingbar: {
          __typename: 'LoadingBar',
          isLoading: 30
        },
      }
    });
        
    setTimeout(() => {
      emptySearchValue();
      history.push(`/anime/${anime.id}`);
    }, 500);

  };

    return (
        <a href={`/anime/${anime.id}`} onClick={animeCardClickHandler} className=" flex justify-start items-center h-24 w-full cursor-pointer
        hover:text-indigo-900 hover:bg-indigo-200 transition-all">
          <img src={anime.coverImage.medium} className="object-cover h-full w-16" />
          <h4>{anime.title.english ? anime.title.english : anime.title.romaji}</h4>
        </a>
    );
}

export default SearchAnime;