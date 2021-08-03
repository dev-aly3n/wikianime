import { useApolloClient,gql } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { detailQuery } from "../chooks/queries";
import { useLazyQuery } from "@apollo/client";

const SearchAnime = ({anime}) => {
  const client = useApolloClient();
  const history = useHistory();
  const selectAnimeQuery = detailQuery;

  // const [getAnime, { error, data }] = useLazyQuery(selectAnimeQuery);
  // if (error) {
  //   console.log(error.message);
  //   return `Error! ${error}`;
  // }
  // if (data) {
  //   //using set time out just BCS React is being bitch about to pushing to another page during getting the data
  //   //the error was :  Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
  //   setTimeout(() => {
  //     history.push(`/anime/${anime.id}`);
  //   }, 1);
  // }

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
        
    // getAnime({ variables: { id: anime.id } });
    setTimeout(() => {
      
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