const SearchAnime = ({anime}) => {

    return (
        <div key={anime.id} className="flex justify-start items-center h-24 w-full cursor-pointer
        hover:text-indigo-900 hover:bg-indigo-200 transition-all">
          <img src={anime.coverImage.medium} className="object-cover h-full w-16" />
          <h4>{anime.title.english ? anime.title.english : anime.title.romaji}</h4>
        </div>
    );
}

export default SearchAnime;