//components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CircleRate = ({ rate, symbol, size }) => {
  //there is 2 circular div that we handle the percentage with the gradient. we also change the color with percentage
  let grad, bg;
  if (rate === null) {
    rate = 0;
  }
  if (rate <= 25) {
    bg = "bg-red-500";
    grad = `linear-gradient(${
      (rate / 100) * 360 + 90
    }deg, transparent 50%, rgb(212, 212, 212) 50%), linear-gradient(90deg, rgb(212, 212, 212) 50%, transparent 50%)`;
  } else if (rate < 50) {
    bg = "bg-yellow-500";
    grad = `linear-gradient(${
      (rate / 100) * 360 + 90
    }deg, transparent 50%, rgb(212, 212, 212) 50%), linear-gradient(90deg, rgb(212, 212, 212) 50%, transparent 50%)`;
  } else if (rate === 50) {
    bg = "bg-yellow-300";
    grad = `linear-gradient(90deg, rgb(212, 212, 212) 50%, transparent 50%)`;
  } else if (rate >= 100) {
    rate = 100;
    bg = "bg-green-600";
    grad = "none";
  } else if (rate <= 75) {
    bg = "bg-green-300";
    grad = `linear-gradient(${
      ((rate - 50) / 100) * 360 + 90
    }deg, transparent 50%, rgba(110,231,183,1) 50%), linear-gradient(90deg, rgb(212, 212, 212) 50%, transparent 50%)`;
  } else {
    bg = "bg-green-500";
    grad = `linear-gradient(${
      ((rate - 50) / 100) * 360 + 90
    }deg, transparent 50%, rgba(16,185,129,1) 50%), linear-gradient(90deg, rgb(212, 212, 212) 50%, transparent 50%)`;
  }

  return (
    <div
      style={{
        backgroundImage: grad,
        width: `${size}rem`,
        height: `${size}rem`,
        borderRadius: "50%",
      }}
      className={`${bg} circle-rate-container group group-hover:animate-reversecycler`}
    >
      <div
        className="group-hover:animate-cycler"
        style={{
          width: `${size - 1}rem`,
          height: `${size - 1}rem`,
          borderRadius: "50%",
        }}
      >
        {symbol ? (
          <div className="rate-symbol">
            <FontAwesomeIcon
              icon={symbol}
              className={`${
                size === 5 ? "text-6xl" : size === 4 ? "text-5xl " : ""
              } text-red-500`}
            />
            <div
              className={`${
                size === 5 ? "text-lg" : size === 4 ? "text-sm" : ""
              } text-white absolute`}
              style={{
                right: "50%",
                top: "50%",
                transform: "translate(50%, -50%)",
              }}
            >
              {rate}%
            </div>
          </div>
        ) : (
          <span className="score-num">
            <span>score</span>
            <span
              className={`${
                size === 5 ? "text-2xl" : size === 4 ? "text-base" : ""
              }`}
            >
              {rate}%
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default CircleRate;
