const Rank = ({ rank }) => {
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
      className={`rank ${bgRank} ${
        rank.allTime ? `border-r-4 border-l-4 ${bgBorder} ` : ""
      } min-w-max rounded-2xl pr-3 py-1  my-1 overflow-hidden`}
    >
      <span className={`${rankRound} pr-1 py-7 pl-7 font-semibold -ml-6`}>
        #{rank.rank}
      </span>
      {" " + rank.context}
      <span
        className={`bg-gray-200 ${
          rank.year ? "p-1" : ""
        } text-gray-800 rounded-xl text-xs font-bold float-right`}
      >
        {rank.year
          ? `${rank.season ? rank.season.toLowerCase() : ""} ${rank.year}`
          : ""}
      </span>
    </li>
  );
};

export default Rank;
