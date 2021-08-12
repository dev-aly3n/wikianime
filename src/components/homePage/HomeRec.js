import Recom from "../detailPage/Recom";

const HomeRecom = ({ allRecom, keyParam }) => {
  return (
    <div className="home-rec">
      {allRecom
        .filter((_, index) => index <= 1)
        .map((rec) => {
          return (
            <Recom
              key={keyParam + rec.media.id}
              widthParam={true}
              recom={rec}
            />
          );
        })}
    </div>
  );
};

export default HomeRecom;
