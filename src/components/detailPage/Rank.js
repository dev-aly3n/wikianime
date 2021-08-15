const Rank = ({ rank }) => {
  //there is diferent rank types that we need to add specific color for any of them
  let bgRank, bgBorder, rankRound;
  if (rank.context.includes("most popular")) {
    bgRank = "bg-green-200";
    bgBorder = "border-green-600";
    rankRound = "bg-green-400";
  } else {
    bgRank = "bg-yellow-200";
    bgBorder = "border-yellow-600";
    rankRound = "bg-yellow-400";
  }

  return (
    <li
      className={`rank rank-container ${bgRank} ${
        rank.allTime ? `border-r-4 border-l-4 ${bgBorder} ` : ""
      } `}
    >
      <span className={`${rankRound} `}>#{rank.rank}</span>
      {" " + rank.context}
      <span className={` ${rank.year ? "p-1" : ""} `}>
        {rank.year
          ? `${rank.season ? rank.season.toLowerCase() : ""} ${rank.year}`
          : ""}
      </span>
    </li>
  );
};

export default Rank;
