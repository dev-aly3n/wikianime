import useProgressBar from '../utils/useProgressBar';
import { useHistory } from "react-router-dom";

const SearchAnime = ({ anime, emptySearchValue }) => {
  const history = useHistory();

  const animeCardClickHandler = (e) => {
    e.preventDefault();

    useProgressBar(30);


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
